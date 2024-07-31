defmodule Flow.Skills.Position do
  use Ecto.Schema
  import Ecto.Changeset

  schema "positions" do
    field :name, :string

    belongs_to :user, Flow.Accounts.User

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(position, attrs) do
    position
    |> cast(attrs, [:name])
    |> validate_required([:name])
    |> unsafe_validate_unique([:name, :email], Flow.Repo)
    |> unique_constraint([:name, :user_id])
  end
end
