defmodule FlowWeb.Skills.TechniqueLive do
  use FlowWeb, :live_view

  alias Flow.Schema.Error
  alias Flow.Skills
  alias Flow.Skills.Technique

  def mount(_params, _session, socket) do
    techniques = Skills.list_techniques(socket.assigns.current_user)
    {:ok, assign(socket, :techniques, techniques)}
  end

  def handle_params(params, url, socket) do
    filters = Map.get(params, "filters", [])

    filtered_techniques =
      case filters do
        [] ->
          socket.assigns.techniques

        _ ->
          Enum.reduce(filters, socket.assigns.techniques, fn filter, techniques ->
            Enum.filter(techniques, &String.match?(&1.name, ~r/#{filter}/i))
          end)
      end

    socket =
      socket
      |> assign(:filtered_techniques, filtered_techniques)
      |> assign(:params, params)
      |> assign(:url, url)
      |> assign_action(socket.assigns.live_action)

    {:noreply, socket}
  end

  def handle_event("save", %{"technique" => technique_params}, socket) do
    # TODO: Will need to handle saving an existing technique
    case Skills.create_technique(socket.assigns.current_user, technique_params) do
      {:ok, technique} ->
        socket =
          socket
          |> put_flash(:info, "Technique added to library!")
          |> push_patch(to: ~p"/techniques/#{technique}")

        {:noreply, socket}

      {:error, changeset} ->
        {:noreply, assign(socket, :errors, Error.serialize_errors(changeset))}
    end
  end

  def handle_event("add_filter", %{"filter" => filter}, socket) do
    filters = %{filters: [filter]}

    socket =
      socket
      |> push_patch(to: "#{socket.assigns.current_path}?#{Plug.Conn.Query.encode(filters)}")

    {:noreply, socket}
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
end
