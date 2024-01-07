import {
  GET_POST_REQUEST,
  GET_POST_SUCCESS,
  GET_POST_FAIL,
  GET_POST_CLEAN,
  ADD_NEW_POST,
} from "../actions/type";

const initialState = {
  isLoading: false,
  posts: [],
  errorMessage: "",
  hasNextPage: false,
  nextPage: 1,
  totalPage: 0,
};

const getPostReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_POST_REQUEST:
      return {
        isLoading: true,
        ...state,
        errorMessage: "",
      };
    case GET_POST_SUCCESS:
      return {
        isLoading: false,
        posts: [...state.posts, ...payload.posts],
        errorMessage: "",
        hasNextPage: payload.hasNextPage,
        nextPage: payload.nextPage,
        totalPage: payload.totalPage,
      };
    case GET_POST_FAIL:
      return {
        ...state,
        errorMessage: payload.errorMessage,
        isLoading: false,
      };
    case ADD_NEW_POST:
      return {
        ...state,
        posts: [payload.post, ...state.posts],
      };
    case GET_POST_CLEAN:
      return initialState;
    default:
      return state;
  }
};

export default getPostReducer;
