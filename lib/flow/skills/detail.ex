defmodule Flow.Skills.Detail do
  use Ecto.Schema
  import Ecto.Changeset

  schema "skills_details" do
    field :description, :string
    field :order, :integer

    belongs_to :step, Flow.Skills.Step

    has_many :detail_ratings, Flow.Training.DetailRating

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(detail, attrs, order) do
    detail
    |> cast(attrs, [:description])
    |> change(order: order)
    |> validate_required([:description])
  end
end
