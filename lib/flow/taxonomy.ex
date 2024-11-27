defmodule Flow.Taxonomy do
  import Ecto.Query

  alias Flow.Repo
  alias Flow.Accounts.User
  alias Flow.Taxonomy.Label

  @doc """
  Creates a new label.
  """

  def create_label(%User{} = user, attrs) do
    %Label{}
    |> Label.changeset(attrs)
    |> Ecto.Changeset.put_assoc(:user, user)
    |> Repo.insert()
  end

  @doc """
  Searches for labels by tag
  """

  def search_labels(%User{} = user, opts) do
    limit = Keyword.get(opts, :limit, 100)

    query = from l in Label, where: l.user_id == ^user.id, limit: ^limit

    if search = Keyword.get(opts, :search) do
      query = from l in query, where: fragment("? ILIKE ?", l.tag, ^"%#{search}%")
    end

    Repo.all(query)
  end
end
