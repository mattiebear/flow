defmodule FlowWeb.Router do
  use FlowWeb, :router

  import FlowWeb.Navigation
  import FlowWeb.UserAuth

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_live_flash
    plug :put_root_layout, html: {FlowWeb.Layouts, :root}
    plug :protect_from_forgery
    plug :put_secure_browser_headers
    plug :fetch_current_user
    plug :fetch_current_path
    plug Inertia.Plug
  end

  pipeline :api do
    plug :accepts, ["json"]
    plug :fetch_session
    plug :fetch_current_user
    plug :require_authenticated_api_user
  end

  scope "/", FlowWeb do
    pipe_through [:browser, :redirect_if_user_is_authenticated]

    # TODO: Update this
    get "/", PageController, :home
  end

  scope "/api", FlowWeb do
    pipe_through :api

    resources "/labels", API.LabelController, only: [:create, :index]
  end

  # Enable LiveDashboard and Swoosh mailbox preview in development
  if Application.compile_env(:flow, :dev_routes) do
    # If you want to use the LiveDashboard in production, you should put
    # it behind authentication and allow only admins to access it.
    # If your application does not have an admins-only section yet,
    # you can use Plug.BasicAuth to set up some basic authentication
    # as long as you are also using SSL (which you should anyway).
    import Phoenix.LiveDashboard.Router

    scope "/dev" do
      pipe_through :browser

      live_dashboard "/dashboard", metrics: FlowWeb.Telemetry
      forward "/mailbox", Plug.Swoosh.MailboxPreview
    end
  end

  # Unauthenticated routes
  scope "/", FlowWeb do
    pipe_through [:browser, :redirect_if_user_is_authenticated]

    post "/users/log_in", UserSessionController, :create

    live_session :redirect_if_user_is_authenticated,
      layout: {FlowWeb.Layouts, :auth},
      on_mount: [
        {FlowWeb.UserAuth, :redirect_if_user_is_authenticated},
        {FlowWeb.Navigation, :mount_current_path}
      ] do
      live "/users/register", Auth.UserRegistrationLive, :new
      live "/users/log_in", Auth.UserLoginLive, :new
      live "/users/reset_password", Auth.UserForgotPasswordLive, :new
      live "/users/reset_password/:token", Auth.UserResetPasswordLive, :edit
    end
  end

  # Authenticated routes
  scope "/", FlowWeb do
    pipe_through [:browser, :require_authenticated_user]

    live_session :require_authenticated_user,
      on_mount: [
        {FlowWeb.UserAuth, :ensure_authenticated},
        {FlowWeb.Navigation, :mount_current_path}
      ] do
      live "/users/settings", Auth.UserSettingsLive, :edit
      live "/users/settings/confirm_email/:token", Auth.UserSettingsLive, :confirm_email

      live "/training", Training.DashboardLive, :index

      live "/techniques", Skills.TechniqueLive, :index
      live "/techniques/new", Skills.TechniqueLive, :new
      live "/techniques/:id", Skills.TechniqueLive, :show
      live "/techniques/:id/edit", Skills.TechniqueLive, :edit
    end
  end

  # Open routes
  scope "/", FlowWeb do
    pipe_through [:browser]

    delete "/users/log_out", UserSessionController, :delete

    live_session :current_user,
      layout: {FlowWeb.Layouts, :auth},
      on_mount: [
        {FlowWeb.UserAuth, :mount_current_user},
        {FlowWeb.Navigation, :mount_current_path}
      ] do
      live "/users/confirm/:token", Auth.UserConfirmationLive, :edit
      live "/users/confirm", Auth.UserConfirmationInstructionsLive, :new
    end
  end
end
