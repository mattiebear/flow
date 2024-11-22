defmodule FlowWeb.Skills.TechniqueDetailComponent do
  use FlowWeb, :live_component

  alias Flow.Skills

  def render(assigns) do
    ~H"""
    <div>
      <div class="mb-8 w-full flex justify-between items-center">
        <h1 class="px-3 py-4 text-6xl text-neutral-900 dark:text-neutral-300">
          <%= @technique.name %>
        </h1>

        <div class="relative">
          <button
            aria-label="Edit technique"
            class="p-2 text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors"
            phx-click={
              JS.toggle(
                to: "#technique-menu",
                in: {"ease-out duration-100", "opacity-0 scale-90", "opacity-100 scale-100"},
                out: {"ease-out duration-100", "opacity-100 scale-100", "opacity-0 scale-90"}
              )
            }
          >
            <.icon name="hero-cog-6-tooth" />
          </button>

          <div
            id="technique-menu"
            class="menu hidden absolute top-[calc(100%_+_4px)] -translate-x-1/2"
            phx-click-away={
              JS.hide(
                transition: {"ease-out duration-100", "opacity-100 scale-100", "opacity-0 scale-90"}
              )
            }
          >
            <ul class="flex flex-col gap-y-2">
              <li>
                <.link
                  patch={~p"/techniques/#{@technique}/edit"}
                  class="block flex justify-between items-center option"
                >
                  Edit <.icon name="hero-pencil-square" />
                </.link>
              </li>

              <li>
                <button
                  class="flex justify-between items-center option destructive"
                  phx-click={
                    JS.hide(
                      to: "#technique-menu",
                      transition:
                        {"ease-out duration-100", "opacity-100 scale-100", "opacity-0 scale-90"}
                    )
                    |> show_modal("confirm-delete")
                  }
                >
                  Delete <.icon name="hero-trash" />
                </button>
              </li>
            </ul>
          </div>
        </div>
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
          "bg-gradient-to-br from-indigo-950 to-zinc-900 to-50%"
        ]}>
          <p class={[!@technique.description && "text-zinc-400 dark:text-zinc-600"]}>
            <%= @technique.description || "No starting description" %>
          </p>
        </div>

        <%= for {step, index} <- @ordered_steps do %>
          <div class="flex justify-end items-start mt-[calc(3rem_-_16px)]">
            <span class={[
              "inline-block px-6 py-1 rounded-full",
              "border border-solid border-zinc-500 dark:border-zinc-300"
            ]}>
              Step <%= index + 1 %>
            </span>
          </div>

          <div class="min-h-[6rem] rounded-xl w-full py-2 px-3 border border-solid border-zinc-500">
            <p>
              <%= step.description %>
            </p>
          </div>
        <% end %>
      </div>

      <.modal id="confirm-delete" size="sm">
        <h2 class="text-3xl mb-6">Are you sure you want to delete this technique?</h2>
        <p class="mb-6">This action cannot be undone.</p>

        <div class="flex justify-end gap-x-4">
          <.button color="primary" variant="outline">Never mind</.button>
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
    Skills.delete_technique(socket.assigns.current_user, socket.assigns.technique.id)

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
