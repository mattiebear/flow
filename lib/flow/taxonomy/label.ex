defmodule Flow.Taxonomy.Label do
  use Ecto.Schema

  import Ecto.Changeset

  @derive {Jason.Encoder, except: [:__meta__, :user]}

  schema "taxonomy_labels" do
    field :tag, :string

    belongs_to :user, Flow.Accounts.User

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(label, attrs) do
    label
    |> cast(attrs, [:tag])
    |> validate_required([:tag])
    |> validate_length(:tag, max: 30)
    |> validate_format(:tag, ~r/^[a-z]+(?:\/[a-z]+)?$/)
    |> unsafe_validate_unique(:tag, Flow.Repo)
    |> unique_constraint([:user_id, :tag])
  end
end
