defmodule Flow.Repo.Migrations.CreateTechniques do
  use Ecto.Migration

  def change do
    create table(:techniques) do
      add :name, :string
      add :user_id, references(:users, on_delete: :delete_all)

      timestamps(type: :utc_datetime)
    end

    create index(:techniques, [:name])
    create index(:techniques, [:user_id])
  end
end
