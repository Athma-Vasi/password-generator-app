import { type NextPage } from "next";
import gradient from "@privjs/gradients";
import { v4 as uuidv4 } from "uuid";
import random from "random";
import { AiOutlineCopy } from "react-icons/ai";
import { useState } from "react";

type Chars = {
  upperCase: string;
  lowerCase: string;
  number: string;
  symbol: string;
};

type GetKeyMap = Map<number, (chars: Chars) => string>;

type FormMapObj = keyof Chars | "charLength";

const Home: NextPage = () => {
  const [formMapObj, setFormMapObj] = useState<Map<FormMapObj, string>>(
    new Map()
  );
  const [charLength, setCharLength] = useState("");
  const [generatedPassword, setGeneratedPassword] = useState("");

  const chars = {
    upperCase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowerCase: "abcdefghijklmnopqrstuvwxyz",
    number: "0123456789",
    symbol: "#$%^&*()_+~\\`|}{[]:;?><,./-=",
  };

  /*
  const getKey = [
    function upperCase(chars: Chars) {
      const length = chars.upperCase.length;
      return chars.upperCase[random.int(0, length - 1)] ?? "";
    },
    function lowerCase(chars: Chars) {
      const length = chars.lowerCase.length;
      return chars.lowerCase[random.int(0, length - 1)] ?? "";
    },
    function number(chars: Chars) {
      const length = chars.number.length;
      return chars.number[random.int(0, length - 1)] ?? "";
    },
    function symbol(chars: Chars) {
      const length = chars.symbol.length;
      return chars.symbol[random.int(0, length - 1)] ?? "";
    },
  ];
*/

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
    const size = getKeyMap.size;

    //uppercase only selected
    if (
      formMapObj.get("lowerCase") ??
      formMapObj.get("number") ??
      formMapObj.get("symbol") ??
      formMapObj.get("upperCase")
    ) {
      // const randInt = random.int(0, size - 1);
      const func = getKeyMap.get(1);

      if (func !== undefined) return func(chars);
    }

    //lowercase only selected
    if (
      formMapObj.get("upperCase") ??
      formMapObj.get("number") ??
      formMapObj.get("symbol") ??
      formMapObj.get("lowerCase")
    ) {
      const func = getKeyMap.get(1);

      if (func !== undefined) return func(chars);
    }

    //numbers only selected
    if (
      formMapObj.get("upperCase") ??
      formMapObj.get("lowerCase") ??
      formMapObj.get("symbol") ??
      formMapObj.get("number")
    ) {
      const func = getKeyMap.get(2);

      if (func !== undefined) return func(chars);
    }

    //symbols only selected
    if (
      formMapObj.get("upperCase") ??
      formMapObj.get("lowerCase") ??
      formMapObj.get("number") ??
      formMapObj.get("symbol")
    ) {
      const func = getKeyMap.get(3);

      if (func !== undefined) return func(chars);
    }

    //uppercase and lowercase only
    if (
      formMapObj.get("number") ??
      formMapObj.get("symbol") ??
      (formMapObj.get("upperCase") && formMapObj.get("lowerCase"))
    ) {
      const randInt = random.int(0, 1);
      const randFunc = getKeyMap.get(randInt);

      if (randFunc !== undefined) return randFunc(chars);
    }

    //uppercase, lowercase and numbers only
    if (
      formMapObj.get("symbol") ??
      (formMapObj.get("upperCase") &&
        formMapObj.get("lowerCase") &&
        formMapObj.get("number"))
    ) {
      const randInt = random.int(0, 2);
      const randFunc = getKeyMap.get(randInt);

      if (randFunc !== undefined) return randFunc(chars);
    }

    //uppercase, numbers and symbols only
    //uppercase and numbers only
    //uppercase and symbols only

    //lowercase, numbers and symbols only
    //lowercase and numbers only
    //
  }

  function populatePasswordAndSetState(
    getRandKey: (
      getKeyMap: GetKeyMap,
      chars: Chars,
      formMapObj: Map<FormMapObj, string>
    ) => string | undefined
  ) {
    let generatedPass = "";
    console.log(getRandKey(getKeyMap, chars, formMapObj));

    while (generatedPass.length < Number(charLength)) {
      generatedPass += getRandKey(getKeyMap, chars, formMapObj) ?? "";
      console.log("while loop entered");

      // generatedPass = `${generatedPass}${getRandKey(getKeyMap, chars, formMapObj) ?? ""}`;
    }

    console.log(generatedPass);
    // setGeneratedPassword(generatedPass);
    // console.log(getRandKey(getKeyMap, chars, formMapObj));
  }

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const formMap = [...formData.entries()].reduce(
      (
        mapObj: Map<FormMapObj, string>,
        [formInput, inputValue]: [string, FormDataEntryValue]
      ) => {
        //form input values are all strings
        mapObj.set(formInput as keyof Chars, inputValue as string);

        return mapObj;
      },
      new Map()
    );

    setFormMapObj(formMap);
    populatePasswordAndSetState(getRandKey);
  }

  return (
    <div
      // style={{ backgroundImage: gradientBG }}
      className="my-8 mx-auto flex h-[700px] w-full flex-col gap-y-8 px-4 py-4 outline-dashed sm:my-14 sm:w-[62%] md:h-[800px] md:w-[38%]"
    >
      {/* title */}
      <h1 className="mx-auto h-[5%] text-3xl font-bold text-slate-400 outline-dotted">
        Password Generator
      </h1>

      {/* password output */}
      <div className="flex h-[10%] w-full flex-row items-center justify-between bg-myLightGrey px-4 text-gray-100 ">
        <p className="overflow-ellipsis sm:text-xl md:text-2xl">password</p>
        <AiOutlineCopy className="scale-150 text-myTeal hover:cursor-pointer" />
      </div>

      {/* options */}
      <div className="grid-rows-6outline-dotted grid h-[85%]">
        {/* char length */}
        <div className="row-span-1 flex flex-row items-center justify-between bg-myLightGrey px-4">
          <p className="text-gray-100 sm:text-xl md:text-2xl">
            Character Length
          </p>
          <p className="text-myTeal sm:text-xl md:text-2xl">{charLength}</p>
        </div>
        {/* slider */}
        <form
          action="#"
          id="passGenForm"
          onSubmit={handleFormSubmit}
          className="row-span-5 flex w-full flex-col items-start justify-around bg-myLightGrey p-4 text-gray-100 outline-dotted"
        >
          <div className=" flex w-full flex-row ">
            <label htmlFor="charLength"></label>
            <input
              type="range"
              name="charLength"
              id="charLength"
              min="8"
              max="32"
              value={charLength}
              onChange={(event) => setCharLength(event.currentTarget.value)}
              // className="form-range h-2 w-full appearance-none bg-myTeal p-0 focus:shadow-none focus:outline-none focus:ring-0 "
              className="w-full"
            />
          </div>

          <div className=" flex w-full flex-row outline-dashed">
            <label htmlFor="uppercase"></label>
            <input
              type="checkbox"
              name="uppercase"
              id="uppercase"
              className="sm:scale-125 md:scale-150"
            />
            <p className="ml-4 sm:text-xl md:text-2xl">
              Include Uppercase Letters
            </p>
          </div>

          <div className=" flex w-full flex-row">
            <label htmlFor="lowercase"></label>
            <input
              type="checkbox"
              name="lowercase"
              id="lowercase"
              className="sm:scale-125 md:scale-150"
            />
            <p className="ml-4 sm:text-xl md:text-2xl">
              Include Lowercase Letters
            </p>
          </div>

          <div className="flex w-full flex-row">
            <label htmlFor="number"></label>
            <input
              type="checkbox"
              name="number"
              id="number"
              className="sm:scale-125 md:scale-150"
            />
            <p className="ml-4 sm:text-xl md:text-2xl">Include Numbers</p>
          </div>

          <div className="flex w-full flex-row">
            <label htmlFor="symbol"></label>
            <input
              type="checkbox"
              name="symbol"
              id="symbol"
              className="sm:scale-125 md:scale-150"
            />
            <p className="ml-4 sm:text-xl md:text-2xl">Include Symbols</p>
          </div>

          {/* strength */}
          <div className="flex h-[50px] w-full flex-row items-center justify-between bg-gray-900 px-4 outline-dashed md:h-[75px]">
            <p className="text-lg font-bold tracking-wide text-slate-400 sm:text-xl md:text-2xl">
              STRENGTH
            </p>
            {/* right section */}
            <div className="flex w-[55%] flex-row items-center justify-between outline-dotted sm:w-[42%] md:h-[50px] md:w-[38%]">
              <p className="text-xl font-bold tracking-wide md:text-2xl ">
                MEDIUM
              </p>
              {/* bars */}
              <div className="flex w-[50%] flex-row items-center justify-end gap-x-2 outline-dotted md:gap-x-4">
                <div className="h-[30px] w-[13px] border-2 border-gray-100 md:h-[45px] md:w-[16px]"></div>
                <div className="h-[30px] w-[13px] border-2 border-gray-100 md:h-[45px] md:w-[16px]"></div>
                <div className="h-[30px] w-[13px] border-2 border-gray-100 md:h-[45px] md:w-[16px]"></div>
                <div className="h-[30px] w-[13px] border-2 border-gray-100 md:h-[45px] md:w-[16px]"></div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="h-[50px] w-full  bg-myTeal text-gray-900 "
          >
            <span className="font-bold tracking-widest sm:text-xl md:text-xl">
              GENERATE
            </span>{" "}
            <span className="font-bold sm:text-xl md:text-xl">{"->"}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
