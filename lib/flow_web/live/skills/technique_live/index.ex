defmodule FlowWeb.Skills.TechniqueLive.Index do
  use FlowWeb, :live_view

  # alias Flow.Skills
  alias Flow.Skills.Technique

  def mount(_params, session, socket) do
    {:ok, assign(socket, :user, session.current_user)}
  end

  def handle_params(params, _url, socket) do
    {:noreply, apply_action(socket, socket.assigns.live_action, params)}
  end

  def handle_info({FlowWeb.Skills.TechniqueLive.FormComponent, {:saved, technique}}, socket) do
    dbg(technique)
    {:noreply, socket}
  end

  defp apply_action(socket, :index, _params) do
    socket
    |> assign(:page_title, "My Techniques")
    |> assign(:technique, %Technique{})
  end

  defp apply_action(socket, :new, _params) do
    socket
    |> assign(:page_title, "Add Technique")
    |> assign(:technique, %Technique{})
  end

  defp apply_action(socket, :edit, %{"id" => _id}) do
    # technique = Skills.get_user_technique(user, id)

    socket
    |> assign(:page_title, "Edit Technique")
    |> assign(:technique, %Technique{})
  end
end
