defmodule Flow.Repo.Migrations.CreateDetails do
  use Ecto.Migration

  def change do
    create table(:skills_details) do
      add :description, :text, null: false
      add :order, :integer, null: false
      add :step_id, references(:skills_steps, on_delete: :delete_all)

      timestamps(type: :utc_datetime)
    end

    create index(:skills_details, [:step_id])
  end
end
