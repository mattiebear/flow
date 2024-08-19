defmodule Flow.Training.TrainingSession do
  use Ecto.Schema
  import Ecto.Changeset

  schema "training_training_sessions" do
    field :date, :date
    field :reflection, :string

    belongs_to :user, Flow.Accounts.User

    has_many :subjects, Flow.Training.Subject

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(training_session, attrs) do
    training_session
    |> cast(attrs, [:date, :reflection])
  end
end
