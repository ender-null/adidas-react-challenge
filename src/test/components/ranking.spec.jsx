import { fireEvent, render } from "@testing-library/react";
import { Ranking } from "../../components/ranking";

describe("Ranking", () => {
  const testOnNewGame = jest.fn();
  const testRanking = {
    Name: 24,
    SecondName: 16,
  };

  beforeEach(() => {
    testOnNewGame.mockClear();
  });

  test("should render the component", () => {
    const { asFragment } = render(
      <Ranking onNewGame={testOnNewGame} ranking={testRanking} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("should run call onNewGame when clicked", () => {
    testOnNewGame.mockImplementation((event) => {
      event.preventDefault();
    });
    const { getByText } = render(
      <Ranking onNewGame={testOnNewGame} ranking={testRanking} />
    );
    fireEvent.click(getByText("New game"));
    expect(testOnNewGame).toBeCalled();
  });
});
