import { fireEvent, render } from "@testing-library/react";
import { Board } from "../../components/board";

describe("Board", () => {
  const testOnSuccess = jest.fn();
  const testOnFail = jest.fn();

  beforeEach(() => {
    testOnSuccess.mockClear();
    testOnFail.mockClear();
    jest.spyOn(global.Math, "random").mockReturnValue(0.2);
  });

  afterEach(() => {
    jest.spyOn(global.Math, "random").mockRestore();
  });

  test("should render the component", () => {
    const { asFragment } = render(
      <Board step={4} onSuccess={testOnSuccess} onFail={testOnFail} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("should render the component with correct tile number", () => {
    const { container } = render(
      <Board step={4} onSuccess={testOnSuccess} onFail={testOnFail} />
    );
    expect(container.querySelector('[class="tiles"]').children.length).toBe(36);
  });

  test("should run call onSuccess when click the different tile", () => {
    const { container } = render(
      <Board step={4} onSuccess={testOnSuccess} onFail={testOnFail} />
    );
    fireEvent.click(container.querySelector('[class="tile different"]'));
    expect(testOnSuccess).toBeCalled();
  });

  test("should run call onFail when click on common tile", () => {
    const { container } = render(
      <Board step={4} onSuccess={testOnSuccess} onFail={testOnFail} />
    );
    fireEvent.click(container.querySelector('[class="tile"]'));
    expect(testOnFail).toBeCalled();
  });
});
