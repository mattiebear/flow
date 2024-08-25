defmodule FlowWeb.Training.TrainingSessionLive.FormComponent do
  use FlowWeb, :live_component

  alias Flow.Skills
  alias Flow.Training

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
          <h3>Studied Technique</h3>
          <.input field={subject[:technique_id]} type="select" options={@technique_options} />

          <.live_component
            :if={is_present(subject[:technique_id].value)}
            module={FlowWeb.Training.TrainingSessionLive.SubjectComponent}
            id={subject[:technique_id].value}
            current_user={@current_user}
            index={subject.index}
            field_name={subject.name}
            technique_id={subject[:technique_id].value}
          />
        </.inputs_for>

        <label>
          <input type="checkbox" name="training_session[subjects_order][]" class="hidden" />
          <.icon name="hero-plus-circle" /> Add technique
        </label>

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
    technique_options = Enum.map(techniques, fn technique -> {technique.name, technique.id} end)
    technique_options = [{"Select technique", nil} | technique_options]

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

  defp is_present(value) when is_binary(value) do
    value |> String.trim() |> String.length() > 0
  end

  defp is_present(value) do
    !is_nil(value)
  end
end
