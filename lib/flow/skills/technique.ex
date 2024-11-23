defmodule Flow.Skills.Technique do
  use Ecto.Schema

  import Ecto.Changeset

  @derive {Jason.Encoder, except: [:__meta__, :user]}

  schema "skills_techniques" do
    field :description, :string
    field :layout, {:array, :map}, default: []
    field :name, :string

    belongs_to :user, Flow.Accounts.User

    has_many :steps, Flow.Skills.Step

    many_to_many :labels, Flow.Taxonomy.Label, join_through: "taxonomy_technique_labels"

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(technique, attrs) do
    technique
    |> cast(attrs, [:description, :layout, :name])
    |> cast_assoc(:labels)
    |> cast_assoc(:steps)
    |> validate_required([:layout, :name])
  end
end
