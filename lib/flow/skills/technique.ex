defmodule Flow.Skills.Technique do
  use Ecto.Schema
  import Ecto.Changeset

  schema "skills_techniques" do
    field :name, :string

    belongs_to :user, Flow.Accounts.User

    has_many :situations, Flow.Skills.Situation
    has_many :steps, Flow.Skills.Step
    has_many :positions, through: [:situations, :position]

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(technique, attrs) do
    technique
    |> cast(attrs, [:name])
    |> cast_assoc(:situations, with: &Flow.Skills.Situation.changeset/2)
    |> cast_assoc(:steps, with: &Flow.Skills.Step.changeset/2)
    |> validate_required([:name])
  end
end
