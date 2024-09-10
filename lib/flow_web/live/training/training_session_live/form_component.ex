defmodule FlowWeb.Training.TrainingSessionLive.FormComponent do
  use FlowWeb, :live_component

  alias Ecto.Changeset
  alias Flow.Skills
  alias Flow.Training
  alias Flow.Training.DetailRating
  alias Flow.Training.StepRating

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
        phx-change="change"
        phx-submit="save"
      >
        <.input field={@form[:date]} type="date" label="Date" phx-debounce />
        <.input field={@form[:reflection]} type="textarea" label="Reflection" phx-debounce />

        <.inputs_for :let={subject} field={@form[:subjects]}>
          <% technique = pluck_technique(@all_techniques, subject[:technique_id].value) %>
          <input type="hidden" name="training_session[subjects_order][]" value={subject.index} />

          <.input
            field={subject[:technique_id]}
            label="Technique"
            options={@technique_options}
            prompt="Select technique"
            type="select"
          />

          <.inputs_for :let={step_rating} field={subject[:step_ratings]}>
            <input
              type="hidden"
              name={step_rating[:step_id].name}
              value={step_rating[:step_id].value}
            />
            <input type="hidden" name={step_rating[:rating].name} value={step_rating[:rating].value} />
          </.inputs_for>

          <.inputs_for :let={detail_rating} field={subject[:detail_ratings]}>
            <input
              type="hidden"
              name={detail_rating[:detail_id].name}
              value={detail_rating[:detail_id].value}
            />
            <input
              type="hidden"
              name={detail_rating[:rating].name}
              value={detail_rating[:rating].value}
            />
          </.inputs_for>

          <%= if technique do %>
            <.input
              field={subject[:performance]}
              label="Technique performance"
              options={performance_options()}
              prompt="Rate your overall performance"
              type="select"
            />

            <div class="pl-2">
              <% step_ratings = Changeset.get_assoc(subject.source, :step_ratings) %>
              <% detail_ratings = Changeset.get_assoc(subject.source, :detail_ratings) %>

              <div :for={step <- technique.steps}>
                <% selected =
                  Enum.find(step_ratings, &(Changeset.fetch_field!(&1, :step_id) == step.id)) %>
                <% rating = if selected, do: Changeset.fetch_field!(selected, :rating), else: nil %>

                <div class="flex flex-row gap-x-2">
                  <div class="grow">
                    <h3>Step <%= step.order + 1 %></h3>
                    <p><%= step.description %></p>
                  </div>

                  <div class="flex gap-x-2">
                    <button
                      type="button"
                      phx-target={@myself}
                      phx-click="toggle_step_rating"
                      phx-value-subject_index={subject.index}
                      phx-value-step_id={step.id}
                      phx-value-rating={-1}
                    >
                      <.icon
                        name="hero-hand-thumb-down"
                        class={"h-6 w-6 #{if rating == -1, do: "text-blue-500", else: ""}"}
                      />
                    </button>
                    <button
                      type="button"
                      phx-target={@myself}
                      phx-click="toggle_step_rating"
                      phx-value-subject_index={subject.index}
                      phx-value-step_id={step.id}
                      phx-value-rating={1}
                    >
                      <.icon
                        name="hero-hand-thumb-up"
                        class={"h-6 w-6 #{if rating == 1, do: "text-blue-500", else: ""}"}
                      />
                    </button>
                  </div>
                </div>

                <div :for={detail <- step.details} class="pl-4">
                  <% selected =
                    Enum.find(detail_ratings, &(Changeset.fetch_field!(&1, :detail_id) == detail.id)) %>
                  <% rating = if selected, do: Changeset.fetch_field!(selected, :rating), else: nil %>

                  <div class="flex flex-row gap-x-2">
                    <div class="grow">
                      <h3>Detail <%= detail.order + 1 %></h3>
                      <p><%= detail.description %></p>
                    </div>

                    <div class="flex gap-x-2">
                      <button
                        type="button"
                        phx-target={@myself}
                        phx-click="toggle_detail_rating"
                        phx-value-subject_index={subject.index}
                        phx-value-detail_id={detail.id}
                        phx-value-rating={-1}
                      >
                        <.icon
                          name="hero-hand-thumb-down"
                          class={"h-6 w-6 #{if rating == -1, do: "text-blue-500", else: ""}"}
                        />
                      </button>
                      <button
                        type="button"
                        phx-target={@myself}
                        phx-click="toggle_detail_rating"
                        phx-value-subject_index={subject.index}
                        phx-value-detail_id={detail.id}
                        phx-value-rating={1}
                      >
                        <.icon
                          name="hero-hand-thumb-up"
                          class={"h-6 w-6 #{if rating == 1, do: "text-blue-500", else: ""}"}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          <% end %>
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
      |> assign(:all_techniques, MapSet.new())
      |> assign_form(training_session_changeset)

    {:ok, socket}
  end

  def handle_event(
        "change",
        %{
          "_target" => ["training_session", "subjects", _index, "technique_id"],
          "training_session" => training_session_params
        } = params,
        socket
      ) do
    technique_id = get_in(params, params["_target"])

    changeset =
      socket.assigns.training_session
      |> Training.change_training_session(training_session_params)

    case technique_id do
      "" ->
        {:noreply, assign_form(socket, changeset)}

      technique_id ->
        technique = Skills.get_technique_detail(technique_id)

        socket =
          socket
          |> update(:all_techniques, fn all_techniques ->
            MapSet.put(all_techniques, technique)
          end)
          |> assign_form(changeset)

        {:noreply, socket}
    end
  end

  # TODO: Can this and the detail rating be combined?
  def handle_event(
        "toggle_step_rating",
        %{"subject_index" => subject_index, "step_id" => step_id, "rating" => rating},
        socket
      ) do
    {step_id, _} = Integer.parse(step_id)
    {rating, _} = Integer.parse(rating)
    {index, _} = Integer.parse(subject_index)

    socket =
      update(socket, :form, fn %{source: changeset} ->
        existing = Changeset.get_assoc(changeset, :subjects)

        subjects =
          List.update_at(existing, index, fn subject ->
            step_ratings = Changeset.get_assoc(subject, :step_ratings)
            selected = Enum.find(step_ratings, &(Changeset.fetch_field!(&1, :step_id) == step_id))

            step_ratings =
              case selected do
                nil ->
                  change = Changeset.change(%StepRating{}, step_id: step_id, rating: rating)
                  [change | step_ratings]

                step_rating ->
                  if Changeset.fetch_field!(step_rating, :rating) == rating do
                    Enum.reject(step_ratings, fn step_rating ->
                      Changeset.fetch_field!(step_rating, :step_id) == step_id
                    end)
                  else
                    Enum.map(step_ratings, fn step_rating ->
                      if Changeset.fetch_field!(step_rating, :step_id) != step_id do
                        step_rating
                      else
                        Changeset.change(step_rating, rating: rating)
                      end
                    end)
                  end
              end

            Changeset.put_assoc(subject, :step_ratings, step_ratings)
          end)

        changeset
        |> Changeset.put_assoc(:subjects, subjects)
        |> to_form()
      end)

    {:noreply, socket}
  end

  def handle_event(
        "toggle_detail_rating",
        %{"subject_index" => subject_index, "detail_id" => detail_id, "rating" => rating},
        socket
      ) do
    {detail_id, _} = Integer.parse(detail_id)
    {rating, _} = Integer.parse(rating)
    {index, _} = Integer.parse(subject_index)

    socket =
      update(socket, :form, fn %{source: changeset} ->
        existing = Changeset.get_assoc(changeset, :subjects)

        subjects =
          List.update_at(existing, index, fn subject ->
            detail_ratings = Changeset.get_assoc(subject, :detail_ratings)

            selected =
              Enum.find(detail_ratings, &(Changeset.fetch_field!(&1, :detail_id) == detail_id))

            detail_ratings =
              case selected do
                nil ->
                  change = Changeset.change(%DetailRating{}, detail_id: detail_id, rating: rating)
                  [change | detail_ratings]

                detail_rating ->
                  if Changeset.fetch_field!(detail_rating, :rating) == rating do
                    Enum.reject(detail_ratings, fn detail_rating ->
                      Changeset.fetch_field!(detail_rating, :detail_id) == detail_id
                    end)
                  else
                    Enum.map(detail_ratings, fn detail_rating ->
                      if Changeset.fetch_field!(detail_rating, :detail_id) != detail_id do
                        detail_rating
                      else
                        Changeset.change(detail_rating, rating: rating)
                      end
                    end)
                  end
              end

            Changeset.put_assoc(subject, :detail_ratings, detail_ratings)
          end)

        changeset
        |> Changeset.put_assoc(:subjects, subjects)
        |> to_form()
      end)

    {:noreply, socket}
  end

  def handle_event("change", %{"training_session" => training_session_params}, socket) do
    changeset =
      socket.assigns.training_session
      |> Training.change_training_session(training_session_params)

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

  defp performance_options do
    [{"Well", 1}, {"Okay", 0}, {"Needs work", -1}]
  end

  defp pluck_technique(techniques, id) do
    Enum.find(techniques, fn technique -> technique.id == id end)
  end
end
