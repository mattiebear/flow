defmodule Flow.TrainingFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Flow.Training` context.
  """

  alias Flow.Repo
  alias Flow.AccountsFixtures
  alias Flow.Training.TrainingSession

  @training_session_attrs %{date: ~D[2024-01-01], reflection: "It was good"}

  # TODO: Move this to a shared helper import
  def maybe_create(maybe_fixture, fixture_builder) do
    maybe_fixture || fixture_builder.()
  end

  def training_session_fixture(attrs \\ %{}) do
    user = maybe_create(attrs[:user], &AccountsFixtures.user_fixture/0)

    attrs =
      attrs
      |> Enum.into(@training_session_attrs)
      |> Map.merge(%{user_id: user.id})
      |> Map.drop([:user])

    training_session = Map.merge(%TrainingSession{}, attrs)
    {:ok, training_session} = Repo.insert(training_session)

    training_session
  end
end
