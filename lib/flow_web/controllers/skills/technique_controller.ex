defmodule FlowWeb.Skills.TechniqueController do
  use FlowWeb, :controller

  alias Flow.Skills

  def index(conn, _params) do
    conn
    |> assign_prop(:techniques, fn -> Skills.list_techniques(conn.assigns.current_user) end)
    |> assign_prop(:breadcrumbs, techniques_breadcrumbs())
    |> render_inertia("Techniques/Index")
  end

  def show(conn, %{"id" => id}) do
    technique = Skills.get_technique!(conn.assigns.current_user, id)

    conn
    |> assign_prop(:technique, technique)
    |> assign_prop(:breadcrumbs, technique_breadcrumb(technique))
    |> render_inertia("Techniques/Show")
  end

  def edit(conn, %{"id" => id}) do
    technique = Skills.get_technique!(conn.assigns.current_user, id)

    conn
    |> assign_prop(:technique, technique)
    |> assign_prop(:breadcrumbs, edit_technique_breadcrumb(technique))
    |> render_inertia("Techniques/Edit")
  end

  defp techniques_breadcrumbs do
    [["Techniques", "/techniques"]]
  end

  defp technique_breadcrumb(technique) do
    techniques_breadcrumbs() ++ [[technique.name, "/techniques/#{technique.id}"]]
  end

  defp edit_technique_breadcrumb(technique) do
    technique_breadcrumb(technique) ++ [["Edit", "/techniques/#{technique.id}/edit"]]
  end
end
