defmodule Flow.Repo.Migrations.CreateTechniques do
  use Ecto.Migration

  def change do
    create table(:techniques) do
      add :name, :string

      timestamps(type: :utc_datetime)
    end
  end
end
