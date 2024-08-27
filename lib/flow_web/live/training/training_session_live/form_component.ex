defmodule FlowWeb.Training.TrainingSessionLive.FormComponent do
  use FlowWeb, :live_component

  alias Flow.Skills
  alias Flow.Training
  alias Flow.Training.DetailRating
  alias Flow.Training.StepRating
  alias Flow.Training.Subject
  alias Flow.Trianing.TrainingSession

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
          <h3>Technique: <%= subject.data.technique.name %></h3>
        </.inputs_for>

        <select name="technique_id">
          <option value="">Select technique</option>
          <%= Phoenix.HTML.Form.options_for_select(@technique_options, @technique_id) %>
        </select>

        <.button
          type="button"
          phx-click={JS.push("add_subject", value: %{technique_id: @technique_id})}
          phx-target={@myself}
        >
          Add technique
        </.button>

        <:actions>
          <.button type="submit">Save</.button>
        </:actions>
      </.simple_form>
    </div>
    """
  end

  def update(%{training_session: training_session} = assigns, socket) do
    training_session_changeset = Training.change_training_session(training_session)
    techniques = Skills.list_user_techniques(assigns.current_user)
    # TODO: These need to be filtered based on techniques already present in the training session
    technique_options = Enum.map(techniques, fn technique -> {technique.name, technique.id} end)

    socket =
      socket
      |> assign(assigns)
      |> assign(:technique_options, technique_options)
      |> assign(:technique_id, "")
      |> assign_form(training_session_changeset)

    {:ok, socket}
  end

  def handle_event(
        "validate",
        %{"_target" => ["technique_id"], "technique_id" => technique_id},
        socket
      ) do
    {:noreply, assign(socket, :technique_id, technique_id)}
  end

  def handle_event("validate", %{"training_session" => training_session_params}, socket) do
    changeset =
      socket.assigns.training_session
      |> Training.change_training_session(training_session_params)
      |> Map.put(:action, :validate)

    {:noreply, assign_form(socket, changeset)}
  end

  def handle_event("add_subject", %{"technique_id" => technique_id}, socket) do
    # TODO: We should differentiate between the technique getters since this one doesn't need the associations
    technique = Skills.get_user_technique(socket.assigns.current_user, technique_id)
    # TODO: Should we pass in user ID in some way?
    steps = Skills.get_technique_steps(technique_id)
    details = Skills.get_technique_details(technique_id)

    step_ratings = Enum.map(steps, fn step -> %StepRating{step: step} end)
    detail_ratings = Enum.map(details, fn detail -> %DetailRating{detail: detail} end)

    subject = %Subject{
      detail_ratings: detail_ratings,
      step_ratings: step_ratings,
      technique: technique
    }

    training_session =
      socket.assigns.training_session
      |> Map.update!(:subjects, &(&1 ++ [subject]))

    training_session_changeset = Training.change_training_session(training_session)

    socket =
      socket
      |> assign(:training_session, training_session)
      |> assign_form(training_session_changeset)

    {:noreply, socket}
  end

  def handle_event("save", %{"training_session" => training_session_params}, socket) do
    save_training_session(socket, socket.assigns.action, training_session_params)
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
end
