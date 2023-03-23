import type { State, StateActions, StateDispatch } from "../types";

const initialState: State = {
  isUpperCaseSelected: false,
  isLowerCaseSelected: false,
  isNumberSelected: false,
  isSymbolSelected: false,
  charLength: 20,
  noneInputsSelected: true,
  isCopyClicked: false,
  passwordStrength: 0,
  generatedPassword: "",
};

const stateActions: StateActions = {
  setIsUpperCaseSelected: "setIsUpperCaseSelected",
  setIsLowerCaseSelected: "setIsLowerCaseSelected",
  setIsNumberSelected: "setIsNumberSelected",
  setIsSymbolSelected: "setIsSymbolSelected",
  setCharLength: "setCharLength",
  setNoneInputsSelected: "setNoneInputsSelected",
  setIsCopyClicked: "setIsCopyClicked",
  setPasswordStrength: "setPasswordStrength",
  setGeneratedPassword: "setGeneratedPassword",
};

function stateReducer(state: State, dispatch: StateDispatch): State {
  const { type, payload } = dispatch;

  switch (type) {
    case stateActions.setIsUpperCaseSelected: {
      return {
        ...state,
        isUpperCaseSelected: payload as boolean,
        noneInputsSelected: false,
      };
    }
    case stateActions.setIsLowerCaseSelected: {
      return {
        ...state,
        isLowerCaseSelected: payload as boolean,
        noneInputsSelected: false,
      };
    }
    case stateActions.setIsNumberSelected: {
      return {
        ...state,
        isNumberSelected: payload as boolean,
        noneInputsSelected: false,
      };
    }
    case stateActions.setIsSymbolSelected: {
      return {
        ...state,
        isSymbolSelected: payload as boolean,
        noneInputsSelected: false,
      };
    }
    case stateActions.setCharLength: {
      return {
        ...state,
        charLength: payload as number,
      };
    }
    case stateActions.setNoneInputsSelected: {
      return {
        ...state,
        noneInputsSelected: payload as boolean,
      };
    }
    case stateActions.setIsCopyClicked: {
      return {
        ...state,
        isCopyClicked: payload as boolean,
      };
    }
    case stateActions.setPasswordStrength: {
      return {
        ...state,
        passwordStrength: payload as number,
      };
    }
    case stateActions.setGeneratedPassword: {
      return {
        ...state,
        generatedPassword: payload as string,
      };
    }
    default: {
      return state;
    }
  }
}

export { initialState, stateActions, stateReducer };
