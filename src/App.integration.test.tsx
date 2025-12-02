import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";

jest.mock("./language_spoken", () => ({
  capitalize: jest.fn((str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()),
  getAlpha2Code: jest.fn((lang: string) => {
    if (lang === "Spanish") return "es";
    if (lang === "English") return "en";
    return undefined;
  }),
  countryListLookup: jest.fn(),
  getResponse: jest.fn((language: string, countries: string[]) => 
    `${language.charAt(0).toUpperCase() + language.slice(1).toLowerCase()} is spoken in ${countries?.length || 0} countries around the world`
  ),
}));

describe("App Integration Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("test 1: app renders with search button", () => {
    render(<App />);
    const button = screen.getByRole("button", { name: /search/i });
    expect(button).toBeTruthy();
  });

  it("test 2: user can type in input field", () => {
    render(<App />);
    const input = screen.getByPlaceholderText("Enter a language...");
    fireEvent.change(input, { target: { value: "spanish" } });
    expect((input as HTMLInputElement).value).toBe("spanish");
  });

  it("test 3: error message shows when language not found", async () => {
    const { getAlpha2Code } = require("./language_spoken");
    getAlpha2Code.mockReturnValue(undefined);

    render(<App />);
    const input = screen.getByPlaceholderText("Enter a language...");
    const button = screen.getByRole("button", { name: /search/i });

    fireEvent.change(input, { target: { value: "klingon" } });
    fireEvent.click(button);

    await waitFor(() => {
      const errorText = screen.queryByText(/we could not find/i);
      expect(errorText).toBeTruthy();
    });
  });
});
