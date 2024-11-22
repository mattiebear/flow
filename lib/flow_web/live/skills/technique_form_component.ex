defmodule FlowWeb.Skills.TechniqueFormComponent do
  use FlowWeb, :live_component

  alias Flow.Schema.Error
  alias Flow.Skills

  def render(assigns) do
    ~H"""
    <div id="technique-form">
      <.svelte
        name="TechniqueForm"
        props={%{errors: @errors, technique: @technique}}
        socket={@socket}
      />
    </div>
    """
  end

  def update(assigns, socket) do
    socket =
      socket
      |> assign(assigns)
      |> assign(:errors, %{})

    {:ok, socket}
  end

  def handle_event("save", %{"technique" => technique_params}, socket) do
    save_technique(socket, socket.assigns.action, technique_params)
  end

  defp save_technique(socket, :new, params) do
    case Skills.create_technique(socket.assigns.current_user, params) do
      {:ok, technique} ->
        send(self(), {:technique_added, technique})

        socket =
          socket
          |> put_flash(:info, "Technique added to library!")
          |> push_patch(to: ~p"/techniques/#{technique}")

        {:noreply, socket}

      {:error, changeset} ->
        {:noreply, assign(socket, :errors, Error.serialize_errors(changeset))}
    end
  end

  defp save_technique(socket, :edit, params) do
    case Skills.update_technique(socket.assigns.technique, params) do
      {:ok, technique} ->
        send(self(), {:technique_updated, technique})

        socket =
          socket
          |> put_flash(:info, "Technique updated!")
          |> push_patch(to: ~p"/techniques/#{technique}")

        {:noreply, socket}

      {:error, changeset} ->
        {:noreply, assign(socket, :errors, Error.serialize_errors(changeset))}
    end
  end
end
