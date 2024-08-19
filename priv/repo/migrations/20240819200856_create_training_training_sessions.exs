defmodule Flow.Repo.Migrations.CreateTrainingTrainingSessions do
  use Ecto.Migration

  def change do
    create table(:training_training_sessions) do
      add :date, :date
      add :reflection, :string
      add :user_id, references(:accounts_users, on_delete: :delete_all)

      timestamps(type: :utc_datetime)
    end

    create index(:training_training_sessions, [:user_id])
  end
end
