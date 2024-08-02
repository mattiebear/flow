defmodule Flow.Repo.Migrations.CreateTechniques do
  use Ecto.Migration

  def change do
    create table(:skills_techniques) do
      add :name, :string
      add :user_id, references(:accounts_users, on_delete: :delete_all)

      timestamps(type: :utc_datetime)
    end

    create index(:skills_techniques, [:name])
    create index(:skills_techniques, [:user_id])
  end
end
