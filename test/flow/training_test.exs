defmodule Flow.TrainingTest do
  use Flow.DataCase

  import Flow.AccountsFixtures
  import Flow.TrainingFixtures

  alias Flow.Training
  alias Flow.Training.Subject
  alias Flow.Training.TrainingSession

  describe "training" do
    test "create_user_training_session/2 creates a training session for the user" do
      user = user_fixture()
      {:ok, training_session} = Training.create_user_training_session(user, %{})
      user_id = user.id

      assert %TrainingSession{user_id: ^user_id} = training_session
    end

    test "change_training_session/2 creates a changeset" do
      assert %Ecto.Changeset{} =
               Training.change_training_session(%TrainingSession{}, %{date: ~D[2024-09-19]})
    end

    test "change_subject/2 creates a changeset" do
      assert %Ecto.Changeset{} = Training.change_subject(%Subject{}, %{})
    end
  end
end
