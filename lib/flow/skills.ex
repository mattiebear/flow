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
    |> Repo.preload(steps: :details, situations: :position)
  end

  def update_technique(%Technique{} = technique, attrs) do
    # TODO: How will we authorize the technique?
    technique
    |> Technique.changeset(attrs)
    |> Repo.update()
  end

  def change_technique(%Technique{} = technique, attrs \\ %{}) do
    Technique.changeset(technique, attrs)
  end

  def list_user_positions(%User{} = user) do
    query = from p in Position, where: p.user_id == ^user.id
    Repo.all(query)
  end

  def get_user_position(%User{} = user, id) do
    Repo.get_by!(Position, user_id: user.id, id: id)
  end

  def create_user_position(%User{} = user, attrs) do
    %Position{}
    |> Position.changeset(attrs)
    |> Changeset.put_assoc(:user, user)
    |> Repo.insert()
  end

  def update_position(%Position{} = position, attrs) do
    # TODO: How will we authorize the position?
    position
    |> Position.changeset(attrs)
    |> Repo.update()
  end

  def change_position(%Position{} = position, attrs \\ %{}) do
    Position.changeset(position, attrs)
  end
end
