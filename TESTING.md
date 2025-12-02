# Unit testing with Jest (project guide)

This project uses Jest and React Testing Library for unit tests. The examples below show how to add and run a simple unit test for a pure function (`countryExtractor`) and how to run tests locally.

Prerequisites
- Node.js and npm installed
- Run `npm install` once if dependencies are missing

Quick steps (summary)
1. Add a test file under `src/` (name it `*.test.ts` for non-React tests or `*.test.tsx` for React component tests).
2. Run tests with `npm test` or run a single test file with `npx jest <path>`.

Example: unit test for `countryExtractor`
- File: `src/countryExtractor.test.ts`

Test file content (copy-paste):
```
import { countryExtractor } from "./language_spoken";

describe("countryExtractor", () => {
  it("returns country names array from objects", () => {
    const input = [
      { name: "Argentina", capital: "Buenos Aires" },
      { name: "Belize", capital: "Belmopan" },
      { name: "Bolivia", capital: "Sucre" }
    ];

    const actual = countryExtractor(input);
    expect(actual).toEqual(["Argentina", "Belize", "Bolivia"]);
    expect(actual).toContain("Belize");
    expect(actual.length).toBe(3);
  });
});
```

Commands
- Run the full test suite from the project directory (`ReactFinalTesting-main`):
```powershell
npm test
```
- Run a single test file (fast):
```powershell
npx jest src/countryExtractor.test.ts
```
- Run a single test by name:
```powershell
npx jest -t "returns country names array from objects"
```

Sample output (example run)
```
> testingreactcomponentfinal@0.0.0 test
> jest

ts-jest[config] (WARN) message TS151001: If you have issues related to imports, you should consider setting `esModuleInterop` to `true` in your TypeScript configuration file (usually `tsconfig.json`). See https://blogs.msdn.microsoft.com/typescript/2018/01/31/announcing-typescript-2-7/#easier-ecmascript-module-interoperability for more information.
PASS  src/language_spoken.test.tsx
PASS  src/language_spoken_rtl.test.tsx
PASS  src/countryExtractor.test.ts

Test Suites: 3 passed, 3 total
Tests:       4 passed, 4 total
Snapshots:   0 total
Time:        7.999 s
Ran all test suites.
```

Notes & tips
- TypeScript imports: this project uses `jsx: "react-jsx"` and does not enable `esModuleInterop`. For React component tests you do not need to `import React from "react"` (the new JSX runtime handles it). If you must import React in TypeScript tests, use `import * as React from "react";` to avoid compile errors.
- For nicer DOM matchers (e.g. `toBeInTheDocument()`), install `@testing-library/jest-dom` as a dev dependency and import it in a setup file or at the top of tests:
  ```powershell
  npm install -D @testing-library/jest-dom
  ```
  Then add to `jest.config.js`: `setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts']` and create `src/setupTests.ts` containing `import '@testing-library/jest-dom';`.
- Mocking network calls: use `jest.mock('./utils/http-request')` and return controlled data to test `countryListLookup`.

If you want, I can also:
- Convert the rest of your tests to React Testing Library style
- Add `src/setupTests.ts` and update `jest.config.js` to include `jest-dom`
- Show an example of mocking `http-request` for `countryListLookup`
