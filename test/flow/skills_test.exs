defmodule Flow.SkillsTest do
  use Flow.DataCase

  import Flow.AccountsFixtures
  import Flow.SkillsFixtures

  alias Flow.Skills
  alias Flow.Skills.Technique

  describe "techniques" do
    test "list_user_techniques/1 returns all techniques for a user" do
      user = user_fixture()
      technique = technique_fixture(%{user: user})
      technique_fixture()

      assert Skills.list_user_techniques(user) == [technique]
    end

    test "create_user_technique/2 creates a technique on the user" do
      user = user_fixture()
      {:ok, technique} = Skills.create_user_technique(user, %{name: "Full Guard"})

      user_id = user.id
      assert %{name: "Full Guard", user_id: ^user_id} = technique
    end

    test "get_technique/1 finds the requested technique" do
      technique = technique_fixture()

      assert Skills.get_technique(technique.id) == technique
    end

    test "get_technique_detail/1 finds the requested technique" do
      technique = technique_fixture()

      assert Skills.get_technique_detail(technique.id).id == technique.id
    end

    test "update_technique/2 updates the specified technique" do
      technique = technique_fixture(%{name: "Half Guard"})
      {:ok, record} = Skills.update_technique(technique, %{name: "Full Guard"})

      assert record.name == "Full Guard"
    end

    test "change_technique/2 creates a changset" do
      changeset = Skills.change_technique(%Technique{}, %{name: "Test"})

      assert %Ecto.Changeset{} = changeset
    end

    test "get_technique_steps/1 fetches the technique steps" do
      technique = technique_fixture()
      step_1 = step_fixture(%{technique: technique})
      step_2 = step_fixture(%{technique: technique})

      assert Skills.get_technique_steps(technique.id) == [step_1, step_2]
    end

    test "get_technique_details/1 fetches the technique details" do
      technique = technique_fixture()
      step_1 = step_fixture(%{technique: technique})
      step_2 = step_fixture(%{technique: technique})
      detail_1 = detail_fixture(%{step: step_1})
      detail_2 = detail_fixture(%{step: step_1})
      detail_3 = detail_fixture(%{step: step_2})

      assert Skills.get_technique_details(technique.id) == [detail_1, detail_2, detail_3]
    end
  end

  describe "positions" do
    test "list_user_positions/1 fetches all user positions" do
      user = user_fixture()
      position = position_fixture(%{user: user})
      position_fixture()

      assert Skills.list_user_positions(user) == [position]
    end

    test "get_position/1 fetches the specified position" do
      position = position_fixture()

      assert Skills.get_position(position.id) == position
    end

    test "create_user_position/2 creates a position for the user" do
      user = user_fixture()
      {:ok, position} = Skills.create_user_position(user, %{name: "Open Guard"})

      user_id = user.id

      assert %{name: "Open Guard", user_id: ^user_id} = position
    end

    test "update_position/2 updates the position" do
      position = position_fixture()

      {:ok, record} = Skills.update_position(position, %{name: "Full Guard"})

      assert record.name == "Full Guard"
    end

    test "change_position/2 creates a changeset" do
      position = position_fixture()
      changeset = Skills.change_position(position, %{name: "New Position"})

      assert %Ecto.Changeset{} = changeset
    end
  end
end
