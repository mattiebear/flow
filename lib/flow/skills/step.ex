defmodule Flow.Skills.Step do
  use Ecto.Schema
  import Ecto.Changeset

  schema "skills_steps" do
    field :description, :string

    belongs_to :step, Flow.Skills.Step

    many_to_many :details, Flow.Skills.Detail, join_through: Flow.Skills.StepDetail

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(step, attrs) do
    step
    |> cast(attrs, [:description])
    |> cast_assoc(:details)
    |> validate_required([:description])
  end
end
