defmodule Flow.Skills.Focus do
  use Ecto.Schema

  import Ecto.Changeset

  alias Flow.Skills.Step

  @derive {Jason.Encoder, except: [:__meta__, :step]}

  schema "skills_focuses" do
    field :description, :string

    belongs_to :step, Step

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(focus, attrs) do
    focus
    |> cast(attrs, [:description])
    |> validate_required([:description])
  end
end
