defmodule Flow.Training.TrainingSession do
  use Ecto.Schema
  import Ecto.Changeset

  schema "training_training_sessions" do
    field :date, :date
    field :reflection, :string

    belongs_to :user, Flow.Accounts.User

    has_many :subjects, Flow.Training.Subject, preload_order: [asc: :order], on_replace: :delete

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(training_session, attrs) do
    training_session
    |> cast(attrs, [:date, :reflection])
    |> cast_assoc(:subjects,
      with: &Flow.Training.Subject.changeset/3,
      sort_param: :subjects_order,
      drop_param: :subjects_delete
    )
  end
end
