defmodule FlowWeb.Navigation do
  def fetch_current_path(conn, _opts) do
    Plug.Conn.assign(conn, :current_path, conn.request_path)
  end

  def on_mount(:mount_current_path, _params, _session, socket) do
    {:cont,
     Phoenix.LiveView.attach_hook(
       socket,
       :save_current_path,
       :handle_params,
       &save_current_path/3
     )}
  end

  defp save_current_path(_params, url, socket) do
    {:cont, Phoenix.Component.assign(socket, :current_path, URI.parse(url).path)}
  end
end
