defmodule FlowWeb.Skills.TechniqueLiveTest do
  use FlowWeb.ConnCase, async: true

  import Phoenix.LiveViewTest
  import Flow.SkillsFixtures

  setup :register_and_log_in_user

  @valid_attrs %{name: "Butterfly Sweep"}
  @invalid_attrs %{name: ""}

  describe "Index" do
    test "lists all techniques", %{conn: conn, user: user} do
      technique = technique_fixture(%{user: user, name: "Omaplata"})

      {:ok, _view, html} = live(conn, ~p"/techniques")

      assert html =~ technique.name
    end

    test "creates a new technique", %{conn: conn} do
      {:ok, view, _html} = live(conn, ~p"/techniques")

      assert view
             |> element("a", "Add technique")
             |> render_click() =~ "Update a technique in your library"

      assert_patch(view, ~p"/techniques/new")

      assert view
             |> form("#technique-form", %{technique: @invalid_attrs})
             |> render_submit() =~ "can&#39;t be blank"

      assert view
             |> form("#technique-form", %{technique: @valid_attrs})
             |> render_submit()

      html = render(view)

      assert html =~ "Added &quot;#{@valid_attrs.name}&quot;"
    end

    test "updates a technique", %{conn: conn, user: user} do
      technique = technique_fixture(%{user: user, name: "Mata el Leon"})

      {:ok, view, _html} = live(conn, ~p"/techniques")

      assert view
             |> element("a", technique.name)
             |> render_click()

      assert view
             |> element("a", "Edit")
             |> render_click() =~ "Update a technique in your library"

      assert_patch(view, ~p"/techniques/#{technique}/edit")

      assert view
             |> form("#technique-form", %{technique: @valid_attrs})
             |> render_submit()

      html = render(view)

      assert html =~ "Updated &quot;#{@valid_attrs.name}&quot;"
    end
  end
end
