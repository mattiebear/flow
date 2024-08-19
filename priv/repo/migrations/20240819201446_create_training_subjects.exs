defmodule Flow.Repo.Migrations.CreateTrainingSubjects do
  use Ecto.Migration

  def change do
    create table(:training_subjects) do
      add :performance, :integer
      add :technique_id, references(:skills_techniques, on_delete: :delete_all)
      add :training_session_id, references(:training_training_sessions, on_delete: :delete_all)

      timestamps(type: :utc_datetime)
    end

    create index(:training_subjects, [:technique_id])
  end
end
