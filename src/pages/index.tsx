import { type NextPage } from "next";
import gradient from "@privjs/gradients";
import { v4 as uuidv4 } from "uuid";
import random from "random";
import { AiOutlineCopy } from "react-icons/ai";

const Home: NextPage = () => {
  // const gradientBG = gradient(uuidv4());

  const randNum = random.int(0, 9);
  console.log(randNum);

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <div
      // style={{ backgroundImage: gradientBG }}
      className="my-8 mx-auto flex h-[700px] w-full flex-col gap-y-8 px-4 py-4 outline-dashed sm:w-[62%] md:h-[800px] md:w-[38%]"
    >
      {/* title */}
      <h1 className="mx-auto h-[5%] text-3xl font-bold text-slate-400 outline-dotted">
        Password Generator
      </h1>

      {/* password output */}
      <div className="flex h-[10%] w-full flex-row items-center justify-between bg-myLightGrey px-4 text-gray-100 ">
        <p className="sm:text-xl md:text-2xl">password</p>
        <AiOutlineCopy className="scale-150 text-myTeal" />
      </div>

      {/* options */}
      <div className="grid-rows-6outline-dotted grid h-[85%]">
        {/* char length */}
        <div className="row-span-1 flex flex-row items-center justify-between bg-myLightGrey px-4">
          <p className="text-gray-100 sm:text-xl md:text-2xl">
            Character Length
          </p>
          <p className="text-myTeal sm:text-xl md:text-2xl">10</p>
        </div>
        {/* slider */}
        <form
          action="#"
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
            <label htmlFor="numbers"></label>
            <input
              type="checkbox"
              name="numbers"
              id="numbers"
              className="sm:scale-125 md:scale-150"
            />
            <p className="ml-4 sm:text-xl md:text-2xl">Include Numbers</p>
          </div>

          <div className="flex w-full flex-row">
            <label htmlFor="symbols"></label>
            <input
              type="checkbox"
              name="symbols"
              id="symbols"
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
