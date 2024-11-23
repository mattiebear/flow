defmodule Flow.Skills.Step do
  use Ecto.Schema

  import Ecto.Changeset

  @derive {Jason.Encoder, except: [:__meta__, :technique]}

  schema "skills_steps" do
    field :description, :string
    field :layout_id, :string

    belongs_to :technique, Flow.Skills.Technique

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(step, attrs) do
    step
    |> cast(attrs, [:description, :layout_id])
    |> validate_required([:description, :layout_id])
  end
end
