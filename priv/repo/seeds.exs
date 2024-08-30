# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#

alias Flow.Skills
alias Flow.Accounts.User
alias Flow.Repo

{:ok, user} =
  %User{}
  |> User.registration_changeset(%{
    email: "user@example.com",
    password: "password1234"
  })
  |> Repo.insert()

{:ok, position} = Skills.create_user_position(user, %{name: "Half Guard"})

{:ok, _technique} =
  Skills.create_user_technique(user, %{
    name: "Butterfly Sweep",
    steps: [
      %{order: 0, description: "Start in butterfly guard"},
      %{
        order: 1,
        description: "Sweep your opponent",
        details: [%{order: 0, description: "Do it well"}]
      }
    ]
  })
