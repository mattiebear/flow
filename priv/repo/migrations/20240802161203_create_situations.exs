defmodule Flow.Repo.Migrations.CreateSituations do
  use Ecto.Migration

  def change do
    create table(:skills_situations) do
      add :placement, :integer, null: false, default: 0

      add :technique_id, references(:skills_techniques, on_delete: :delete_all)
      add :position_id, references(:skills_positions, on_delete: :delete_all)

      timestamps(type: :utc_datetime)
    end

    create unique_index(:skills_situations, [:position_id, :technique_id])
    create index(:skills_situations, [:technique_id])
  end
end
