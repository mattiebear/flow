defmodule Flow.Skills.Technique do
  use Ecto.Schema
  import Ecto.Changeset

  schema "skills_techniques" do
    field :name, :string

    belongs_to :user, Flow.Accounts.User

    has_many :situations, Flow.Skills.Situation, preload_order: [asc: :order], on_replace: :delete
    has_many :steps, Flow.Skills.Step, preload_order: [asc: :order], on_replace: :delete
    has_many :positions, through: [:situations, :position]

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(technique, attrs) do
    technique
    |> cast(attrs, [:name])
    |> cast_assoc(:situations,
      with: &Flow.Skills.Situation.changeset/3,
      sort_param: :situations_order,
      drop_param: :situations_delete)
    |> cast_assoc(:steps,
      with: &Flow.Skills.Step.changeset/3,
      sort_param: :steps_order,
      drop_param: :steps_delete
    )
    |> validate_required([:name])
  end
end
