defmodule Flow.Skills.Detail do
  use Ecto.Schema
  import Ecto.Changeset

  schema "skills_details" do
    field :description, :string

    belongs_to :step, Flow.Sills.Step

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(detail, attrs) do
    detail
    |> cast(attrs, [:description])
    |> validate_required([:description])
  end
end
