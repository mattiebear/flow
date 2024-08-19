defmodule FlowWeb.Skills.PositionLive.FormComponent do
  use FlowWeb, :live_component

  alias Flow.Skills

  def render(assigns) do
    ~H"""
    <div>
      <.header>
        <%= @title %>
        <:subtitle>Update a position in your library</:subtitle>
      </.header>

      <.simple_form
        for={@form}
        id="position-form"
        autocomplete="off"
        phx-target={@myself}
        phx-change="validate"
        phx-submit="save"
      >
        <.input field={@form[:name]} type="text" label="Name" phx-debounce />
        <.input field={@form[:description]} type="textarea" label="Description" phx-debounce />

        <:actions>
          <.button type="submit">Save</.button>
        </:actions>
      </.simple_form>
    </div>
    """
  end

  def update(%{position: position} = assigns, socket) do
    position_changeset = Skills.change_position(position)

    socket =
      socket
      |> assign(assigns)
      |> assign(:positions, [])
      |> assign_form(position_changeset)

    {:ok, socket}
  end

  def handle_event("validate", %{"position" => position_params}, socket) do
    changeset =
      socket.assigns.position
      |> Skills.change_position(position_params)
      |> Map.put(:action, :validate)

    {:noreply, assign_form(socket, changeset)}
  end

  def handle_event("save", %{"position" => position_params}, socket) do
    save_position(socket, socket.assigns.action, position_params)
  end

  defp save_position(socket, :new, position_params) do
    case Skills.create_user_position(socket.assigns.current_user, position_params) do
      {:ok, position} ->
        notify_parent({:saved, position})

        {:noreply,
         socket
         |> put_flash(:info, "Added \"#{position.name}\"")
         |> push_patch(to: ~p"/positions/#{position}")}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign_form(socket, changeset)}
    end
  end

  defp save_position(socket, :edit, position_params) do
    case Skills.update_position(socket.assigns.position, position_params) do
      {:ok, position} ->
        notify_parent({:saved, position})

        {:noreply,
         socket
         |> put_flash(:info, "Updated \"#{position.name}\"")
         |> push_patch(to: ~p"/positions/#{position}")}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign_form(socket, changeset)}
    end
  end

  defp assign_form(socket, changeset) do
    assign(socket, :form, to_form(changeset))
  end

  defp notify_parent(msg), do: send(self(), {__MODULE__, msg})
end
