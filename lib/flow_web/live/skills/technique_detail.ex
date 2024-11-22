defmodule FlowWeb.Skills.TechniqueDetail do
  use FlowWeb, :live_component

  def render(assigns) do
    ~H"""
    <div>
      <div class="mb-8 w-full">
        <h1 class="px-3 py-4 text-6xl text-neutral-900 dark:text-neutral-300">
          <%= @technique.name %>
        </h1>
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

  defp order_steps(technique) do
    technique.layout
    |> Enum.map(fn node ->
      layout_id = Map.get(node, "layout_id")
      Enum.find(technique.steps, &(&1.layout_id == layout_id))
    end)
    |> Enum.with_index()
  end
end
