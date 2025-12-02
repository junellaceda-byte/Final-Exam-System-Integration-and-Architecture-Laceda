import languageCodes from "./utils/languageCodes"
import httpRequest from "./utils/http-request"
import "regenerator-runtime/runtime";

const { languageInEnglish, alpha2Codes } = languageCodes;

 const capitalize = (language: string) => {
  return language.charAt(0).toUpperCase() + language.toLowerCase().slice(1)
}

 const getAlpha2Code = (language: string) => {
  const codeIndex = languageInEnglish.indexOf(language);
  const alpha2Code = codeIndex !== -1 ? alpha2Codes[codeIndex] : undefined;
  return alpha2Code;
}

 const countryExtractor = (countriesArray: { name: any; }[]) => {
  const names: string[] = []
  for (const country of countriesArray) {
      names.push(country.name)
  }
  return names
}

 const countryListLookup = async (alpha2Code: string | number) => {
  try {
      const res = await httpRequest(alpha2Code)
      return countryExtractor(res.data)
  } catch (error) {  
    return undefined;  
  } 
}

 const getResponse = (language: string, listOfPlaces: string | any[] | undefined) => {
  return `${capitalize(language)} is spoken in ${listOfPlaces?.length || 0} countries around the world`
}

export{
  capitalize,
  getAlpha2Code,
  countryExtractor,
  countryListLookup,
  getResponse
};