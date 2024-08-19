defmodule Flow.Repo.Migrations.CreateTrainingStepRatings do
  use Ecto.Migration

  def change do
    create table(:training_step_ratings) do
      add :rating, :integer
      add :subject_id, references(:training_subjects, on_delete: :delete_all)
      add :step_id, references(:skills_steps, on_delete: :delete_all)

      timestamps(type: :utc_datetime)
    end

    create index(:training_step_ratings, [:subject_id])
    create index(:training_step_ratings, [:step_id])
  end
end
