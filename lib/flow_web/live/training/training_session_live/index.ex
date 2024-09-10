defmodule FlowWeb.Training.TrainingSessionLive.Index do
  use FlowWeb, :live_view

  alias Flow.Training.TrainingSession

  def mount(_params, _session, socket) do
    {:ok, socket}
  end

  def handle_params(params, _url, socket) do
    {:noreply, apply_action(socket, socket.assigns.live_action, params)}
  end

  def handle_info(
        {FlowWeb.Training.TrainingSessionLive.FormComponent, {:saved, _training_session}},
        socket
      ) do
    # TODO: Manage front end training session views
    {:noreply, socket}
  end

  defp apply_action(socket, :index, _params) do
    socket
    |> assign(:page_title, "My Training")
    |> assign(:draft, %TrainingSession{})
  end

  defp apply_action(socket, :new, _params) do
    socket
    |> assign(:page_title, "Log Training Session")
    |> assign(:draft, %TrainingSession{date: Date.utc_today(), subjects: []})
  end
end
