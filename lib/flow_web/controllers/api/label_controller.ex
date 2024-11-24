defmodule FlowWeb.API.LabelController do
  use FlowWeb, :controller

  def index(conn, _params) do
    render(conn, :index, labels: [])
  end

  def create(conn, _params) do
    render(conn, :show, label: nil)
  end
end
