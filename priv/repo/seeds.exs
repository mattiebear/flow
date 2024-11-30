# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#

alias Flow.Accounts

Accounts.register_user(%{
  email: "user@example.com",
  password: "password1234"
})
