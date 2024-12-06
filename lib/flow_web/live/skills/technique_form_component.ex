defmodule FlowWeb.Skills.TechniqueFormComponent do
  use FlowWeb, :live_component

  alias Flow.Schema.Error
  alias Flow.Skills

  def render(assigns) do
    ~H"""
    <div id="technique-form">
      <.form for={@form}>
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
                <!-- TODO: Labels go here -->
              </div>

              <.menu id="position-menu">
                <:trigger>
                  <button
                    aria-label="Add positions or labels to technique"
                    class="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
                    type="button"
                  >
                    <span class="hero-tag" />
                  </button>
                </:trigger>

                <:content></:content>
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

    {:ok,
     socket
     |> assign(assigns)
     |> assign_form(changeset)}
  end

  def handle_event("save", %{"technique" => technique_params}, socket) do
    save_technique(socket, socket.assigns.action, technique_params)
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
end
