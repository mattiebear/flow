defmodule Flow.Skills.Step do
  use Ecto.Schema
  import Ecto.Changeset

  schema "skills_steps" do
    field :description, :string
    field :position, :integer

    belongs_to :technique, Flow.Skills.Technique

    has_many :details, Flow.Skills.Detail, preload_order: [asc: :position], on_replace: :delete

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(step, attrs, position) do
    step
    |> cast(attrs, [:description])
    |> change(position: position)
    |> cast_assoc(:details,
      with: &Flow.Skills.Detail.changeset/3,
      sort_param: :details_order,
      drop_param: :details_delete
    )
    |> validate_required([:description])
  end
end
