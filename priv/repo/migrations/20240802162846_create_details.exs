defmodule Flow.Repo.Migrations.CreateDetails do
  use Ecto.Migration

  def change do
    create table(:skills_details) do
      add :description, :string
      add :step_id, references(:skills_steps, on_delete: :nothing)

      timestamps(type: :utc_datetime)
    end

    create index(:skills_details, [:step_id])
  end
end
