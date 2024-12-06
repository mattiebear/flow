defmodule FlowWeb.Skills.TechniqueFormComponent do
  use FlowWeb, :live_component

  alias Flow.Schema.Error
  alias Flow.Skills
  alias Flow.Taxonomy

  def render(assigns) do
    ~H"""
    <div id="technique-form">
      <.form autocomplete="off" for={@form}>
        <div class="mb-8">
          <input
            type="text"
            placeholder="Technique name"
            name={@form[:name].name}
            value={@form[:name].value}
            class={[
              "text-6xl px-3 py-4 h-[92px] placeholder:text-neutral-500 w-full outline-none border-b border-0 focus:ring-0",
              "text-neutral-900 dark:text-neutral-300 bg-transparent transition-colors",
              @form[:name].errors == [] &&
                "border-zinc-400 dark:border-zinc-500 focus:border-zinc-500 dark:focus:border-zinc-100",
              @form[:name].errors != [] &&
                "border-red-900 placeholder:text-red-400 dark:placeholder:text-red-300"
            ]}
          />

          <.error :for={msg <- @form[:name].errors}>
            {msg}
          </.error>
        </div>

        <div class="w-full grid grid-cols-[8rem_1fr] gap-4">
          <div class="flex justify-end items-start mt-[calc(3rem_-_16px)]">
            <span class={[
              "inline-block px-6 py-1 rounded-full",
              "border border-solid border-zinc-500 dark:border-zinc-300"
            ]}>
              Start
            </span>
          </div>

          <div class={[
            "rounded-xl w-full py-2 px-3",
            "border border-solid border-zinc-500",
            "bg-gradient-to-br from-indigo-950 to-zinc-900 to-50%"
          ]}>
            <textarea
              autofocus
              placeholder="Describe the starting position for this technique"
              id={@form[:description].id}
              name={@form[:description].name}
              value={@form[:description].value}
              phx-hook="AutoResizeTextarea"
              class={[
                "bg-none bg-transparent outline-none border-none p-1",
                "w-full resize-none min-h-[6rem] focus:ring-0"
              ]}
            />

            <div class="flex justify-between">
              <div class="flex flex-row gap-x-2 grow">
                <button
                  :for={label <- @labels}
                  type="button"
                  class={[
                    "inline-flex gap-x-0.5 items-center px-3 rounded-full leading-7 bg-indigo-800",
                    "border border-solid border-zinc-500 dark:border-zinc-300"
                  ]}
                  phx-click="remove_label"
                  phx-value-id={label.id}
                  phx-target={@myself}
                >
                  <span class="text-zinc-300">#{label.tag}</span>
                  <span class="hero-x-mark-micro text-zinc-500 hover:text-zinc-300" />
                </button>
              </div>

              <.menu id="position-menu" size="lg">
                <:trigger>
                  <button
                    aria-label="Add positions or labels to technique"
                    class="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
                    type="button"
                  >
                    <span class="hero-tag" />
                  </button>
                </:trigger>

                <:content>
                  <div class="flex flex-col gap-y-2">
                    <div class="flex flex-row gap-x-2 items-center">
                      <input
                        class={[
                          "focus:ring-0 border border-solid border-indigo-700 rounded-md",
                          "bg-none bg-transparent outline-none p-2 w-full"
                        ]}
                        name="tag"
                        phx-change="search_labels"
                        phx-debounce="300"
                        phx-target={@myself}
                      />

                      <.button size="sm" type="button">
                        Add
                      </.button>
                    </div>

                    <ul :if={length(@label_results) > 0} class="flex flex-col gap-y-2">
                      <li :for={label <- @label_results}>
                        <.menu_option
                          phx-click="select_label"
                          phx-value-id={label.id}
                          phx-target={@myself}
                        >
                          #{label.tag}
                        </.menu_option>
                      </li>
                    </ul>
                  </div>
                </:content>
              </.menu>
            </div>
          </div>
        </div>
      </.form>
    </div>
    """
  end

  def update(assigns, socket) do
    changeset = Skills.change_technique(assigns.technique)

    socket =
      socket
      |> assign(assigns)
      |> assign_form(changeset)
      |> assign(:label_results, [])
      |> assign(:labels, assigns.technique.labels)

    {:ok,
     socket
     |> assign(assigns)
     |> assign_form(changeset)}
  end

  def handle_event("save", %{"technique" => technique_params}, socket) do
    save_technique(socket, socket.assigns.action, technique_params)
  end

  def handle_event("search_labels", %{"tag" => ""}, socket) do
    {:noreply, assign(socket, :label_results, [])}
  end

  def handle_event("search_labels", %{"tag" => value}, socket) do
    labels = Taxonomy.search_labels(socket.assigns.current_user, search: value, limit: 10)
    {:noreply, assign(socket, :label_results, labels)}
  end

  def handle_event("create_label", %{"tag" => tag}, socket) do
    case Taxonomy.create_label(socket.assigns.current_user, %{tag: tag}) do
      {:ok, label} ->
        {:noreply, assign_label(socket, label)}

      {:error, _changeset} ->
        # TODO: Error handling
        {:noreply, socket}
    end
  end

  def handle_event("select_label", %{"id" => id}, socket) do
    label = Taxonomy.get_label!(socket.assigns.current_user, id)
    {:noreply, assign_label(socket, label)}
  end

  def handle_event("remove_label", %{"id" => id}, socket) do
    labels = Enum.reject(socket.assigns.labels, &(&1.id == String.to_integer(id)))
    {:noreply, assign(socket, :labels, labels)}
  end

  defp save_technique(socket, :new, params) do
    case Skills.create_technique(socket.assigns.current_user, params) do
      {:ok, technique} ->
        send(self(), {:technique_added, technique})

        socket =
          socket
          |> put_flash(:info, "Technique added to library!")
          |> push_patch(to: ~p"/techniques/#{technique}")

        {:noreply, socket}

      {:error, changeset} ->
        {:noreply, assign(socket, :errors, Error.serialize_errors(changeset))}
    end
  end

  defp save_technique(socket, :edit, params) do
    case Skills.update_technique(socket.assigns.technique, params) do
      {:ok, technique} ->
        send(self(), {:technique_updated, technique})

        socket =
          socket
          |> put_flash(:info, "Technique updated!")
          |> push_patch(to: ~p"/techniques/#{technique}")

        {:noreply, socket}

      {:error, changeset} ->
        {:noreply, assign(socket, :errors, Error.serialize_errors(changeset))}
    end
  end

  defp assign_form(socket, %Ecto.Changeset{} = changeset) do
    assign(socket, :form, to_form(changeset))
  end

  defp assign_label(socket, label) do
    assign(socket, :labels, socket.assigns.labels ++ [label])
  end
end
