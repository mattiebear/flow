defmodule Flow.Training.DetailRating do
  use Ecto.Schema
  import Ecto.Changeset

  schema "training_detail_ratings" do
    field :rating, :integer

    belongs_to :detail, Flow.Skills.Detail
    belongs_to :subject, Flow.Training.Subject

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(detail_rating, attrs) do
    detail_rating
    |> cast(attrs, [:detail_id, :rating])
    |> validate_required([:rating])
  end
end
