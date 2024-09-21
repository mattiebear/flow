defmodule FlowWeb.Skills.TrainingSessionLiveTest do
  use FlowWeb.ConnCase, async: true

  import Phoenix.LiveViewTest
  import Flow.SkillsFixtures
  import Flow.TrainingFixtures

  setup :register_and_log_in_user

  @valid_attrs %{}

  describe "Index" do
    test "creates a new position", %{conn: conn, user: user} do
      position = position_fixture(%{user: user})

      {:ok, view, _html} = live(conn, ~p"/training")

      assert view
             |> element("a", "Add training session")
             |> render_click() =~ "Log a training session"

      assert_patch(view, ~p"/training/new")

      assert view
        |> form("#training-session-form", %{training_session: @valid_attrs})
        |> render_submit()

      html = render(view)

      assert html =~ "Logged training session"
    end
  end
end
