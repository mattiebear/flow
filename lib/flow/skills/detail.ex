defmodule Flow.Skills.Detail do
  use Ecto.Schema
  import Ecto.Changeset

  schema "skills_details" do
    field :description, :string
    field :step_id, :id

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(detail, attrs) do
    detail
    |> cast(attrs, [:description])
    |> validate_required([:description])
  end
end
