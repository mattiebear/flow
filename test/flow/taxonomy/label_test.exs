defmodule Flow.Taxonomy.LabelTest do
  use Flow.DataCase

  alias Flow.Taxonomy.Label

  import Flow.AccountsFixtures

  setup do
    user = user_fixture()
    {:ok, user: user}
  end

  test "changeset/2 with single string tag" do
    attrs = %{tag: "foo"}
    changeset = Label.changeset(%Label{}, attrs)

    assert changeset.valid? == true
  end

  test "changeset/2 with split string tag" do
    attrs = %{tag: "foo/bar"}
    changeset = Label.changeset(%Label{}, attrs)

    assert changeset.valid? == true
  end

  test "changeset/2 with more than 1 slash" do
    attrs = %{tag: "foo/bar/baz"}
    changeset = Label.changeset(%Label{}, attrs)

    assert changeset.valid? == false
  end

  test "changeset/2 with invalid characters" do
    attrs = %{tag: "&nice"}
    changeset = Label.changeset(%Label{}, attrs)

    assert changeset.valid? == false
  end

  test "changeset/2 with numbers" do
    attrs = %{tag: "foo/1"}
    changeset = Label.changeset(%Label{}, attrs)

    assert changeset.valid? == false
  end

  test "changeset/2 with sequential slashes" do
    attrs = %{tag: "foo//1"}
    changeset = Label.changeset(%Label{}, attrs)

    assert changeset.valid? == false
  end
end
