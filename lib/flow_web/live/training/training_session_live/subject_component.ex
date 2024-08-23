defmodule FlowWeb.Training.TrainingSessionLive.SubjectComponent do
  use FlowWeb, :live_component 

  def render(assigns) do
    ~H"""
      <div>Component for <%= @technique_id %></div>
    """
  end
end
