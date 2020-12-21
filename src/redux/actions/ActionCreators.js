import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../baseUrl";

// export const fetchExamples = () => (dispatch) => {
//     return fetch(baseUrl + 'examples')
//     .then(response => {
//         if (response.ok) {
//           return response;
//         } else {
//           var error = new Error('Error ' + response.status + ': ' + response.statusText);
//           error.response = response;
//           throw error;
//         }
//       },
//       error => {
//             var errmess = new Error(error.message);
//             throw errmess;
//       })
//     .then(response => response.json())
//     .then(examples => dispatch(readExamples(examples)))
//     .catch(error => dispatch(examplesFailed(error.message)));
// };

// export const examplesFailed = (errmess) => ({
//     type: ActionTypes.EXAMPLES_FAILED,
//     payload: errmess
// });

// export const readExamples = (examples) => ({
//     type: ActionTypes.READ_EXAMPLES,
//     payload: examples
// });

// export const readExample = (example) => ({
//     type: ActionTypes.READ_EXAMPLE,
//     payload: example,
// })

// export const examplesLoading = () => ({
//     type: ActionTypes.EXAMPLES_LOADING,
// });

// export const postExample = (id, a, b, c) => (dispatch) => {
//     const newExample = {
//         id: id,
//         a: a,
//         b: b,
//         c: c
//     };
//     newExample.date = new Date().toISOString();

//     setTimeout(() => {
//         dispatch(readExample(newExample));
//     }, 2000);
//     //alert(JSON.stringify(newComment));

// };

// export const deleteExample = (id) => ({
//     type: ActionTypes.DELETE_EXAMPLE,
//     payload: id
// });

// action modal challenge
export const displayModal = () => ({
  type: ActionTypes.DISPLAY_MODAL,
  visible: true,
});

export const hideModal = () => ({
  type: ActionTypes.HIDE_MODAL,
  visible: false,
});

export const beginChallenge = () => ({
  type: ActionTypes.BEGIN_CHALLENGE,
});

export const completeChallenge = () => ({
  type: ActionTypes.COMPLETE_CHALLENGE,
});

export const backModalChallenge = () => ({
  type: ActionTypes.BACK_MODALINFOCHALLENGE,
});

//Action Create Challenge
export const nextPageModal = () => ({
  type: ActionTypes.NEXTPAGE_MODALCREATECHALLENGE,
});

export const backPageModal = () => ({
  type: ActionTypes.BACKPAGE_MODALCREATECHALLENGE,
});

export const resetPageModal = () => ({
  type: ActionTypes.RESETPAGE_MODALCREATECHALLENGE,
});

