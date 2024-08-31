defmodule Flow.Training.Subject do
  use Ecto.Schema
  import Ecto.Changeset

  schema "training_subjects" do
    field :performance, :integer
    field :order, :integer

    belongs_to :technique, Flow.Skills.Technique
    belongs_to :training_session, Flow.Training.TrainingSession

    has_many :detail_ratings, Flow.Training.DetailRating
    has_many :step_ratings, Flow.Training.StepRating

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(subject, attrs, order) do
    subject
    |> cast(attrs, [:performance, :technique_id])
    |> change(order: order)
    |> validate_required([:performance])
    |> cast_assoc(:detail_ratings, with: &Flow.Training.DetailRating.changeset/2)
    |> cast_assoc(:step_ratings, with: &Flow.Training.StepRating.changeset/2)
  end
end
