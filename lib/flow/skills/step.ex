defmodule Flow.Skills.Step do
  use Ecto.Schema

  import Ecto.Changeset

  alias Flow.Skills.{Focus, Technique}

  @derive {Jason.Encoder, except: [:__meta__, :technique]}

  schema "skills_steps" do
    field :description, :string
    field :layout_id, :integer

    belongs_to :technique, Technique

    has_many :focuses, Focus

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(step, attrs) do
    step
    |> cast(attrs, [:description, :layout_id])
    |> cast_assoc(:focuses)
    |> validate_required([:description, :layout_id])
  end
end
