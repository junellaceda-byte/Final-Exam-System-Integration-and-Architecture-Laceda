import * as React from "react";
import { getResponse } from "./language_spoken";

type Props = {
  language: string;
  listOfPlaces?: string[];
};

const LanguageSpokenDisplay: React.FC<Props> = ({ language, listOfPlaces = [] }) => {
  return <div>{getResponse(language, listOfPlaces)}</div>;
};

export default LanguageSpokenDisplay;
