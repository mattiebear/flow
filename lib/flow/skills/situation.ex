defmodule Flow.Skills.Situation do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key false
  schema "skills_situations" do
    field :placement, Ecto.Enum, values: [none: 0, within: 1, against: 2]
    field :order, :integer

    belongs_to :position, Flow.Skills.Position
    belongs_to :technique, Flow.Skills.Technique

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(situation, attrs, order) do
    situation
    |> cast(attrs, [:placement, :position_id])
    |> change(order: order)
    |> validate_required([:placement])
    |> unsafe_validate_unique([:position_id, :technique_id], Flow.Repo)
    |> unique_constraint([:position_id, :technique_id])
  end
end
