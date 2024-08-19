defmodule Flow.Repo.Migrations.CreateTrainingDetailRatings do
  use Ecto.Migration

  def change do
    create table(:training_detail_ratings) do
      add :rating, :integer
      add :subject_id, references(:training_subjects, on_delete: :delete_all)
      add :detail_id, references(:skills_details, on_delete: :delete_all)

      timestamps(type: :utc_datetime)
    end

    create index(:training_detail_ratings, [:subject_id])
    create index(:training_detail_ratings, [:detail_id])
  end
end
