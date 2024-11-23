defmodule Flow.Repo.Migrations.CreateTaxonomyTechniqueLabels do
  use Ecto.Migration

  def change do
    create table(:taxonomy_technique_labels) do
      add :label_id, references(:taxonomy_labels, on_delete: :delete_all)
      add :technique_id, references(:skills_techniques, on_delete: :delete_all)

      timestamps(type: :utc_datetime)
    end

    create index(:taxonomy_technique_labels, [:label_id])
    create index(:taxonomy_technique_labels, [:technique_id])
  end
end
