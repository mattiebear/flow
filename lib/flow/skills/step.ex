defmodule Flow.Skills.Step do
  use Ecto.Schema
  import Ecto.Changeset

  schema "skills_steps" do
    field :description, :string

    belongs_to :technique, Flow.Skills.Technique

    has_many :details, Flow.Skills.Detail

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(step, attrs) do
    step
    |> cast(attrs, [:description])
    |> cast_assoc(:details, with: &Flow.Skills.Detail.changeset/2)
    |> validate_required([:description])
  end
end
