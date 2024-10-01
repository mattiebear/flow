defmodule FlowWeb.Util.Avatar do
  @base_url "https://secure.gravatar.com/avatar/"
  @opts %{d: "mp"}

  def url(email) do
    "#{@base_url}#{email_hash(email)}?#{URI.encode_query(@opts)}"
  end

  def email_hash(email) do
    email = String.downcase(email)
    :crypto.hash(:md5, email) |> Base.encode16(case: :lower)
  end
end
