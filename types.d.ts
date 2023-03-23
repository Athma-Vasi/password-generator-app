export type Chars = {
  upperCase: string;
  lowerCase: string;
  number: string;
  symbol: string;
};

export type FunctionsMap = Map<number, (chars: Chars) => string>;

export type FormMapObj = keyof Chars | "charLength";

export type ReturnRandomStringProps = {
  charLength: number;
  upperCase: boolean;
  lowerCase: boolean;
  number: boolean;
  symbol: boolean;
  functionsMap: FunctionsMap;
};
