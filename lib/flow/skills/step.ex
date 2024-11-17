defmodule Flow.Skills.Step do
  use Ecto.Schema
  import Ecto.Changeset

  schema "skills_steps" do
    field :description, :string
    field :layout_id, :string

    belongs_to :technique, Flow.Skills.Technique

    many_to_many :details, Flow.Skills.Detail, join_through: Flow.Skills.StepDetail

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(step, attrs) do
    step
    |> cast(attrs, [:description, :layout_id])
    |> cast_assoc(:details)
    |> validate_required([:description, :layout_id])
  end
end
