import type {
  Chars,
  FunctionsMap,
  StateActions,
  StateDispatch,
} from "../../types";
import random from "random";

/**
 * @description Map of [number, (chars: Chars) => string] pairs used to return a function based on a randomly generated key
 */
const functionsMap: FunctionsMap = new Map([
  [
    0,
    function returnRandUppercaseChar(chars: Chars): string {
      const length = chars.upperCase.length;
      return chars.upperCase[random.int(0, length - 1)] ?? "";
    },
  ],
  [
    1,
    function returnRandLowercaseChar(chars: Chars): string {
      const length = chars.lowerCase.length;
      return chars.lowerCase[random.int(0, length - 1)] ?? "";
    },
  ],
  [
    2,
    function returnRandNumberChar(chars: Chars): string {
      const length = chars.number.length;
      return chars.number[random.int(0, length - 1)] ?? "";
    },
  ],
  [
    3,
    function returnRandSymbolChar(chars: Chars): string {
      const length = chars.symbol.length;
      return chars.symbol[random.int(0, length - 1)] ?? "";
    },
  ],
]);

export type ReturnRandomStringProps = {
  charLength: number;
  upperCase: boolean;
  lowerCase: boolean;
  number: boolean;
  symbol: boolean;
  functionsMap: FunctionsMap;
};

/**
 * @description Returns a random string based on the selected options by calling a function from the functionsMap map based on a randomly generated key between 0 and 3 (inclusive). The length of the string is determined by the charLength prop
 *
 * @function
 * @param {ReturnRandomStringProps} props
 * @param {number} props.charLength - The length of the string to be returned
 * @param {boolean} props.upperCase - Whether or not to include uppercase characters in the string
 * @param {boolean} props.lowerCase - Whether or not to include lowercase characters in the string
 * @param {boolean} props.number - Whether or not to include numbers in the string
 * @param {boolean} props.symbol - Whether or not to include symbols in the string
 * @param {FunctionsMap} props.functionsMap - The map of functions to be called based on a randomly generated key
 * @returns {string} - The randomly generated string
 *
 */
function returnRandomString({
  charLength = 8,
  upperCase = false,
  lowerCase = false,
  number = false,
  symbol = false,
  functionsMap,
}: ReturnRandomStringProps): string {
  const chars: Chars = {
    upperCase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowerCase: "abcdefghijklmnopqrstuvwxyz",
    number: "0123456789",
    symbol: "#$%^&*()_+~\\`|}{[]:;?><,./-=",
  };

  let result = "";

  // uppercase only selected
  if (!lowerCase && !number && !symbol && upperCase) {
    Array.from({ length: charLength }).forEach((_) => {
      const returnRandUppercaseChar = functionsMap.get(0);
      if (returnRandUppercaseChar !== undefined) {
        result += returnRandUppercaseChar(chars);
      }
    });
  }

  // lowercase only selected
  if (!upperCase && !number && !symbol && lowerCase) {
    Array.from({ length: charLength }).forEach((_) => {
      const returnRandLowercaseChar = functionsMap.get(1);
      if (returnRandLowercaseChar !== undefined) {
        result += returnRandLowercaseChar(chars);
      }
    });
  }

  // numbers only selected
  if (!upperCase && !lowerCase && !symbol && number) {
    Array.from({ length: charLength }).forEach((_) => {
      const returnRandNumberChar = functionsMap.get(2);
      if (returnRandNumberChar !== undefined) {
        result += returnRandNumberChar(chars);
      }
    });
  }

  // symbols only selected
  if (!upperCase && !lowerCase && !number && symbol) {
    Array.from({ length: charLength }).forEach((_) => {
      const returnRandSymbolChar = functionsMap.get(3);
      if (returnRandSymbolChar !== undefined) {
        result += returnRandSymbolChar(chars);
      }
    });
  }

  // for the rest of the cases, a function is randomly selected
  // a random number is chosen with both inclusive lowerbound and upperbound
  // or a random number is chosen from an array for
  // and is used as the key to get the function from the map
  // the function is called by passing in the chars object as many times as the charLength

  // uppercase, lowercase, numbers and symbols
  if (upperCase && lowerCase && number && symbol) {
    Array.from({ length: charLength }).forEach((_) => {
      const randInt = random.int(0, 3);
      const randFunc = functionsMap.get(randInt);

      if (randFunc !== undefined) result += randFunc(chars);
    });
  }

  // uppercase, lowercase and numbers only
  if (!symbol && upperCase && lowerCase && number) {
    Array.from({ length: charLength }).forEach((_) => {
      const randInt = random.int(0, 2);
      const randFunc = functionsMap.get(randInt);

      if (randFunc !== undefined) result += randFunc(chars);
    });
  }

  // uppercase, lowercase and symbols only
  if (!number && upperCase && lowerCase && symbol) {
    Array.from({ length: charLength }).forEach((_) => {
      const randInt = random.choice([0, 1, 3]) ?? 0;
      const randFunc = functionsMap.get(randInt);

      if (randFunc !== undefined) result += randFunc(chars);
    });
  }

  // uppercase, numbers and symbols only
  if (!lowerCase && upperCase && number && symbol) {
    Array.from({ length: charLength }).forEach((_) => {
      const randInt = random.choice([0, 2, 3]) ?? 0;
      const randFunc = functionsMap.get(randInt);

      if (randFunc !== undefined) result += randFunc(chars);
    });
  }

  // lowercase, numbers and symbols only
  if (!upperCase && lowerCase && number && symbol) {
    Array.from({ length: charLength }).forEach((_) => {
      const randInt = random.choice([1, 2, 3]) ?? 0;
      const randFunc = functionsMap.get(randInt);

      if (randFunc !== undefined) result += randFunc(chars);
    });
  }

  // uppercase and lowercase only
  if (!number && !symbol && upperCase && lowerCase) {
    Array.from({ length: charLength }).forEach((_) => {
      const randInt = random.choice([0, 1]) ?? 0;
      const randFunc = functionsMap.get(randInt);

      if (randFunc !== undefined) result += randFunc(chars);
    });
  }

  // uppercase and numbers only
  if (!lowerCase && !symbol && upperCase && number) {
    Array.from({ length: charLength }).forEach((_) => {
      const randInt = random.choice([0, 2]) ?? 0;
      const randFunc = functionsMap.get(randInt);

      if (randFunc !== undefined) result += randFunc(chars);
    });
  }

  // uppercase and symbols only
  if (!lowerCase && !number && upperCase && symbol) {
    Array.from({ length: charLength }).forEach((_) => {
      const randInt = random.choice([0, 3]) ?? 0;
      const randFunc = functionsMap.get(randInt);

      if (randFunc !== undefined) result += randFunc(chars);
    });
  }

  // lowercase and numbers only
  if (!upperCase && !symbol && lowerCase && number) {
    Array.from({ length: charLength }).forEach((_) => {
      const randInt = random.choice([1, 2]) ?? 0;
      const randFunc = functionsMap.get(randInt);

      if (randFunc !== undefined) result += randFunc(chars);
    });
  }

  // lowercase and symbols only
  if (!upperCase && !number && lowerCase && symbol) {
    Array.from({ length: charLength }).forEach((_) => {
      const randInt = random.choice([1, 3]) ?? 0;
      const randFunc = functionsMap.get(randInt);

      if (randFunc !== undefined) result += randFunc(chars);
    });
  }

  // numbers and symbols only
  if (!upperCase && !lowerCase && number && symbol) {
    Array.from({ length: charLength }).forEach((_) => {
      const randInt = random.choice([2, 3]) ?? 0;
      const randFunc = functionsMap.get(randInt);

      if (randFunc !== undefined) result += randFunc(chars);
    });
  }

  return result;
}

