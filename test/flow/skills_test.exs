defmodule Flow.SkillsTest do
  use Flow.DataCase

  alias Ecto.Changeset
  alias Flow.Skills
  alias Flow.Skills.Technique

  import Flow.AccountsFixtures
  import Flow.SkillsFixtures

  @valid_techinque_attrs %{
    name: "My Technique"
  }

  describe "get_technique_count/1" do
    test "returns the count of techniques for a given user" do
      user = user_fixture()
      assert Skills.get_technique_count(user) == 0

      techinque_fixture(user: user)
      assert Skills.get_technique_count(user) == 1
    end
  end

  describe "create_technique/2" do
    test "creates a technique for a given user" do
      user = user_fixture()

      {:ok, %Technique{} = technique} = Skills.create_technique(user, @valid_techinque_attrs)

      assert technique.name == "My Technique"
      assert technique.user_id == user.id
    end

    test "returns an error when the technique is invalid" do
      user = user_fixture()

      {:error, %Changeset{} = changeset} = Skills.create_technique(user, %{})

      assert changeset.valid? == false
      assert changeset.errors[:name] == {"can't be blank", [validation: :required]}
    end
  end
end
