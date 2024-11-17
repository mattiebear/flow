# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#

alias Flow.Accounts.User
alias Flow.Repo

{:ok, _user} =
  %User{}
  |> User.registration_changeset(%{
    email: "user@example.com",
    password: "password1234"
  })
  |> Repo.insert()
