defmodule FlowWeb.API.LabelJSON do
  def index(%{labels: labels}) do
    Enum.map(labels, &label_detail/1)
  end

  def show(%{label: label}) do
    label_detail(label)
  end

  def failure(%{errors: errors}) do
    %{errors: errors}
  end

  defp label_detail(label) do
    %{id: label.id, tag: label.tag}
  end
end
