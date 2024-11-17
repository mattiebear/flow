defmodule Flow.Skills do
  import Ecto.Query

  alias Flow.Repo
  alias Flow.Accounts.User
  alias Flow.Skills.Technique

  @doc """
  Returns the count of techniques for a given user.
  """
  def get_technique_count(%User{} = user) do
    Repo.one(from p in Technique, where: p.user_id == ^user.id, select: count(p.id))
  end

  @doc """
  Creates a technique for a given user.

  ## Examples

      iex> create_technique(%User{}, %{name: "My Technique"})
      {:ok, %Technique{}}

  """
  def create_technique(%User{} = user, attrs) do
    %Technique{}
    |> Technique.changeset(attrs)
    |> Ecto.Changeset.put_assoc(:user, user)
    |> Repo.insert()
  end
end
