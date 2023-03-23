type Chars = {
  upperCase: string;
  lowerCase: string;
  number: string;
  symbol: string;
};

type FunctionsMap = Map<number, (chars: Chars) => string>;

type FormMapObj = keyof Chars | "charLength";

type State = {
  isUpperCaseSelected: boolean;
  isLowerCaseSelected: boolean;
  isNumberSelected: boolean;
  isSymbolSelected: boolean;
  charLength: number;
  noneInputsSelected: boolean;
  isCopyClicked: boolean;
  passwordStrength: number;
  generatedPassword: string;
};

type StateActions = {
  setIsUpperCaseSelected: "setIsUpperCaseSelected";
  setIsLowerCaseSelected: "setIsLowerCaseSelected";
  setIsNumberSelected: "setIsNumberSelected";
  setIsSymbolSelected: "setIsSymbolSelected";
  setCharLength: "setCharLength";
  setNoneInputsSelected: "setNoneInputsSelected";
  setIsCopyClicked: "setIsCopyClicked";
  setPasswordStrength: "setPasswordStrength";
  setGeneratedPassword: "setGeneratedPassword";
};

type StateDispatch = {
  type: StateActions[keyof StateActions];
  payload: boolean | number | string;
};

export { Chars, FunctionsMap, FormMapObj, State, StateActions, StateDispatch };
