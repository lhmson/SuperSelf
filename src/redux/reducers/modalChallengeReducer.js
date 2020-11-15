import * as ActionTypes from '../actions/ActionTypes';

export const modalChallengeReducer = (state = {visible : false, visiableModalCreate : false}, action) => {
  switch (action.type) {
    case ActionTypes.DISPLAY_MODAL:
      return { ...state ,visible : true, visiableModalCreate : false};

    case ActionTypes.HIDE_MODAL:
      return {...state, visible : false, visiableModalCreate : false};
    
    case ActionTypes.BEGIN_CHALLENGE:
      return {...state, visible : false, visiableModalCreate : true};

    case ActionTypes.COMPLETE_CHALLENGE:
      return {...state, visible : false, visiableModalCreate : false};
    default:
      return state;
  }
};