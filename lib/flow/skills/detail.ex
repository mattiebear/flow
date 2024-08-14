defmodule Flow.Skills.Detail do
  use Ecto.Schema
  import Ecto.Changeset

  schema "skills_details" do
    field :description, :string
    field :position, :integer

    belongs_to :step, Flow.Sills.Step

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(detail, attrs, position) do
    detail
    |> cast(attrs, [:description])
    |> change(position: position)
    |> validate_required([:description])
  end
end
