import { type NextPage } from "next";

import { AiOutlineCopy } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";
import React, { useState } from "react";
import { functionsMap, returnRandomString } from "../utils/functions";

const Home: NextPage = () => {
  const [charLength, setCharLength] = useState("20");
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [noneInputsSelected, setNoneInputsSelected] = useState(true);
  const [isCopyClicked, setIsCopyClicked] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  //
  const [isUpperCaseIncluded, setIsUpperCaseIncluded] = useState(false);
  const [isLowerCaseIncluded, setIsLowerCaseIncluded] = useState(false);
  const [isNumberIncluded, setIsNumberIncluded] = useState(false);
  const [isSymbolIncluded, setIsSymbolIncluded] = useState(false);

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    console.log(formData.get("upperCase"));
    console.log(formData.get("lowerCase"));
    console.log(formData.get("number"));
    console.log(formData.get("symbol"));
    console.log(isUpperCaseIncluded);
    console.log(isLowerCaseIncluded);
    console.log(isNumberIncluded);
    console.log(isSymbolIncluded);

    // set password strength
    const amountOfParamsSelected = [
      isUpperCaseIncluded,
      isLowerCaseIncluded,
      isNumberIncluded,
      isSymbolIncluded,
    ].filter((param) => param).length;

    switch (amountOfParamsSelected) {
      case 0: {
        setNoneInputsSelected(() => true);
        break;
      }
      case 1: {
        setNoneInputsSelected(() => false);
        setPasswordStrength(() => 25);
        break;
      }
      case 2: {
        setNoneInputsSelected(() => false);
        setPasswordStrength(() => 50);
        break;
      }
      case 3: {
        setNoneInputsSelected(() => false);
        setPasswordStrength(() => 75);
        break;
      }
      case 4: {
        setNoneInputsSelected(() => false);
        setPasswordStrength(() => 100);
        break;
      }
      default: {
        setNoneInputsSelected(() => true);
        break;
      }
    }

    // generate password
    if (!noneInputsSelected) {
      let generatedPass = "";
      while (generatedPass.length < Number(charLength)) {
        generatedPass = returnRandomString({
          upperCase: isUpperCaseIncluded,
          lowerCase: isLowerCaseIncluded,
          number: isNumberIncluded,
          symbol: isSymbolIncluded,
          charLength: Number(charLength),
          functionsMap,
        });
      }

      setGeneratedPassword(() => generatedPass);
    } else {
      setGeneratedPassword(() => "");
    }

    setIsCopyClicked(() => false);
  }

  function handleCopyClick(event: React.MouseEvent<SVGElement, MouseEvent>) {
    navigator.clipboard.writeText(generatedPassword);
    setIsCopyClicked(() => true);
  }

  return (
    <div className="relative my-8 mx-auto flex h-[700px] w-full flex-col gap-y-8 px-4 py-4  sm:my-14 sm:w-[62%] md:h-[800px] md:w-[38%]">
      {/* title */}
      <h1 className="mx-auto h-[5%] text-3xl font-bold text-slate-400 ">
        Password Generator
      </h1>

      {/* password output */}
      <div className="flex h-[10%] w-full flex-row items-center justify-between bg-myLightGrey px-4 text-gray-100 ">
        <p className="overflow-ellipsis sm:text-xl md:text-2xl">
          {generatedPassword}
        </p>

        {isCopyClicked ? (
          <FaCheck className="scale-150 text-myTeal " />
        ) : (
          <AiOutlineCopy
            className="scale-150 text-myTeal hover:cursor-pointer"
            onClick={handleCopyClick}
          />
        )}
      </div>

      {/* options */}
      <div className="grid h-[85%] grid-rows-6">
        {/* char length */}
        <div className="row-span-1 -mb-3 flex flex-row items-center justify-between bg-myLightGrey px-4">
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
          className="row-span-5 flex w-full flex-col items-start justify-around bg-myLightGrey p-4 text-gray-100 "
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
              className="-mt-6 w-full"
            />
          </div>

          <div className=" flex w-full flex-row ">
            <label htmlFor="upperCase"></label>
            <input
              type="checkbox"
              name="upperCase"
              id="upperCase"
              onChange={(event) =>
                setIsUpperCaseIncluded(event.currentTarget.checked)
              }
              className="sm:scale-125 md:scale-150"
            />
            <p className="ml-4 sm:text-xl md:text-2xl">
              Include Uppercase Letters
            </p>
          </div>

          <div className=" flex w-full flex-row">
            <label htmlFor="lowerCase"></label>
            <input
              type="checkbox"
              name="lowerCase"
              id="lowerCase"
              onChange={(event) =>
                setIsLowerCaseIncluded(event.currentTarget.checked)
              }
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
              onChange={(event) =>
                setIsNumberIncluded(event.currentTarget.checked)
              }
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
              onChange={(event) =>
                setIsSymbolIncluded(event.currentTarget.checked)
              }
              className="sm:scale-125 md:scale-150"
            />
            <p className="ml-4 sm:text-xl md:text-2xl">Include Symbols</p>
          </div>

          {/* strength */}
          <div className="flex h-[50px] w-full flex-row items-center justify-between bg-gray-900 px-4  md:h-[75px]">
            <p className="text-lg font-bold tracking-wide text-slate-400 sm:text-xl md:text-2xl">
              STRENGTH
            </p>
            {/* right section */}
            <div className="flex w-[55%] flex-row items-center justify-between  sm:w-[42%] md:h-[50px] md:w-[38%]">
              <p className="text-xl font-bold tracking-wide md:text-2xl ">
                {passwordStrength < 25
                  ? "EASY"
                  : passwordStrength < 50
                  ? "WEAK"
                  : passwordStrength < 75
                  ? "MEDIUM"
                  : passwordStrength < 100
                  ? "STRONG"
                  : "CRYPTO"}
              </p>

              {/* bars */}
              <div className="flex w-[50%] flex-row items-center justify-end gap-x-2  md:gap-x-4">
                <div
                  className={`${
                    passwordStrength >= 25 ? "bg-myLightOrange" : ""
                  } h-[30px] w-[13px] border-2 border-gray-100 md:h-[45px] md:w-[16px]`}
                ></div>
                <div
                  className={`${
                    passwordStrength >= 50 ? "bg-myLightOrange" : ""
                  } h-[30px] w-[13px] border-2 border-gray-100 md:h-[45px] md:w-[16px]`}
                ></div>
                <div
                  className={`${
                    passwordStrength >= 75 ? "bg-myLightOrange" : ""
                  } h-[30px] w-[13px] border-2 border-gray-100 md:h-[45px] md:w-[16px]`}
                ></div>
                <div
                  className={`${
                    passwordStrength === 100 ? "bg-myLightOrange" : ""
                  } h-[30px] w-[13px] border-2 border-gray-100 md:h-[45px] md:w-[16px]`}
                ></div>
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
      {noneInputsSelected && (
        <p className=" absolute text-slate-400 xs:top-[146px] xs:text-sm sm:top-[146px] md:top-[160px]">
          Please select an input, then click generate
        </p>
      )}
    </div>
  );
};

export default Home;
