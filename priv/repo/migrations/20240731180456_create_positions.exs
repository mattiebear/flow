defmodule Flow.Repo.Migrations.CreatePositions do
  use Ecto.Migration

  def change do
    create table(:positions) do
      add :name, :string
      add :user_id, references(:users, on_delete: :delete_all)

      timestamps(type: :utc_datetime)
    end

    create index(:positions, [:user_id])
    create unique_index(:positions, [:name, :user_id])
  end
end
