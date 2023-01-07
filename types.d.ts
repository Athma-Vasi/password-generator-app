export type Chars = {
  upperCase: string;
  lowerCase: string;
  number: string;
  symbol: string;
};

export type GetKeyMap = Map<number, (chars: Chars) => string>;

export type FormMapObj = keyof Chars | "charLength";
