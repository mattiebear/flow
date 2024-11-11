defmodule FlowWeb.Skills.TechniqueLive do
  use FlowWeb, :live_view

  alias Flow.Skills.Technique

  def render(assigns) do
    ~H"""
    <div class="col-span-2">
      Breadcrumbs <br />

      <div :if={@live_action != :new}>
        Seach <br /> Technique list
      </div>
    </div>

    <div class="col-span-6">
      <span :if={@live_action != :new}>
        Active filters
      </span>

      <br />
      <.svelte
        :if={@live_action != :index}
        name="Technique"
        props={%{technique: @technique}}
        socket={@socket}
      />
    </div>

    <div class="col-span-2">
      <div :if={Enum.member?(~w(edit show), @live_action)}>
        Drawer
      </div>
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

  defp assign_action(:index, socket) do
    assign(socket, :technique, nil)
  end

  defp assign_action(:new, socket) do
    technique = %Technique{layout: [], steps: []}

    assign(socket, :technique, technique)
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
