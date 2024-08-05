defmodule Flow.Skills do
  alias Ecto.Changeset
  alias Flow.Accounts.User
  alias Flow.Repo
  alias Flow.Skills.Technique

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
