import {
  countryExtractor,
  countryListLookup
} from "./language_spoken";

describe("Language Spoken Tests", () => {
  it("converts array of country data objects to array of countries", () => {
    const inputObject = [
      { name: "Argentina", capital: "Buenos Aires" },
      { name: "Belize", capital: "Belmopan" },
      { name: "Bolivia", capital: "Sucre" }
    ];

    const actualValue = countryExtractor(inputObject);

    expect(actualValue[0]).toBe("Argentina");
    expect(actualValue).toContain("Belize");
    expect(actualValue[2] === "Bolivia").toBe(true);
    expect(actualValue[3]).not.toBeDefined();
  });

  it("fetches a list of countries where a language is spoken", async () => {
  });
});