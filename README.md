# Flow

## Prerequeisites

- elixir/erlang
- node
- podman/docker

## Usage

Start the development database with `podman compose up -d`. Then run `mix setup` to download deps and initialize the database.

Start the server with `mix phx.server` which can be reached at [http://localhost:4000](http://localhost:4000)

A default user is created with the credentials:

- Email: `user@example.com`
- Password: `password1234`
