defmodule FlowWeb.Skills.TechniqueDetail do
  use FlowWeb, :live_component

  def render(assigns) do
    ~H"""
    <div>
      <div class="px-3 py-4 mb-8 w-full border-b border-zinc-400 dark:border-zinc-500">
        <h1 class="text-6xl text-neutral-900 dark:text-neutral-300"><%= @technique.name %></h1>
      </div>

      <div class="w-full grid grid-cols-technique gap-4">
        <div class="flex justify-end items-center">
          <span class={[
            "inline-block px-6 py-1 rounded-full",
            "border border-solid border-zinc-500 dark:border-zinc-300"
          ]}>
            Start
          </span>
        </div>
      </div>
    </div>
    """
  end

  @spec update(maybe_improper_list() | map(), any()) :: {:ok, any()}
  def update(assigns, socket) do
    {:ok, assign(socket, assigns)}
  end
end
