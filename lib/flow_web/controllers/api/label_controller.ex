defmodule FlowWeb.API.LabelController do
  use FlowWeb, :controller

  alias Flow.Schema.Error
  alias Flow.Taxonomy

  def index(conn, _params) do
    render(conn, :index, labels: [])
  end

  def create(conn, params) do
    dbg(params)

    case Taxonomy.create_label(conn.assigns.current_user, params) do
      {:ok, label} ->
        render(conn, :show, label: label)

      {:error, changeset} ->
        conn
        |> put_status(422)
        |> render(:failure, errors: Error.serialize_errors(changeset))
    end
  end
end
