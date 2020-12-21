import * as ActionTypes from "../actions/ActionTypes";

export const modalCreateChallengeReducer = (
  state = { numberPage: 1 },
  action
) => {
  switch (action.type) {
    case ActionTypes.NEXTPAGE_MODALCREATECHALLENGE:
      if (state.numberPage < 4) return { numberPage: state.numberPage + 1 };
      else return state;

    case ActionTypes.BACKPAGE_MODALCREATECHALLENGE:
      if (state.numberPage > 0) return { numberPage: state.numberPage - 1 };
      else return state;
    
    case ActionTypes.RESETPAGE_MODALCREATECHALLENGE:
      return { numberPage: 1 };
    default:
      return state;
  }
};
