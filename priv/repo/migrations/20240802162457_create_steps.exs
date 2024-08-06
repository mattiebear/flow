defmodule Flow.Repo.Migrations.CreateSteps do
  use Ecto.Migration

  def change do
    create table(:skills_steps) do
      add :description, :string, null: false
      add :technique_id, references(:skills_techniques, on_delete: :delete_all)

      timestamps(type: :utc_datetime)
    end

    create index(:skills_steps, [:technique_id])
  end
end
