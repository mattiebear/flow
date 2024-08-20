defmodule FlowWeb.Training.TrainingSessionLive.Index do
  use FlowWeb, :live_view

  alias Flow.Training.TrainingSession

  def mount(_params, _session, socket) do
    {:ok, socket}
  end

  def handle_params(params, _url, socket) do
    {:noreply, apply_action(socket, socket.assigns.live_action, params)}
  end

  defp apply_action(socket, :index, _params) do
    socket
    |> assign(:page_title, "My Training")
    |> assign(:draft, %TrainingSession{})
  end

  defp apply_action(socket, :new, _params) do
    socket
    |> assign(:page_title, "Log Training")
    |> assign(:draft, %TrainingSession{})
  end
end
