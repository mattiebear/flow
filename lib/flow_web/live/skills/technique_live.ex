defmodule FlowWeb.Skills.TechniqueLive do
  use FlowWeb, :live_view

  alias Flow.Skills

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
      |> assign(:url, url)
      |> apply_action(socket.assigns.live_action, params)

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

  def handle_info({:technique_updated, _technique}, socket) do
    {:noreply, socket}
  end

  def handle_info({:technique_deleted, _technique}, socket) do
    {:noreply, assign_techniques(socket)}
  end

  defp apply_action(socket, :index, _params) do
    socket
    |> assign(:breadcrumbs, [{"Techniques", ~p"/techniques"}])
    |> assign(:technique, nil)
  end

  defp apply_action(socket, :new, _params) do
    socket
    |> assign(:breadcrumbs, [
      {"Techniques", ~p"/techniques"},
      {"Add a technique", ~p"/techniques/new"}
    ])
    |> assign(:errors, %{})
    |> assign(:technique, Skills.build_technique_draft())
  end

  defp apply_action(socket, :show, %{"id" => id}) do
    technique = Skills.get_technique(socket.assigns.current_user, id)

    socket
    |> assign(:breadcrumbs, [
      {"Techniques", ~p"/techniques"},
      {technique.name, ~p"/techniques/#{technique}"}
    ])
    |> assign(:technique, technique)
  end

  defp apply_action(socket, :edit, %{"id" => id}) do
    technique = Skills.get_technique(socket.assigns.current_user, id)

    socket
    |> assign(:breadcrumbs, [
      {"Techniques", ~p"/techniques"},
      {technique.name, ~p"/techniques/#{technique}"},
      {"Edit", ~p"/techniques/#{technique}/edit"}
    ])
    |> assign(:errors, %{})
    |> assign(:technique, technique)
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
