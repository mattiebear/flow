defmodule FlowWeb.Skills.TechniqueLive do
  use FlowWeb, :live_view

  alias Flow.Schema.Error
  alias Flow.Skills
  alias Flow.Skills.Technique

  def render(assigns) do
    ~H"""
    <div class="col-span-11">
      <.breadcrumbs items={@breadcrumbs} />
    </div>

    <div class="col-span-2">
      <%!-- <p>
        Search
      </p> --%>
    </div>

    <div class="col-span-9">
      <%!-- <p>
        Filters
      </p> --%>
    </div>

    <div class="col-span-2">
      <%!-- <.link patch={~p"/techniques/new"}>
        <.button>
          Add Technique
        </.button>
      </.link> --%>

      <p class="mb-4">
        <%= ngettext("1 technique", "%{count} techniques", length(@techniques)) %>
      </p>

      <nav>
        <ul class="flex flex-col gap-y-2">
          <li :for={technique <- @techniques}>
            <% active = String.contains?(@url, ~p"/techniques/#{technique.id}") %>
            <.link patch={~p"/techniques/#{technique.id}"} class="block">
              <button class={[
                "p-[1px] rounded-xl w-full",
                active && "dark:text-zinc-300 bg-gradient-to-b from-zinc-600 to-transparent to-80%"
              ]}>
                <div class={[
                  "h-full rounded-[calc(0.75rem_-_1px)] py-1 px-2.5 text-left",
                  active && "bg-gradient-to-b from-zinc-800 to-zinc-900 text-indigo-400"
                ]}>
                  <%= technique.name %>
                </div>
              </button>
            </.link>
          </li>
        </ul>
      </nav>
    </div>

    <div class="col-span-6">
      <.svelte
        :if={@live_action == :new}
        name="TechniqueForm"
        props={%{errors: @errors, technique: @technique}}
        socket={@socket}
      />
    </div>

    <div class="col-span-3">
      <p>
        Drawer
      </p>
    </div>
    """
  end

  def mount(_params, _session, socket) do
    techniques = Skills.list_techniques(socket.assigns.current_user)
    {:ok, assign(socket, :techniques, techniques)}
  end

  def handle_params(params, url, socket) do
    socket =
      socket
      |> assign(:params, params)
      |> assign(:url, url)
      |> assign_action(socket.assigns.live_action)

    {:noreply, socket}
  end

  def handle_event("save", %{"technique" => technique_params}, socket) do
    # TODO: Will need to handle saving an existing technique
    case Skills.create_technique(socket.assigns.current_user, technique_params) do
      {:ok, technique} ->
        socket =
          socket
          |> put_flash(:info, "Technique added to library!")
          |> push_patch(to: ~p"/techniques/#{technique}")

        {:noreply, socket}

      {:error, changeset} ->
        {:noreply, assign(socket, :errors, Error.serialize_errors(changeset))}
    end
  end

  defp assign_action(socket, :index) do
    socket
    |> assign(:breadcrumbs, [{"Techniques", ~p"/techniques"}])
    |> assign(:technique, nil)
  end

  defp assign_action(socket, :new) do
    technique = %Technique{layout: [], steps: []}

    socket
    |> assign(:breadcrumbs, [
      {"Techniques", ~p"/techniques"},
      {"Add a technique", ~p"/techniques/new"}
    ])
    |> assign(:errors, %{})
    |> assign(:technique, technique)
  end

  defp assign_action(socket, :show) do
    socket
    |> assign(:breadcrumbs, [
      {"Techniques", ~p"/techniques"},
      {"TODO: Technique name", ~p"/techniques/#{socket.assigns.params["id"]}"}
    ])
  end

  defp assign_action(socket, :edit) do
    socket
  end
end
