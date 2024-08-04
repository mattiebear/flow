defmodule Flow.Skills.Step do
  use Ecto.Schema
  import Ecto.Changeset

  schema "skills_steps" do
    field :description, :string
    field :order, :integer

    belongs_to :technique, Flow.Skills.Technique

    has_many :details, Flow.Skills.Detail

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(step, attrs) do
    step
    |> cast(attrs, [:order, :description])
    |> cast_assoc(:steps, with: &Flow.Skills.Step.changeset/2)
    |> validate_required([:order, :description])
  end
end
