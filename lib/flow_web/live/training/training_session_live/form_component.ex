defmodule FlowWeb.Training.TrainingSessionLive.FormComponent do
  use FlowWeb, :live_component

  alias Ecto.Changeset
  alias Flow.Skills
  alias Flow.Training
  alias Flow.Training.DetailRating
  alias Flow.Training.StepRating
  alias Flow.Training.Subject

  def render(assigns) do
    ~H"""
    <div>
      <.header>
        <%= @title %>
        <:subtitle>Log a training session</:subtitle>
      </.header>

      <.simple_form
        for={@form}
        id="training-session-form"
        autocomplete="off"
        phx-target={@myself}
        phx-change="validate"
        phx-submit="save"
      >
        <.input field={@form[:date]} type="date" label="Date" phx-debounce />
        <.input field={@form[:reflection]} type="textarea" label="Reflection" phx-debounce />

        <.inputs_for :let={subject} field={@form[:subjects]}>
          <input type="hidden" name="training_session[subjects_order][]" value={subject.index} />
          <.input
            field={subject[:technique_id]}
            label="Technique"
            options={@technique_options}
            prompt="Select technique"
            type="select"
          />
        </.inputs_for>

        <label>
          <input type="checkbox" name="training_session[subjects_order][]" class="hidden" />
          <.icon name="hero-plus-circle" /> Add subject
        </label>

        <.button type="submit">Save</.button>
      </.simple_form>
    </div>
    """
  end

  def update(%{training_session: training_session} = assigns, socket) do
    training_session_changeset = Training.change_training_session(training_session)

    # TODO: These need to be filtered based on techniques already present in the training session
    techniques = Skills.list_user_techniques(assigns.current_user)
    technique_options = Enum.map(techniques, fn technique -> {technique.name, technique.id} end)

    socket =
      socket
      |> assign(assigns)
      |> assign(:technique_options, technique_options)
      |> assign_form(training_session_changeset)

    {:ok, socket}
  end

  def handle_event("validate", %{"training_session" => training_session_params}, socket) do
    changeset =
      socket.assigns.training_session
      |> Training.change_training_session(training_session_params)
      |> Map.put(:action, :validate)

    {:noreply, assign_form(socket, changeset)}
  end

  def handle_event("save", %{"training_session" => training_session_params}, socket) do
    # save_training_session(socket, socket.assigns.action, training_session_params)
    {:noreply, socket}
  end

  defp save_training_session(socket, :new, training_session_params) do
    case Training.create_user_training_session(
           socket.assigns.current_user,
           training_session_params
         ) do
      {:ok, training_session} ->
        notify_parent({:saved, training_session})

        {:noreply,
         socket
         |> put_flash(:info, "Logged training session")
         |> push_patch(to: ~p"/training")}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign_form(socket, changeset)}
    end
  end

  defp assign_form(socket, changeset) do
    assign(socket, :form, to_form(changeset))
  end

  defp notify_parent(msg), do: send(self(), {__MODULE__, msg})

  defp rating_options do
    [{"Well", 1}, {"Not practiced", 0}, {"Needs work", -1}]
  end
end
