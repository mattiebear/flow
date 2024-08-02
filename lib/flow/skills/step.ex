defmodule Flow.Skills.Step do
  use Ecto.Schema
  import Ecto.Changeset

  schema "skills_steps" do
    field :description, :string
    field :order, :integer

    belongs_to :technique, Flow.Skills.Technique

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(step, attrs) do
    step
    |> cast(attrs, [:order, :description])
    |> validate_required([:order, :description])
  end
end
