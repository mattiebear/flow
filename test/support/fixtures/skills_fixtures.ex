defmodule Flow.SkillsFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Flow.Skills` context.
  """

  import Flow.AccountsFixtures

  alias Flow.Repo
  alias Flow.Skills.Technique

  def valid_technique_attributes(attrs \\ %{}) do
    Enum.into(attrs, %{
      name: "My Technique"
    })
  end

  def techinque_fixture(attrs \\ %{}) do
    attrs =
      attrs
      |> valid_technique_attributes()
      |> Map.put_new(:user, user_fixture())

    {:ok, technique} =
      %Technique{}
      |> Map.merge(attrs)
      |> Repo.insert()

    technique
  end
end
