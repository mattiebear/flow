defmodule Flow.SkillsTest do
  use Flow.DataCase

  import Flow.AccountsFixtures
  import Flow.SkillsFixtures

  alias Flow.Skills

  def ids(records) do
    Enum.map(records, & &1.id)
  end

  describe "techniques" do
    test "list_user_techniques/1 returns all techniques for a user" do
      user = user_fixture()
      technique = technique_fixture(%{user: user})
      technique_fixture()

      assert Skills.list_user_techniques(user) |> ids() == [technique.id]
    end
  end
end
