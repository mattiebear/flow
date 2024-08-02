defmodule Flow.Skills.Situation do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key false
  schema "situations" do
    field :placement, Ecto.Enum, values: [none: 0, within: 1, against: 2]

    belongs_to :position, Flow.Skills.Position
    belongs_to :technique, Flow.Skills.Technique

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(situation, attrs) do
    situation
    |> cast(attrs, [:placement])
    |> validate_required([:placement])
    |> unsafe_validate_unique([:position_id, :technique_id], Flow.Repo)
    |> unique_constraint([:position_id, :technique_id])
  end
end
