import * as ActionTypes from '../actions/ActionTypes';

export const modalChallengeReducer = (state = {visible : true}, action) => {
  switch (action.type) {
    case ActionTypes.DISPLAY_MODAL:
      return { ...state ,visible : true};

    case ActionTypes.HIDE_MODAL:
      return {...state, visible : false};
    default:
      return state;
  }
};