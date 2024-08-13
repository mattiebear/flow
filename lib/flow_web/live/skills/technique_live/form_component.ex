defmodule FlowWeb.Skills.TechniqueLive.FormComponent do
  use FlowWeb, :live_component

  alias Ecto.Changeset
  alias Flow.Skills
  alias Flow.Skills.Detail
  alias Flow.Skills.Position
  alias Flow.Skills.Step

  def render(assigns) do
    ~H"""
    <div>
      <.header>
        <%= @title %>
        <:subtitle>Update a technique in your library</:subtitle>
      </.header>

      <.simple_form
        for={@position_form}
        id="position-form"
        autocomplete="off"
        phx-target={@myself}
        phx-change="search_positions"
        phx-submit="save_position"
      >
        <div class="flex flex-row gap-x-1 relative">
          <.input field={@position_form[:name]} type="text" phx-debounce />
          <.button type="submit">Create Position</.button>

          <div
            :if={length(@positions) > 0}
            class="border border-black border-solid rounded drop-shadow bg-slate-50 left-0 top-[55px] absolute"
          >
            <ul role="listbox">
              <li
                :for={position <- @positions}
                role="option"
                class="p-2 bg-slate-100 cursor-pointer hover:bg-slate-200"
                phx-target={@myself}
                phx-click="add_position"
                phx-value-id={position.id}
              >
                <%= position.name %>
              </li>
            </ul>
          </div>
        </div>
      </.simple_form>

      <.simple_form
        for={@technique_form}
        id="technique-form"
        autocomplete="off"
        phx-target={@myself}
        phx-change="validate_technique"
        phx-submit="save_technique"
      >
        <.input field={@technique_form[:name]} type="text" label="Name" phx-debounce />

        <h3>Steps</h3>

        <div>
          <.inputs_for :let={step} field={@technique_form[:steps]}>
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
    technique_changeset = Skills.change_technique(technique)
    position_changeset = Skills.change_position(%Position{})

    socket =
      socket
      |> assign(assigns)
      |> assign(:positions, [])
      |> assign_technique_form(technique_changeset)
      |> assign_position_form(position_changeset)

    {:ok, socket}
  end

  def handle_event("add_step", _params, socket) do
    socket =
      update(socket, :techinque_form, fn %{source: changeset} ->
        existing = Changeset.get_assoc(changeset, :steps)
        changeset = Changeset.put_assoc(changeset, :steps, existing ++ [%Step{}])
        to_form(changeset)
      end)

    {:noreply, socket}
  end

  def handle_event("add_detail", %{"index" => index}, socket) do
    index = String.to_integer(index)

    socket =
      update(socket, :technique_form, fn %{source: changeset} ->
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

  def handle_event("add_position", %{"id" => id}, socket) do
    changeset = Skills.change_position(%Position{})
    # position = Skills.get_user_position(socket.assigns.current_user, id)
socket = update(socket, :technique_form, fn %{source: changeset} -> 

        existing = Changeset.get_assoc(changeset, :situations)
        changeset = Changeset.put_assoc(changeset, :situations, existing ++ [%Situation{position_id: id}])
        to_form(changeset)
  end)
      |> assign(:positions, [])
      |> assign_position_form(changeset)

    {:noreply, socket}
  end

  def handle_event("save_position", %{"position" => position_params}, socket) do
    # TODO: First check if a position exists with that name, and if it does use that instead
    case Skills.create_user_position(socket.assigns.current_user, position_params) do
      {:ok, _position} ->
        {:noreply, socket}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign_position_form(socket, changeset)}
    end

    {:noreply, socket}
  end

  def handle_event("search_positions", %{"position" => position_params}, socket) do
    positions = Skills.search_user_positions(socket.assigns.current_user, position_params["name"])

    {:noreply, assign(socket, :positions, positions)}
  end

  def handle_event("validate_technique", %{"technique" => technique_params}, socket) do
    changeset =
      socket.assigns.technique
      |> Skills.change_technique(technique_params)
      |> Map.put(:action, :validate)

    {:noreply, assign_technique_form(socket, changeset)}
  end

  def handle_event("save_technique", %{"technique" => technique_params}, socket) do
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
        {:noreply, assign_technique_form(socket, changeset)}
    end
  end

  defp assign_position_form(socket, changeset) do
    assign(socket, :position_form, to_form(changeset))
  end

  defp assign_technique_form(socket, changeset) do
    assign(socket, :technique_form, to_form(changeset))
  end

  defp notify_parent(msg), do: send(self(), {__MODULE__, msg})
end
