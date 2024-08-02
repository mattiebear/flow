defmodule Flow.Repo.Migrations.CreateSituations do
  use Ecto.Migration

  def change do
    create table(:situations) do
      add :placement, :integer, default: 0

      add :technique_id, references(:techniques, on_delete: :delete_all)
      add :position_id, references(:positions, on_delete: :delete_all)

      timestamps(type: :utc_datetime)
    end

    create unique_index(:situations, [:position_id, :technique_id])
    create index(:situations, [:technique_id])
  end
end
