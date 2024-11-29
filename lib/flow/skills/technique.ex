defmodule Flow.Skills.Technique do
  use Ecto.Schema

  import Ecto.Changeset

  alias Flow.Taxonomy
  alias Flow.Accounts.User
  alias Flow.Skills.Step
  alias Flow.Taxonomy.Label

  @derive {Jason.Encoder, except: [:__meta__, :user]}

  schema "skills_techniques" do
    field :description, :string
    field :layout, {:array, :map}, default: []
    field :name, :string

    belongs_to :user, User

    has_many :steps, Step

    many_to_many :labels, Label, join_through: "taxonomy_technique_labels", on_replace: :delete

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(technique, attrs) do
    # FIXME: This shouldn't be happening here, but where?
    label_ids = Enum.map(attrs["labels"], & &1["id"])
    labels = Taxonomy.get_labels(label_ids)

    technique
    |> cast(attrs, [:description, :layout, :name])
    |> cast_assoc(:steps)
    |> put_assoc(:labels, labels)
    |> validate_required([:layout, :name])
  end
end
