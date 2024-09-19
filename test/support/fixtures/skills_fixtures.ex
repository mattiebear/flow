defmodule Flow.SkillsFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Flow.Skills` context.
  """

  alias Flow.Repo
  alias Flow.AccountsFixtures
  alias Flow.Skills.Technique

  @technique_attrs %{name: "Half guard"}

  def maybe_create(maybe_fixture, fixture_builder) do
    maybe_fixture || fixture_builder.()
  end

  def technique_fixture(attrs \\ %{}) do
    user = maybe_create(attrs[:user], &AccountsFixtures.user_fixture/0)

    attrs =
      attrs
      |> Enum.into(@technique_attrs)
      |> Map.merge(%{user: user})

    technique = Map.merge(%Technique{}, attrs)
    {:ok, technique} = Repo.insert(technique)

    technique
  end
end
