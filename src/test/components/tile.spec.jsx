import { fireEvent, render } from "@testing-library/react";
import { Tile } from "../../components/tile";

describe("Tile", () => {
  const testStyle = {
    background: "hsl(128, 60%, 50%)",
    width: "34px",
    height: "34px",
  };

  const testOnClick = jest.fn();

  beforeEach(() => {
    testOnClick.mockClear();
  });

  test("should render the component", () => {
    const { asFragment } = render(<Tile />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render the component styled", () => {
    const { asFragment } = render(<Tile style={testStyle} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("should run call onClick when clicked", () => {
    const { container } = render(<Tile onClick={testOnClick} />);
    fireEvent.click(container.firstChild);
    expect(testOnClick).toBeCalled();
  });
});
