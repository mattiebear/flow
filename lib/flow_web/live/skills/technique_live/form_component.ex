defmodule FlowWeb.Skills.TechniqueLive.FormComponent do
  use FlowWeb, :live_component

  alias Flow.Skills

  def render(assigns) do
    ~H"""
    <div>
      <.header>
        <%= @title %>
        <:subtitle>Update a technique in your library</:subtitle>
      </.header>

      <.simple_form
        for={@technique_form}
        id="technique-form"
        autocomplete="off"
        phx-target={@myself}
        phx-change="validate"
        phx-submit="save"
      >
        <.input field={@technique_form[:name]} type="text" label="Name" phx-debounce />

        <h3>Steps</h3>

        <div>
          <.inputs_for :let={step} field={@technique_form[:steps]}>
            <input type="hidden" name="technique[steps_order][]" value={step.index} />

            <.input
              field={step[:description]}
              type="textarea"
              label={"Step #{step.index + 1}"}
              phx-debounce
            />

            <div class="pl-8">
              <.inputs_for :let={detail} field={step[:details]}>
                <input type="hidden" name={"technique[steps][#{step.index}][details_order][]"} value={detail.index} />

                <.input
                  field={detail[:description]}
                  type="textarea"
                  label={"Detail #{detail.index + 1}"}
                  phx-debounce
                />
              </.inputs_for>

              <label>

                <input
                  type="checkbox"
                  name={"technique[steps][#{step.index}][details_order][]"}
                  class="hidden"
                />
                <.icon name="hero-plus-circle" /> Add detail
              </label>
            </div>
          </.inputs_for>
        </div>

        <label>
          <input type="checkbox" name="technique[steps_order][]" class="hidden" />
          <.icon name="hero-plus-circle" /> Add step
        </label>

        <:actions>
          <.button type="submit">Save</.button>
        </:actions>
      </.simple_form>
    </div>
    """
  end

  def update(%{technique: technique} = assigns, socket) do
    technique_changeset = Skills.change_technique(technique)

    socket =
      socket
      |> assign(assigns)
      |> assign(:positions, [])
      |> assign_form(technique_changeset)

    {:ok, socket}
  end

  def handle_event("validate", %{"technique" => technique_params}, socket) do
    changeset =
      socket.assigns.technique
      |> Skills.change_technique(technique_params)
      |> Map.put(:action, :validate)

    {:noreply, assign_form(socket, changeset)}
  end

  def handle_event("save", %{"technique" => technique_params}, socket) do
    save_technique(socket, socket.assigns.action, technique_params)
  end

  defp save_technique(socket, :new, technique_params) do
    case Skills.create_user_technique(socket.assigns.current_user, technique_params) do
      {:ok, technique} ->
        notify_parent({:saved, technique})

        {:noreply,
         socket
         |> put_flash(:info, "Added \"#{technique.name}\"")
         |> push_patch(to: ~p"/techniques/#{technique}")}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign_form(socket, changeset)}
    end
  end

  defp assign_form(socket, changeset) do
    assign(socket, :technique_form, to_form(changeset))
  end

  defp notify_parent(msg), do: send(self(), {__MODULE__, msg})
end
