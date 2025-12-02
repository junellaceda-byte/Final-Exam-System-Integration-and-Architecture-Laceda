import { render, screen } from "@testing-library/react";
import LanguageSpokenDisplay from "./LanguageSpokenDisplay";

describe("LanguageSpokenDisplay (RTL)", () => {
  it("renders the response string from getResponse", () => {
    render(<LanguageSpokenDisplay language={"spanish"} listOfPlaces={["Spain", "Mexico", "Argentina"]} />);

    const expectedText = "Spanish is spoken in 3 countries around the world";
    const el = screen.getByText(expectedText);
    expect(el).toBeTruthy();
  });
});
