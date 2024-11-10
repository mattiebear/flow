defmodule FlowWeb.Training.DashboardLive do
  use FlowWeb, :live_view

  def render(assigns) do
    ~H"""
    <div class="col-start-3 col-span-6">
      <div :if={@technique_count == 0}>
        <h2>No techniques created</h2>
        <p>Add a new technique to your library to start training</p>
        <.link navigate={~p"/techniques/new"}>Add Technique</.link>
      </div>
    </div>
    """
  end

  def mount(_params, _session, socket) do
    technique_count = Flow.Skills.technique_count(socket.assigns.current_user)
    {:ok, assign(socket, technique_count: technique_count)}
  end
end
