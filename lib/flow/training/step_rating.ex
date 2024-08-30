defmodule Flow.Training.StepRating do
  use Ecto.Schema
  import Ecto.Changeset

  schema "training_step_ratings" do
    field :rating, :integer

    belongs_to :step, Flow.Skills.Step
    belongs_to :subject, Flow.Training.Subject

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(step_rating, attrs) do
    step_rating
    |> cast(attrs, [:rating, :step_id])
    |> validate_required([:rating])
  end
end
