import type { Chars, FormMapObj, GetKeyMap } from "../../types";
import random from "random";

const chars = {
  upperCase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowerCase: "abcdefghijklmnopqrstuvwxyz",
  number: "0123456789",
  symbol: "#$%^&*()_+~\\`|}{[]:;?><,./-=",
};

const getKeyMap: GetKeyMap = new Map([
  [
    0,
    function upperCase(chars: Chars) {
      const length = chars.upperCase.length;
      return chars.upperCase[random.int(0, length - 1)] ?? "";
    },
  ],
  [
    1,
    function lowerCase(chars: Chars) {
      const length = chars.lowerCase.length;
      return chars.lowerCase[random.int(0, length - 1)] ?? "";
    },
  ],
  [
    2,
    function number(chars: Chars) {
      const length = chars.number.length;
      return chars.number[random.int(0, length - 1)] ?? "";
    },
  ],
  [
    3,
    function symbol(chars: Chars) {
      const length = chars.symbol.length;
      return chars.symbol[random.int(0, length - 1)] ?? "";
    },
  ],
]);

function getRandKey(
  getKeyMap: GetKeyMap,
  chars: Chars,
  formMapObj: Map<FormMapObj, string>
) {
  //uppercase only selected
  if (
    formMapObj.get("lowerCase") === undefined &&
    formMapObj.get("number") === undefined &&
    formMapObj.get("symbol") === undefined &&
    formMapObj.get("upperCase")
  ) {
    const func = getKeyMap.get(0);

    if (func !== undefined) return func(chars);
  }

  //lowercase only selected
  if (
    formMapObj.get("upperCase") === undefined &&
    formMapObj.get("number") === undefined &&
    formMapObj.get("symbol") === undefined &&
    formMapObj.get("lowerCase")
  ) {
    const func = getKeyMap.get(1);

    if (func !== undefined) return func(chars);
  }

  //numbers only selected
  if (
    formMapObj.get("upperCase") === undefined &&
    formMapObj.get("lowerCase") === undefined &&
    formMapObj.get("symbol") === undefined &&
    formMapObj.get("number")
  ) {
    const func = getKeyMap.get(2);

    if (func !== undefined) return func(chars);
  }

  //symbols only selected
  if (
    formMapObj.get("upperCase") === undefined &&
    formMapObj.get("lowerCase") === undefined &&
    formMapObj.get("number") === undefined &&
    formMapObj.get("symbol")
  ) {
    const func = getKeyMap.get(3);

    if (func !== undefined) return func(chars);
  }

  //uppercase, lowercase and numbers only
  if (
    formMapObj.get("symbol") === undefined &&
    formMapObj.get("upperCase") &&
    formMapObj.get("lowerCase") &&
    formMapObj.get("number")
  ) {
    const randInt = random.int(0, 2);
    const randFunc = getKeyMap.get(randInt);

    if (randFunc !== undefined) return randFunc(chars);
  }

  //uppercase, numbers and symbols only
  if (
    formMapObj.get("lowerCase") === undefined &&
    formMapObj.get("upperCase") &&
    formMapObj.get("symbol") &&
    formMapObj.get("number")
  ) {
    //if random func returns undefined, larger pool of uppercase chars is selected
    const randInt = random.choice([0, 2, 3]) ?? 0;
    const randFunc = getKeyMap.get(randInt);

    if (randFunc !== undefined) return randFunc(chars);
  }

  //uppercase and lowercase only
  if (
    formMapObj.get("number") === undefined &&
    formMapObj.get("symbol") === undefined &&
    formMapObj.get("upperCase") &&
    formMapObj.get("lowerCase")
  ) {
    const randInt = random.int(0, 1);
    const randFunc = getKeyMap.get(randInt);

    if (randFunc !== undefined) return randFunc(chars);
  }

  //uppercase and numbers only
  if (
    formMapObj.get("lowerCase") === undefined &&
    formMapObj.get("symbol") === undefined &&
    formMapObj.get("upperCase") &&
    formMapObj.get("number")
  ) {
    //if random func returns undefined, larger pool of uppercase chars is selected
    const randInt = random.choice([0, 2]) ?? 0;
    const randFunc = getKeyMap.get(randInt);

    if (randFunc !== undefined) return randFunc(chars);
  }

  //uppercase and symbols only
  if (
    formMapObj.get("lowerCase") === undefined &&
    formMapObj.get("number") === undefined &&
    formMapObj.get("upperCase") &&
    formMapObj.get("symbol")
  ) {
    //if random func returns undefined, larger pool of uppercase chars is selected
    const randInt = random.choice([0, 3]) ?? 0;
    const randFunc = getKeyMap.get(randInt);

    if (randFunc !== undefined) return randFunc(chars);
  }

  //lowercase, numbers and symbols only
  if (
    formMapObj.get("upperCase") === undefined &&
    formMapObj.get("lowerCase") &&
    formMapObj.get("symbol") &&
    formMapObj.get("number")
  ) {
    const randInt = random.int(1, 3);
    const randFunc = getKeyMap.get(randInt);

    if (randFunc !== undefined) return randFunc(chars);
  }

  //lowercase and numbers only
  if (
    formMapObj.get("upperCase") === undefined &&
    formMapObj.get("symbol") === undefined &&
    formMapObj.get("lowerCase") &&
    formMapObj.get("number")
  ) {
    const randInt = random.int(1, 2);
    const randFunc = getKeyMap.get(randInt);

    if (randFunc !== undefined) return randFunc(chars);
  }

  //lowercase and symbols only
  if (
    formMapObj.get("upperCase") === undefined &&
    formMapObj.get("number") === undefined &&
    formMapObj.get("lowerCase") &&
    formMapObj.get("symbol")
  ) {
    //if random func returns undefined, larger pool of lowercase chars is selected
    const randInt = random.choice([1, 3]) ?? 1;
    const randFunc = getKeyMap.get(randInt);

    if (randFunc !== undefined) return randFunc(chars);
  }

  //numbers and symbols only
  if (
    formMapObj.get("upperCase") === undefined &&
    formMapObj.get("lowerCase") === undefined &&
    formMapObj.get("number") &&
    formMapObj.get("symbol")
  ) {
    const randInt = random.int(2, 3);
    const randFunc = getKeyMap.get(randInt);

    if (randFunc !== undefined) return randFunc(chars);
  }

  //all
  if (
    formMapObj.get("upperCase") &&
    formMapObj.get("lowerCase") &&
    formMapObj.get("number") &&
    formMapObj.get("symbol")
  ) {
    const randInt = random.int(0, 3);
    const randFunc = getKeyMap.get(randInt);

    if (randFunc !== undefined) return randFunc(chars);
  }
}

export { getKeyMap, getRandKey, chars };
