defmodule Flow.SkillsFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Flow.Skills` context.
  """

  alias Flow.Repo
  alias Flow.AccountsFixtures
  alias Flow.Skills.Detail
  alias Flow.Skills.Position
  alias Flow.Skills.Step
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
      |> Map.merge(%{user_id: user.id})
      |> Map.drop([:user])

    technique = Map.merge(%Technique{}, attrs)
    {:ok, technique} = Repo.insert(technique)

    technique
  end

  @step_attrs %{order: 1, description: "Hold your ground"}

  def step_fixture(attrs \\ %{}) do
    technique = maybe_create(attrs[:technique], &technique_fixture/0)

    attrs =
      attrs
      |> Enum.into(@step_attrs)
      |> Map.merge(%{technique_id: technique.id})
      |> Map.drop([:technique])

    step = Map.merge(%Step{}, attrs)
    {:ok, step} = Repo.insert(step)

    step
  end
  
  @detail_attrs %{order: 1, description: "Do it well"}

  def detail_fixture(attrs \\ %{}) do
    step = maybe_create(attrs[:step], &step_fixture/0)

    attrs =
      attrs
      |> Enum.into(@detail_attrs)
      |> Map.merge(%{step_id: step.id})
      |> Map.drop([:step])

    detail = Map.merge(%Detail{}, attrs)
    {:ok, detail} = Repo.insert(detail)

    detail
  end

  @position_attrs %{name: "Open Guard", description: "Be open"}

  def position_fixture(attrs \\ %{}) do
    user = maybe_create(attrs[:user], &Flow.AccountsFixtures.user_fixture/0)

    attrs =
      attrs
      |> Enum.into(@position_attrs)
      |> Map.merge(%{user_id: user.id})
      |> Map.drop([:user])

    position = Map.merge(%Position{}, attrs)
    {:ok, position} = Repo.insert(position)

    position
  end

end
