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
    exclude = Keyword.get(opts, :exclude, [])

    query = from l in Label,
      where: l.user_id == ^user.id,
      where: not(l.id in ^exclude),
      limit: ^limit

    query =
      case Keyword.get(opts, :search, "") do
        "" -> query
        search -> from l in query, where: fragment("? ILIKE ?", l.tag, ^"%#{search}%")
      end



    Repo.all(query)
  end

  def get_labels(label_ids) do
    query = from l in Label, where: l.id in ^label_ids
    Repo.all(query)
  end
end
