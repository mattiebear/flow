defmodule FlowWeb.Training.TrainingSessionLive.SubjectComponent do
  use FlowWeb, :live_component

  alias Flow.Skills
  alias Flow.Training
  alias Flow.Training.Subject
  alias Flow.Training.StepRating

  def render(assigns) do
    ~H"""
    <div>
      <h2>Step ratings</h2>
      <.inputs_for :let={step_rating} field={@form[:step_ratings]}>
        <h3>Step <%= step_rating.index + 1 %></h3>
        <p><%= step_rating.data.step.description %></p>
        <.input field={step_rating[:rating]} type="select" options={rating_options()} />
        <hr />
      </.inputs_for>
    </div>
    """
  end

  def update(%{technique_id: technique_id} = assigns, socket) do
    technique = Skills.get_user_technique(assigns.current_user, technique_id)

    step_ratings =
      Enum.map(technique.steps, fn step -> %StepRating{step: step, step_id: step.id} end)

    subject = %Subject{step_ratings: step_ratings}
    changeset = Training.change_subject(subject)

    socket =
      socket
      |> assign(assigns)
      |> assign_form(changeset)
      |> assign(:subject, subject)

    {:ok, socket}
  end

  defp assign_form(socket, changeset) do
    assign(socket, :form, to_form(changeset, as: socket.assigns.field_name))
  end

  defp rating_options do
    [{"-", nil}, {"Done well", 1}, {"Needs work", -1}]
  end
end
