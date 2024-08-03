defmodule FlowWeb.Skills.TechniqueLive.FormComponent do
  use FlowWeb, :live_component

  alias Flow.Skills

  def render(assigns) do
    ~H"""
    <div>
      <.header>
        <%= @title %>
        <:subtitle>Update a technique in your library</:subtitle>
      </.header>

      <.simple_form for={@form} id="technique-form">
        <.input field={@form[:name]} type="text" label="Name" />
        <:actions>
          <.button>Save</.button>
        </:actions>
      </.simple_form>
    </div>
    """
  end

  def update(%{technique: technique} = assigns, socket) do
    changeset = Skills.change_technique(technique)

    socket =
      socket
      |> assign(assigns)
      |> assign_form(changeset)

    {:ok, socket}
  end

  defp assign_form(socket, changeset) do
    assign(socket, :form, to_form(changeset))
  end
end
