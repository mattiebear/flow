defmodule FlowWeb.PageController do
  use FlowWeb, :controller

  def home(conn, _params) do
    render_inertia(conn, "Dashboard")
  end
end
