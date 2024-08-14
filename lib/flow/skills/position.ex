defmodule Flow.Skills.Position do
  use Ecto.Schema
  import Ecto.Changeset

  schema "skills_positions" do
    field :name, :string
    field :description, :string

    belongs_to :user, Flow.Accounts.User

    has_many :situations, Flow.Skills.Situation
    has_many :techniques, through: [:situations, :technique]

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(position, attrs) do
    position
    |> cast(attrs, [:description, :name])
    |> validate_required([:name])
    |> unsafe_validate_unique([:name, :email], Flow.Repo)
    |> unique_constraint([:name, :user_id])
  end
end
