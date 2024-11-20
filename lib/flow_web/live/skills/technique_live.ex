defmodule FlowWeb.Skills.TechniqueLive do
  use FlowWeb, :live_view

  alias Flow.Skills
  alias Flow.Skills.Technique

  def mount(_params, _session, socket) do
    socket =
      socket
      |> assign(:filters, [])
      |> assign_techniques()

    {:ok, socket}
  end

  def handle_params(params, url, socket) do
    socket =
      socket
      |> assign(:params, params)
      |> assign(:url, url)
      |> assign_action(socket.assigns.live_action)

    {:noreply, socket}
  end

  def handle_event("add_filter", %{"filter" => filter}, socket) do
    socket =
      socket
      |> assign(:filters, [filter])
      |> assign_techniques()

    {:noreply, socket}
  end

  def handle_event("remove_filter", %{"filter" => _filter}, socket) do
    socket =
      socket
      |> assign(:filters, [])
      |> assign_techniques()

    {:noreply, socket}
  end

  def handle_info({:technique_added, _technique}, socket) do
    {:noreply, assign_techniques(socket)}
  end

  defp assign_action(socket, :index) do
    socket
    |> assign(:breadcrumbs, [{"Techniques", ~p"/techniques"}])
    |> assign(:technique, nil)
  end

  defp assign_action(socket, :new) do
    technique = %Technique{layout: [], steps: []}

    socket
    |> assign(:breadcrumbs, [
      {"Techniques", ~p"/techniques"},
      {"Add a technique", ~p"/techniques/new"}
    ])
    |> assign(:errors, %{})
    |> assign(:technique, technique)
  end

  defp assign_action(socket, :show) do
    socket
    |> assign(:breadcrumbs, [
      {"Techniques", ~p"/techniques"},
      {"TODO: Technique name", ~p"/techniques/#{socket.assigns.params["id"]}"}
    ])
  end

  defp assign_action(socket, :edit) do
    socket
  end

  defp assign_techniques(socket) do
    techniques =
      case socket.assigns.filters do
        [filter] -> Skills.search_techniques(socket.assigns.current_user, filter)
        _ -> Skills.list_techniques(socket.assigns.current_user)
      end

    assign(socket, :techniques, techniques)
  end
end
