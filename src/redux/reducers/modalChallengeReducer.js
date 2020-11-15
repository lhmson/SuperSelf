import * as ActionTypes from "../actions/ActionTypes";

export const modalChallengeReducer = (
  state = { visible: false, visibleModalCreate: false },
  action
) => {
  switch (action.type) {
    case ActionTypes.DISPLAY_MODAL:
      return { ...state, visible: true, visibleModalCreate: false };

    case ActionTypes.HIDE_MODAL:
      return { ...state, visible: false, visibleModalCreate: false };

    case ActionTypes.BEGIN_CHALLENGE:
      return { ...state, visible: false, visibleModalCreate: true };

    case ActionTypes.COMPLETE_CHALLENGE:
      return { ...state, visible: false, visibleModalCreate: false };
    default:
      return state;
  }
};
