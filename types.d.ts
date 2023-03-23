export type Chars = {
  upperCase: string;
  lowerCase: string;
  number: string;
  symbol: string;
};

export type FunctionsMap = Map<number, (chars: Chars) => string>;

export type FormMapObj = keyof Chars | "charLength";

export type State = {
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

export type StateActions = {
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

export type StateDispatch = {
  type: StateActions[keyof StateActions];
  payload: boolean | number | string;
};
