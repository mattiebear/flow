defmodule FlowWeb.API.LabelController do
  use FlowWeb, :controller

  alias Flow.Schema.Error
  alias Flow.Taxonomy

  def index(conn, params) do
    limit = Map.get(params, "limit", "10") |> String.to_integer()
    search = Map.get(params, "search", "")
    exclude = Map.get(params, "exclude", [])

    labels =
      Taxonomy.search_labels(
        conn.assigns.current_user,
        exclude: exclude,
        limit: limit,
        search: search
      )

    render(conn, :index, labels: labels)
  end

  def create(conn, params) do
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
