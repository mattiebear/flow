defmodule Flow.Skills do
  import Ecto.Query

  alias Ecto.Changeset
  alias Flow.Accounts.User
  alias Flow.Repo
  alias Flow.Skills.Position
  alias Flow.Skills.Technique

  def list_user_techniques(%User{} = user) do
    query = from t in Technique, where: t.user_id == ^user.id
    Repo.all(query)
  end

  def create_user_technique(%User{} = user, attrs) do
    %Technique{}
    |> Technique.changeset(attrs)
    |> Changeset.put_assoc(:user, user)
    |> Repo.insert()
  end

  def get_user_technique(%User{} = user, id) do
    Repo.get_by!(Technique, user_id: user.id, id: id)
    |> Repo.preload(steps: :details)
  end

  def change_technique(%Technique{} = technique, attrs \\ %{}) do
    Technique.changeset(technique, attrs)
  end

  def search_user_positions(%User{} = user, _search \\ "") do
    # TODO: Update query to handle search
    # TODO: Update to be debounced
    query = from p in Position, where: p.user_id == ^user.id

    Repo.all(query)
  end

  def change_position(%Position{} = position, attrs \\ %{}) do
    Position.changeset(position, attrs)
  end
end
