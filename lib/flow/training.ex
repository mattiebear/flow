defmodule Flow.Training do
  alias Ecto.Changeset
  alias Flow.Accounts.User
  alias Flow.Repo
  alias Flow.Training.TrainingSession

  def create_user_training_session(%User{} = user, attrs) do
    %TrainingSession{}
    |> TrainingSession.changeset(attrs)
    |> Changeset.put_assoc(:user, user)
    |> Repo.insert()
  end 

  def change_training_session(%TrainingSession{} = training_session, attrs \\ %{}) do
    TrainingSession.changeset(training_session, attrs)
  end
end