type SetPasswordStrengthStateProps = {
  isUpperCaseSelected: boolean;
  isLowerCaseSelected: boolean;
  isNumberSelected: boolean;
  isSymbolSelected: boolean;
  stateDispatch: React.Dispatch<StateDispatch>;
  stateActions: StateActions;
};

function setPasswordStrengthState({
  isUpperCaseSelected,
  isLowerCaseSelected,
  isNumberSelected,
  isSymbolSelected,
  stateDispatch,
  stateActions,
}: SetPasswordStrengthStateProps): void {
  const { setPasswordStrength, setNoneInputsSelected } = stateActions;

  // find out how many params are selected
  const amountOfParamsSelected = [
    isUpperCaseSelected,
    isLowerCaseSelected,
    isNumberSelected,
    isSymbolSelected,
  ].filter((param) => param).length;

  // set password strength based on how many params are selected
  switch (amountOfParamsSelected) {
    case 0: {
      stateDispatch({
        type: setNoneInputsSelected,
        payload: true,
      });
      stateDispatch({
        type: setPasswordStrength,
        payload: 0,
      });
      break;
    }
    case 1: {
      stateDispatch({
        type: setNoneInputsSelected,
        payload: false,
      });
      stateDispatch({
        type: setPasswordStrength,
        payload: 25,
      });
      break;
    }
    case 2: {
      stateDispatch({
        type: setNoneInputsSelected,
        payload: false,
      });
      stateDispatch({
        type: setPasswordStrength,
        payload: 50,
      });
      break;
    }
    case 3: {
      stateDispatch({
        type: setNoneInputsSelected,
        payload: false,
      });
      stateDispatch({
        type: setPasswordStrength,
        payload: 75,
      });
      break;
    }
    case 4: {
      stateDispatch({
        type: setNoneInputsSelected,
        payload: false,
      });
      stateDispatch({
        type: setPasswordStrength,
        payload: 100,
      });
      break;
    }
    default: {
      stateDispatch({
        type: setNoneInputsSelected,
        payload: true,
      });
      break;
    }
  }
}

export { functionsMap, returnRandomString, setPasswordStrengthState };
