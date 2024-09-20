defmodule FlowWeb.Skills.PositionLiveTest do
  use FlowWeb.ConnCase, async: true

  import Phoenix.LiveViewTest
  import Flow.SkillsFixtures

  setup :register_and_log_in_user

  @valid_attrs %{name: "Half Guard", description: "Be in half guard"}
  @invalid_attrs %{name: ""}

  describe "Index" do
    test "lists all positions", %{conn: conn, user: user} do
      position = position_fixture(%{user: user, name: "Spider Guard"})

      {:ok, _view, html} = live(conn, ~p"/positions")

      assert html =~ position.name
    end

    test "creates a new position", %{conn: conn} do
      {:ok, view, _html} = live(conn, ~p"/positions")

      assert view
             |> element("a", "Add position")
             |> render_click() =~ "Update a position in your library"

      assert_patch(view, ~p"/positions/new")

      assert view
             |> form("#position-form", %{position: @invalid_attrs})
             |> render_submit() =~ "can&#39;t be blank"

      assert view
             |> form("#position-form", %{position: @valid_attrs})
             |> render_submit()

      html = render(view)

      assert html =~ "Added &quot;#{@valid_attrs.name}&quot;"
    end

    test "updates a position", %{conn: conn, user: user} do
      position = position_fixture(%{user: user, name: "Full Mount"})

      {:ok, view, _html} = live(conn, ~p"/positions")

      assert view
             |> element("a", position.name)
             |> render_click()

      assert view
             |> element("a", "Edit")
             |> render_click() =~ "Update a position in your library"

      assert_patch(view, ~p"/positions/#{position}/edit")

      assert view
             |> form("#position-form", %{position: @valid_attrs})
             |> render_submit()

      html = render(view)

      assert html =~ "Updated &quot;#{@valid_attrs.name}&quot;"
    end
  end
end
