defmodule FlowWeb.Skills.PositionLive.Index do
  use FlowWeb, :live_view

  alias Flow.Skills
  alias Flow.Skills.Position

  def mount(_params, _session, socket) do
    positions = Skills.list_user_positions(socket.assigns.current_user)

    socket =
      socket
      |> assign(:position, nil)
      |> stream(:positions, positions)

    {:ok, socket}
  end

  def handle_params(params, _uri, socket) do
    {:noreply, apply_action(socket, socket.assigns.live_action, params)}
  end

  def handle_info({FlowWeb.Skills.PositionLive.FormComponent, {:saved, position}}, socket) do
    {:noreply, stream_insert(socket, :positions, position)}
  end

  defp apply_action(socket, :index, _params) do
    socket
    |> assign(:page_title, "Known Positions")
    |> assign(:draft, %Position{})
  end

  defp apply_action(socket, :show, %{"id" => id}) do
    position = Skills.get_position(id)

    socket
    |> assign(:page_title, position.name)
    |> assign(:position, position)
    |> assign(:draft, %Position{})
  end

  defp apply_action(socket, :new, _params) do
    socket
    |> assign(:page_title, "Add Position")
    |> assign(:draft, %Position{})
  end

  defp apply_action(socket, :edit, %{"id" => id}) do
    position = Skills.get_position(id)

    socket
    |> assign(:page_title, "Edit Position")
    |> assign(:draft, position)
  end
end
