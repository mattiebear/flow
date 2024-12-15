defmodule FlowWeb.PageController do
  use FlowWeb, :controller

  def home(conn, _params) do
    # The home page is often custom made,
    # so skip the default app layout.
    # render(conn, :home, layout: false)
    conn
    |> assign(:page_title, "Flow")
    |> render_inertia("Dashboard")
  end
end
