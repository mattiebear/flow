defmodule FlowWeb.Skills.TechniqueLive.Index do
  use FlowWeb, :live_view

  alias Flow.Skills
  alias Flow.Skills.Technique

  def mount(_params, _session, socket) do
    {:ok, socket}
  end

  def handle_params(params, _url, socket) do
    {:noreply, apply_action(socket, socket.assigns.live_action, params)} 
  end

  defp apply_action(socket, :index, _params) do
    socket
    |> assign(:page_title, "My Techniques")
    |> assign(:changeset, %Technique{})
  end

  defp apply_action(socket, :new, _params) do
    socket
    |> assign(:page_title, "Add Technique")
    |> assign(:changeset, %Technique{})
  end

  defp apply_action(socket, :edit, %{"id" => _id}) do
    # technique = Skills.get_user_technique(user, id)

    socket
    |> assign(:page_title, "Edit Technique")
    |> assign(:changeset, %Technique{})
  end
end
