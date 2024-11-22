defmodule Flow.Util.Crypto do
  def random_id() do
    :crypto.strong_rand_bytes(16)
    |> Base.encode16(case: :lower)
  end
end
