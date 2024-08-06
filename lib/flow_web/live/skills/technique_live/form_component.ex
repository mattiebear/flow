defmodule FlowWeb.Skills.TechniqueLive.FormComponent do
  use FlowWeb, :live_component

  alias Ecto.Changeset
  alias Flow.Skills
  alias Flow.Skills.Detail
  alias Flow.Skills.Step

  def render(assigns) do
    ~H"""
    <div>
      <.header>
        <%= @title %>
        <:subtitle>Update a technique in your library</:subtitle>
      </.header>

      <.simple_form
        for={@form}
        id="technique-form"
        autocomplete="off"
        phx-target={@myself}
        phx-change="validate"
        phx-submit="save"
      >
        <.input field={@form[:name]} type="text" label="Name" phx-debounce />

        <h3>Steps</h3>

        <div>
          <.inputs_for :let={step} field={@form[:steps]}>
            <.input
              field={step[:description]}
              type="textarea"
              label={"Step #{step.index + 1}"}
              phx-debounce
            />

            <div class="pl-8">
              <.inputs_for :let={detail} field={step[:details]}>
                <.input
                  field={detail[:description]}
                  type="textarea"
                  label={"Detail #{detail.index + 1}"}
                  phx-debounce
                />
              </.inputs_for>

              <.button
                type="button"
                phx-click="add-detail"
                phx-target={@myself}
                phx-value-index={step.index}
              >
                Add Detail
              </.button>
            </div>
          </.inputs_for>
        </div>

        <.button type="button" phx-click="add-step" phx-target={@myself}>Add Step</.button>

        <:actions>
          <.button type="submit">Save</.button>
        </:actions>
      </.simple_form>
    </div>
    """
  end

  def update(%{technique: technique} = assigns, socket) do
    changeset = Skills.change_technique(technique)

    socket =
      socket
      |> assign(assigns)
      |> assign_form(changeset)

    {:ok, socket}
  end

  def handle_event("add-step", _params, socket) do
    socket =
      update(socket, :form, fn %{source: changeset} ->
        existing = Changeset.get_assoc(changeset, :steps)
        changeset = Changeset.put_assoc(changeset, :steps, existing ++ [%Step{}])
        to_form(changeset)
      end)

    {:noreply, socket}
  end

  def handle_event("add-detail", %{"index" => index}, socket) do
    index = String.to_integer(index)

    socket =
      update(socket, :form, fn %{source: changeset} ->
        existing = Changeset.get_assoc(changeset, :steps)

        steps =
          existing
          |> Enum.with_index()
          |> Enum.map(fn {step, i} ->
            if i == index do
              existing = Changeset.get_assoc(step, :details)
              Changeset.put_assoc(step, :details, existing ++ [%Detail{}])
            else
              step
            end
          end)

        changeset = Changeset.put_assoc(changeset, :steps, steps)
        to_form(changeset)
      end)

    {:noreply, socket}
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
    assign(socket, :form, to_form(changeset))
  end

  defp notify_parent(msg), do: send(self(), {__MODULE__, msg})
end
