defmodule Flow.Repo.Migrations.CreateSkillsFocuses do
  use Ecto.Migration

  def change do
    create table(:skills_focuses) do
      add :description, :text
      add :step_id, references(:skills_steps, on_delete: :delete_all), null: false

      timestamps(type: :utc_datetime)
    end

    create index(:skills_focuses, [:step_id])
  end
end
