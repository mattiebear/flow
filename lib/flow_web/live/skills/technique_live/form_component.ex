defmodule FlowWeb.Skills.TechniqueLive.FormComponent do
  use FlowWeb, :live_component

  alias Ecto.Changeset
  alias Flow.Skills
  alias Flow.Skills.Detail
  alias Flow.Skills.Step

  def render(assigns) do
    ~H"""
    <div>
      <.header>
        <%= @title %>
        <:subtitle>Update a technique in your library</:subtitle>
      </.header>

      <.simple_form for={@form} id="technique-form">
        <.input field={@form[:name]} type="text" label="Name" />

        <h3>Steps</h3>

        <div>
          <.inputs_for :let={step} field={@form[:steps]}>
            <.input field={step[:description]} type="textarea" label={"Step #{step.index + 1}"} />
            <.button
              type="button"
              phx-click="add-detail"
              phx-target={@myself}
              phx-value-index={step.index}
            >
              Add Detail
            </.button>

            <.inputs_for :let={detail} field={step[:details]}>
              <.input
                field={detail[:description]}
                type="textarea"
                label={"Detail #{detail.index + 1}"}
              />
            </.inputs_for>
          </.inputs_for>
        </div>

        <.button type="button" phx-click="add-step" phx-target={@myself}>Add Step</.button>

        <:actions>
          <.button type="submit">Save</.button>
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

  def handle_event("add-step", _params, socket) do
    socket =
      update(socket, :form, fn %{source: changeset} ->
        existing = Changeset.get_assoc(changeset, :steps)
        changeset = Changeset.put_assoc(changeset, :steps, existing ++ [%Step{}])
        to_form(changeset)
      end)

    {:noreply, socket}
  end

  def handle_event("add-detail", %{"index" => index}, socket) do
    index = String.to_integer(index)

    socket =
      update(socket, :form, fn %{source: changeset} ->
        existing = Changeset.get_assoc(changeset, :steps)

        steps =
          existing
          |> Enum.with_index()
          |> Enum.map(fn {step, i} ->
            if i == index do
              existing = Changeset.get_assoc(step, :details)
              Changeset.put_assoc(step, :details, existing ++ [%Detail{}])
            else
              step
            end
          end)

        changeset = Changeset.put_assoc(changeset, :steps, steps)
        to_form(changeset)
      end)

    {:noreply, socket}
  end

  defp assign_form(socket, changeset) do
    assign(socket, :form, to_form(changeset))
  end
end
