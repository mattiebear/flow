defmodule Flow.Repo.Migrations.CreateTaxonomyLabels do
  use Ecto.Migration

  def change do
    create table(:taxonomy_labels) do
      add :tag, :string, null: false
      add :user_id, references(:accounts_users, on_delete: :delete_all)

      timestamps(type: :utc_datetime)
    end

    create index(:taxonomy_labels, [:tag])
    create unique_index(:taxonomy_labels, [:user_id, :tag])
  end
end
