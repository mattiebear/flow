defmodule FlowWeb.Skills.TechniqueLive do
  use FlowWeb, :live_view

  alias Flow.Schema.Error
  alias Flow.Skills
  alias Flow.Skills.Technique

  def render(assigns) do
    ~H"""
    <div class="col-span-11">
      <div class="flex flex-row gap-x-1">
        <span>Techniques</span>
        <span>/</span>
        <span>Add a technique</span>
      </div>
    </div>

    <div class="col-span-2">
      <p>
        Search
      </p>
    </div>

    <div class="col-span-9">
      <p>
        Filters
      </p>
    </div>

    <div class="col-span-2">
      <.link patch={~p"/techniques/new"}>
        <.button>
          Add Technique
        </.button>
      </.link>

      <p>
        Technique list
      </p>
    </div>

    <div class="col-span-6">
      <.svelte
        :if={@live_action == :new}
        name="TechniqueForm"
        props={%{errors: @errors, technique: @technique}}
        socket={@socket}
      />
    </div>

    <div class="col-span-3">
      <p>
        Drawer
      </p>
    </div>
    """
  end

  def mount(_params, _session, socket) do
    {:ok, socket}
  end

  def handle_params(_params, _url, socket) do
    socket = assign_action(socket.assigns.live_action, socket)
    {:noreply, socket}
  end

  def handle_event("save", %{"technique" => technique_params}, socket) do
    # TODO: Will need to handle saving an existing technique
    case Skills.create_technique(socket.assigns.current_user, technique_params) do
      {:ok, technique} ->
        socket =
          socket
          |> put_flash(:info, "Technique added to library!")
          |> push_patch(to: ~p"/techniques/#{technique}")

        {:noreply, socket}

      {:error, changeset} ->
        {:noreply, assign(socket, :errors, Error.serialize_errors(changeset))}
    end
  end

  defp assign_action(:index, socket) do
    assign(socket, :technique, nil)
  end

  defp assign_action(:new, socket) do
    technique = %Technique{layout: [], steps: []}

    socket
    |> assign(:technique, technique)
    |> assign(:errors, %{})
  end

  defp assign_action(:show, socket) do
    # TODO: Load technique
    socket
  end

  defp assign_action(:edit, socket) do
    # TODO: Load technique
    socket
  end
end
