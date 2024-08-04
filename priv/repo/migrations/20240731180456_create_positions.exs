defmodule Flow.Repo.Migrations.CreatePositions do
  use Ecto.Migration

  def change do
    create table(:skills_positions) do
      add :name, :string, null: false
      add :user_id, references(:accounts_users, on_delete: :delete_all)

      timestamps(type: :utc_datetime)
    end

    create index(:skills_positions, [:user_id])
    create unique_index(:skills_positions, [:name, :user_id])
  end
end
