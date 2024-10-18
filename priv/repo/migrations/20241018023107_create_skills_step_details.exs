defmodule Flow.Repo.Migrations.CreateSkillsStepDetails do
  use Ecto.Migration

  def change do
    create table(:skills_step_details) do
      add :detail_id, references(:skills_details, on_delete: :delete_all)
      add :step_id, references(:skills_steps, on_delete: :delete_all)

      timestamps(type: :utc_datetime)
    end

    create unique_index(:skills_step_details, [:detail_id])
    create index(:skills_step_details, [:step_id])
  end
end
