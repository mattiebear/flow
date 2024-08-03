defmodule Flow.Skills do
  alias Flow.Skills.Technique

  def change_technique(%Technique{} = technique, attrs \\ %{}) do
    Technique.changeset(technique, attrs)
  end 
end
