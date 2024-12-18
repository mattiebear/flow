defmodule FlowWeb.Skills.TechniqueController do
  use FlowWeb, :controller

  alias Flow.Skills

  def index(conn, _params) do
    techniques = Skills.list_techniques(conn.assigns.current_user)

    conn
    |> assign_prop(:techniques, techniques)
    |> assign_prop(:breadcrumbs, [["Techniques", "/techniques"]])
    |> render_inertia("Techniques/Index")
  end

  def show(conn, %{"id" => id}) do
    technique = Skills.get_technique!(conn.assigns.current_user, id)

    conn
    |> assign_prop(:technique, technique)
    |> assign_prop(:breadcrumbs, [["Techniques", "/techniques"], [technique.name, "/techniques/#{id}"]])
    |> render_inertia("Techniques/Show")
  end

  def edit(conn, %{"id" => id}) do
    technique = Skills.get_technique!(conn.assigns.current_user, id)

    conn
    |> assign_prop(:technique, technique)
    |> assign_prop(:breadcrumbs, [["Techniques", "/techniques"], [technique.name, "/techniques/#{id}"], ["Edit", "/techniques/#{id}/edit"]])
    |> render_inertia("Techniques/Edit")
  end

end
