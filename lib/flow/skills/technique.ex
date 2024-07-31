defmodule Flow.Skills.Technique do
  use Ecto.Schema
  import Ecto.Changeset

  schema "techniques" do
    field :name, :string

    belongs_to :user, Flow.Accounts.User

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(technique, attrs) do
    technique
    |> cast(attrs, [:name])
    |> validate_required([:name])
  end
end
