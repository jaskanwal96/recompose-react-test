import initialState from "./initialState";
function counterApp(state = initialState, action) {
  switch (action.type) {
    case "changePageData":
      return {
        ...state,
        pageData: {
          value: action.payload
        }
      };

    default:
      return state;
  }
}

export default counterApp;
