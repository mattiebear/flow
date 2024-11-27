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

  def search_labels(%User{} = user, tag) do
    Repo.all(
      from l in Label, where: l.user_id == ^user.id and fragment("? ILIKE ?", l.tag, ^"%#{tag}%")
    )
  end
end
