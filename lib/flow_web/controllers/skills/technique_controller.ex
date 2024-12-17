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
end
