defmodule Flow.Taxonomy do
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
end
