defmodule FlowWeb.Skills.TechniqueDetailComponent do
  use FlowWeb, :live_component

  alias Flow.Skills

  def render(assigns) do
    ~H"""
    <div>
      <div class="mb-8 w-full flex justify-between items-center">
        <h1 class="px-3 py-4 text-6xl text-neutral-900 dark:text-neutral-300">
          {@technique.name}
        </h1>

        <.menu id="technique-menu">
          <:trigger>
            <button
              aria-label="Edit technique"
              class="p-2 text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors"
            >
              <.icon name="hero-cog-6-tooth" />
            </button>
          </:trigger>

          <:content>
            <ul class="flex flex-col gap-y-2">
              <li>
                <.link patch={~p"/techniques/#{@technique}/edit"}>
                  <.menu_option>
                    Edit <.icon name="hero-pencil-square" />
                  </.menu_option>
                </.link>
              </li>

              <li>
                <.menu_option
                  variant="destructive"
                  phx-click={hide("#technique-menu") |> show_modal("confirm-delete")}
                >
                  Delete <.icon name="hero-trash" />
                </.menu_option>
              </li>
            </ul>
          </:content>
        </.menu>
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
          "rounded-xl w-full py-3 px-4 min-h-[6rem]",
          "border border-solid border-zinc-500",
          "bg-gradient-to-br from-indigo-950 to-zinc-900 to-50%",
          "flex flex-col gap-y-4"
        ]}>
          <p class={[!@technique.description && "text-zinc-400 dark:text-zinc-600"]}>
            {@technique.description || "No starting description"}
          </p>

          <div :if={length(@technique.labels) > 0} class="flex flex-row gap-x-2">
            <div
              :for={label <- @technique.labels}
              class={[
                "gap-x-0.5 px-3 rounded-full leading-7 bg-indigo-800",
                "border border-solid border-zinc-500 dark:border-zinc-300 text-zinc-300"
              ]}
            >
              #{label.tag}
            </div>
          </div>
        </div>

        <%= for {step, index} <- @ordered_steps do %>
          <div class="flex justify-end items-start mt-[calc(3rem_-_16px)]">
            <span class={[
              "inline-block px-6 py-1 rounded-full",
              "border border-solid border-zinc-500 dark:border-zinc-300"
            ]}>
              Step {index + 1}
            </span>
          </div>

          <div class={[
            "min-h-[6rem] rounded-xl w-full py-2 px-3 border border-solid border-zinc-500",
            "flex flex-col gap-y-4 w-full"
          ]}>
            <p class="grow">
              {step.description}
            </p>

            <div :if={length(step.focuses) > 0} class="flex flex-row gap-x-2 justify-end">
              <.modal id={"step-focuses-#{step.id}"}>
                <div class="flex flex-col gap-y-2">
                  <p class="text-lg">At this point:</p>
                  <div class="rounded-xl w-full py-2 px-3 border border-solid border-zinc-500">
                    <p class="text-zinc-500 italic">
                      {step.description || "No description given..."}
                    </p>
                  </div>

                  <p class="text-lg">focus on:</p>

                  <div class="w-full grid grid-cols-[5rem_1fr] gap-4">
                    <%= for {focus, index} <- Enum.with_index(step.focuses) do %>
                      <div class="flex justify-end items-start mt-4">
                        <span class={[
                          "inline-block px-2 py-0.5 rounded-full text-sm",
                          "border border-solid border-zinc-500 dark:border-zinc-300"
                        ]}>
                          Focus {index + 1}
                        </span>
                      </div>

                      <div class={[
                        "rounded-xl w-full py-2 px-3 border border-solid",
                        "border-amber-500"
                      ]}>
                        <p class={[
                          "bg-none bg-transparent outline-none border-none p-1",
                          "w-full resize-none min-h-[6rem] focus:ring-0"
                        ]}>
                          {focus.description}
                        </p>
                      </div>
                    <% end %>
                  </div>
                </div>
              </.modal>

              <button
                aria-label="View focuses"
                class={[
                  "text-amber-500 hover:text-amber-700 dark:hover:text-amber-300 transition-colors",
                  "flex items-center gap-x-1"
                ]}
                phx-click={show_modal("step-focuses-#{step.id}")}
              >
                <span class="hero-exclamation-circle" />

                {length(step.focuses)}
              </button>
            </div>
          </div>
        <% end %>
      </div>

      <.modal id="confirm-delete" size="sm">
        <h2 class="text-3xl mb-6">Are you sure you want to delete this technique?</h2>
        <p class="mb-6">This action cannot be undone.</p>

        <div class="flex justify-end gap-x-4">
          <.button color="primary" variant="outline" phx-click={hide_modal("confirm-delete")}>
            Never mind
          </.button>
          <.button
            color="destructive"
            variant="solid"
            phx-click="delete_technique"
            phx-target={@myself}
          >
            Do it
          </.button>
        </div>
      </.modal>
    </div>
    """
  end

  def update(assigns, socket) do
    socket =
      socket
      |> assign(assigns)
      |> assign(:ordered_steps, order_steps(assigns.technique))

    {:ok, assign(socket, assigns)}
  end

  def handle_event("delete_technique", _params, socket) do
    Skills.delete_technique(socket.assigns.technique)

    send(self(), {:technique_deleted, socket.assigns.technique})

    socket =
      socket
      |> push_patch(to: ~p"/techniques")
      |> put_flash(:info, "Technique removed from library!")

    {:noreply, socket}
  end

  # TODO: Clean this up. I think this should be in a separate module.
  defp order_steps(technique) do
    technique.layout
    |> Enum.map(fn node ->
      layout_id = Map.get(node, "layout_id")
      Enum.find(technique.steps, &(&1.layout_id == layout_id))
    end)
    |> Enum.with_index()
  end
end
