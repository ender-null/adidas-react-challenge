import { fireEvent, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { EndGameDialog } from "../../components/end-game-dialog";

describe("end-game-dialog", () => {
  const testOnSetName = jest.fn();
  const testOnAddEntry = jest.fn();
  const testOnCancel = jest.fn();

  beforeEach(() => {
    testOnSetName.mockClear();
    testOnAddEntry.mockClear();
    testOnCancel.mockClear();
  });

  test("should render the component", () => {
    const { asFragment } = render(<EndGameDialog onSetName={testOnSetName} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render the component with step", () => {
    const { asFragment } = render(
      <EndGameDialog onSetName={testOnSetName} step={24} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("should run call onSetName when input change", () => {
    const { getByRole } = render(
      <EndGameDialog previousName="" onSetName={testOnSetName} step={24} />
    );
    const input = getByRole("textbox");
    userEvent.type(input, "Name");
    expect(input).toHaveValue("Name");
    expect(testOnSetName).toBeCalled();
  });

  test("should run call onCancel when clicked", () => {
    const { getByText } = render(
      <EndGameDialog onSetName={testOnSetName} onCancel={testOnCancel} />
    );
    fireEvent.click(getByText("X"));
    expect(testOnCancel).toBeCalled();
  });

  test("should run call onAddEntry when clicked", () => {
    const { getByRole, getByText } = render(
      <EndGameDialog
        previousName=""
        onSetName={testOnSetName}
        step={24}
        onAddEntry={testOnAddEntry}
      />
    );
    userEvent.type(getByRole("textbox"), "Name");
    fireEvent.submit(getByText("Accept"));
    expect(testOnAddEntry).toBeCalled();
  });
});
