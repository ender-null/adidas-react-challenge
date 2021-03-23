import { render } from "@testing-library/react";
import { Game } from "../../components/game";

describe("Game", () => {
  beforeEach(() => {
    jest.spyOn(global.Math, "random").mockReturnValue(0.2);
  });

  afterEach(() => {
    jest.spyOn(global.Math, "random").mockRestore();
  });

  test("should render the component", () => {
    const { asFragment } = render(<Game />);
    expect(asFragment()).toMatchSnapshot();
  });
});
