defmodule FlowWeb.Skills.TechniqueLive do
  use FlowWeb, :live_view

  alias Flow.Skills.Technique

  def render(assigns) do
    ~H"""
    <div class="col-span-2">
      Selectors
    </div>

    <div class="col-span-6">
      Content
      <%!-- <h2 class="text-2xl mb-6">Add a technique</h2>
      <.svelte name="Technique" props={%{technique: @technique}} socket={@socket} /> --%>
    </div>

    <div class="col-span-2">
      Drawer
    </div>
    """
  end

  def mount(_params, _session, socket) do
    technique = %Technique{layout: [], steps: []}

    {:ok, assign(socket, technique: technique)}
  end
end
