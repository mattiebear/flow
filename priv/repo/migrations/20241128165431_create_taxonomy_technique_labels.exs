defmodule Flow.Repo.Migrations.CreateTaxonomyTechniqueLabels do
  use Ecto.Migration

  def change do
    create table(:taxonomy_technique_labels) do
      add :label_id, references(:taxonomy_labels, on_delete: :delete_all), null: false
      add :technique_id, references(:skills_techniques, on_delete: :delete_all), null: false
    end

    create index(:taxonomy_technique_labels, [:label_id])
    create unique_index(:taxonomy_technique_labels, [:technique_id, :label_id])
  end
end
