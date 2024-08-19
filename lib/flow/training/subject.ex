defmodule Flow.Training.Subject do
  use Ecto.Schema
  import Ecto.Changeset

  schema "training_subjects" do
    field :performance, :integer

    belongs_to :technique, Flow.Skills.Technique
    belongs_to :training_session, Flow.Training.TrainingSession

    has_many :detail_ratings, Flow.Training.DetailRating
    has_many :step_ratings, Flow.Training.StepRating

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(subject, attrs) do
    subject
    |> cast(attrs, [:performance])
    |> validate_required([:performance])
  end
end
