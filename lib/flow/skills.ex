defmodule Flow.Skills do
  import Ecto.Query

  alias Flow.Repo
  alias Flow.Accounts.User
  alias Flow.Skills.Step
  alias Flow.Skills.Technique

  @doc """
  Returns the count of techniques for a given user.

  ## Examples

      iex> get_technique_count(%User{})
      10

  """
  def get_technique_count(%User{} = user) do
    Repo.one(from p in Technique, where: p.user_id == ^user.id, select: count(p.id))
  end

  @doc """
  Creates a technique for a given user.

  ## Examples

      iex> create_technique(%User{}, %{name: "My Technique"})
      {:ok, %Technique{}}

  """
  def create_technique(%User{} = user, attrs) do
    %Technique{}
    |> Technique.changeset(attrs)
    |> Ecto.Changeset.put_assoc(:user, user)
    |> Repo.insert()
  end

  def update_technique(%Technique{} = technique, attrs) do
    technique
    |> Technique.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Lists all techniques for a given user.

  ## Examples

      iex> list_techniques(%User{})
      [%Technique{}, %Technique{}]

  """
  def list_techniques(%User{} = user) do
    Repo.all(
      from t in Technique,
        select: %{id: t.id, name: t.name},
        where: t.user_id == ^user.id,
        order_by: [asc: t.name]
    )
  end

  def search_techniques(%User{} = user, query) do
    Repo.all(
      from t in Technique,
        select: %{id: t.id, name: t.name},
        where: t.user_id == ^user.id and fragment("? ILIKE ?", t.name, ^"%#{query}%"),
        order_by: [asc: t.name]
    )
  end

  def get_technique(%User{} = user, id) do
    Repo.get_by!(Technique, id: id, user_id: user.id)
    |> Repo.preload(steps: [:details])
  end

  def delete_technique(%Technique{} = technique) do
    Repo.delete(technique)
  end

  def build_technique_draft do
    layout_id = Flow.Util.Crypto.random_id()

    %Technique{
      layout: [%{layout_id: layout_id}],
      steps: [
        %Step{layout_id: layout_id, details: []}
      ]
    }
  end
end
