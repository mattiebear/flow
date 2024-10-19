defmodule FlowWeb.Skills.TechniqueLive do
  use FlowWeb, :live_view

  def render(assigns) do
    ~H"""
    <div>Technique live</div>
    """
  end

  def mount(_params, _session, socket) do
    {:ok, socket}
  end
end
