defmodule Flow.Skills.Technique do
  use Ecto.Schema

  import Ecto.Changeset

  @derive {Jason.Encoder, except: [:__meta__, :user]}

  schema "skills_techniques" do
    field :description, :string
    field :layout, {:array, :map}, default: []
    field :name, :string

    belongs_to :user, Flow.Accounts.User

    has_many :steps, Flow.Skills.Step

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(technique, attrs) do
    technique
    |> cast(attrs, [:description, :name])
    |> cast_assoc(:steps)
    |> validate_required([:name])
  end
end
