defmodule Flow.Skills.StepDetail do
  use Ecto.Schema
  import Ecto.Changeset

  schema "skills_step_details" do
    belongs_to :detail, Flow.Skills.Detail
    belongs_to :step, Flow.Skills.Step

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(step_detail, attrs) do
    step_detail
    |> cast(attrs, [])
    |> unique_constraint(:detail_id)
  end
end
