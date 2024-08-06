defmodule Flow.Skills do
  import Ecto.Query

  alias Ecto.Changeset
  alias Flow.Accounts.User
  alias Flow.Repo
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

  def change_technique(%Technique{} = technique, attrs \\ %{}) do
    Technique.changeset(technique, attrs)
  end
end
