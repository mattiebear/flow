defmodule Flow.Skills do
  import Ecto.Query

  alias Flow.Repo
  alias Flow.Accounts.User
  alias Flow.Skills.Technique

  def technique_count(%User{} = user) do
    Repo.one(from p in Technique, where: p.user_id == ^user.id, select: count(p.id))
  end
end
