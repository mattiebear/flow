defmodule FlowWeb.Skills.TechniqueLive.Index do
  use FlowWeb, :live_view

  alias Flow.Skills
  alias Flow.Skills.Technique

  def mount(_params, _session, socket) do
    techniques = Skills.list_user_techniques(socket.assigns.current_user)

    socket = socket
      |> assign(:technique, nil)
      |> stream(:techniques, techniques)
   
    {:ok, socket}
  end

  def handle_params(params, _url, socket) do
    {:noreply, apply_action(socket, socket.assigns.live_action, params)}
  end

  def handle_info({FlowWeb.Skills.TechniqueLive.FormComponent, {:saved, technique}}, socket) do
    {:noreply, stream_insert(socket, :techniques, technique)}
  end

  defp apply_action(socket, :index, _params) do
    socket
    |> assign(:page_title, "My Techniques")
    |> assign(:draft, %Technique{})
  end

  defp apply_action(socket, :show, %{"id" => id}) do
    technique = Skills.get_user_technique(socket.assigns.current_user, id)

    socket
    |> assign(:page_title, technique.name)
    |> assign(:technique, technique)
    |> assign(:draft, %Technique{})
  end

  defp apply_action(socket, :new, _params) do
    socket
    |> assign(:page_title, "Add Technique")
    |> assign(:draft, %Technique{})
  end

  defp apply_action(socket, :edit, %{"id" => id}) do
    technique = Skills.get_user_technique(socket.assigns.current_user, id)

    socket
    |> assign(:page_title, "Edit Technique")
    |> assign(:draft, technique)
  end
end
