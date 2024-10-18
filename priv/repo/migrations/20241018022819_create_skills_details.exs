defmodule Flow.Repo.Migrations.CreateSkillsDetails do
  use Ecto.Migration

  def change do
    create table(:skills_details) do
      add :description, :text, null: false

      timestamps(type: :utc_datetime)
    end
  end
end
