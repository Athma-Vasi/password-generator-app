import { type NextPage } from "next";

import { AiOutlineCopy } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";
import React, { useReducer } from "react";
import {
  functionsMap,
  returnRandomString,
  setPasswordStrengthState,
} from "../utils";
import { initialState, stateActions, stateReducer } from "../state";

const Home: NextPage = () => {
  const [state, dispatch] = useReducer(stateReducer, initialState);

  const {
    isUpperCaseSelected,
    isLowerCaseSelected,
    isNumberSelected,
    isSymbolSelected,
    charLength,
    noneInputsSelected,
    isCopyClicked,
    passwordStrength,
    generatedPassword,
  } = state;

  const {
    setGeneratedPassword,
    setIsCopyClicked,
    setCharLength,
    setIsUpperCaseSelected,
    setIsLowerCaseSelected,
    setIsNumberSelected,
    setIsSymbolSelected,
  } = stateActions;

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // set password strength
    setPasswordStrengthState({
      isUpperCaseSelected,
      isLowerCaseSelected,
      isNumberSelected,
      isSymbolSelected,
      stateDispatch: dispatch,
      stateActions,
    });

    // generate password
    if (noneInputsSelected) {
      // if all inputs are deselected
      dispatch({
        type: setGeneratedPassword,
        payload: "",
      });
    } else {
      // if at least one input is selected
      let generatedPass = "";

      generatedPass = returnRandomString({
        upperCase: isUpperCaseSelected,
        lowerCase: isLowerCaseSelected,
        number: isNumberSelected,
        symbol: isSymbolSelected,
        charLength: Number(charLength),
        functionsMap,
      });

      dispatch({
        type: setGeneratedPassword,
        payload: generatedPass,
      });
    }

    dispatch({
      type: setIsCopyClicked,
      payload: false,
    });
  }

  function handleCopyClick(event: React.MouseEvent<SVGElement, MouseEvent>) {
    navigator.clipboard.writeText(generatedPassword);
    dispatch({
      type: setIsCopyClicked,
      payload: true,
    });
  }

  function handleCharLengthChange(event: React.ChangeEvent<HTMLInputElement>) {
    const charLength = Number(event.currentTarget.value);
    dispatch({
      type: setCharLength,
      payload: charLength,
    });
  }

  function handleUppercaseSelected(event: React.ChangeEvent<HTMLInputElement>) {
    const isUpperCaseSelected = event.currentTarget.checked;
    dispatch({
      type: setIsUpperCaseSelected,
      payload: isUpperCaseSelected,
    });

    // if all inputs are deselected, set noneInputsSelected to true, else set it to false and also set password strength state
    setPasswordStrengthState({
      isUpperCaseSelected,
      isLowerCaseSelected,
      isNumberSelected,
      isSymbolSelected,
      stateDispatch: dispatch,
      stateActions,
    });
  }

  function handleLowercaseSelected(event: React.ChangeEvent<HTMLInputElement>) {
    const isLowerCaseSelected = event.currentTarget.checked;
    dispatch({
      type: setIsLowerCaseSelected,
      payload: isLowerCaseSelected,
    });

    // if all inputs are deselected, set noneInputsSelected to true, else set it to false and also set password strength state
    setPasswordStrengthState({
      isUpperCaseSelected,
      isLowerCaseSelected,
      isNumberSelected,
      isSymbolSelected,
      stateDispatch: dispatch,
      stateActions,
    });
  }

  function handleNumberSelected(event: React.ChangeEvent<HTMLInputElement>) {
    const isNumberSelected = event.currentTarget.checked;
    dispatch({
      type: setIsNumberSelected,
      payload: isNumberSelected,
    });

    // if all inputs are deselected, set noneInputsSelected to true, else set it to false and also set password strength state
    setPasswordStrengthState({
      isUpperCaseSelected,
      isLowerCaseSelected,
      isNumberSelected,
      isSymbolSelected,
      stateDispatch: dispatch,
      stateActions,
    });
  }

  function handleSymbolSelected(event: React.ChangeEvent<HTMLInputElement>) {
    const isSymbolSelected = event.currentTarget.checked;
    dispatch({
      type: setIsSymbolSelected,
      payload: isSymbolSelected,
    });

    // if all inputs are deselected, set noneInputsSelected to true, else set it to false and also set password strength state
    setPasswordStrengthState({
      isUpperCaseSelected,
      isLowerCaseSelected,
      isNumberSelected,
      isSymbolSelected,
      stateDispatch: dispatch,
      stateActions,
    });
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
              onChange={handleCharLengthChange}
              className="-mt-6 w-full"
            />
          </div>

          <div className=" flex w-full flex-row ">
            <label htmlFor="upperCase"></label>
            <input
              type="checkbox"
              name="upperCase"
              id="upperCase"
              onChange={handleUppercaseSelected}
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
              onChange={handleLowercaseSelected}
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
              onChange={handleNumberSelected}
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
              onChange={handleSymbolSelected}
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
                {passwordStrength === 0
                  ? ""
                  : passwordStrength === 25
                  ? "WEAK"
                  : passwordStrength === 50
                  ? "MEDIUM"
                  : passwordStrength === 75
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
            className={`h-[50px] w-full ${
              noneInputsSelected ? "bg-slate-300" : "bg-myTeal"
            } text-gray-900 `}
            disabled={noneInputsSelected}
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
