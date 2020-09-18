
import {
  GET_CHAT_SUCCESS,
  GET_CHAT_ERROR,
  GET_All_MEMBER_SUCCESS,
  GET_All_MEMBER_ERROR,
  GET_CHATBYID_SUCCESS,
  GET_CHATBYID_ERROR,
  HIDE_MESSAGE,
  INIT_URL,
  ON_HIDE_LOADER,
  ON_SHOW_LOADER,
  SHOW_MESSAGE,
  PUSH_CHAT_MESSAGE
} from "../../constants/ActionTypes"; 

const INIT_STATE = {
  loader: false,
  alertMessage: "",
  showMessage: false,
  token: "",
  authUser: localStorage.getItem("user_id"),
  user: [],
  currentChat:[]
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_All_MEMBER_SUCCESS: {
      console.log("reducer", action.payload);
      return {
        ...state,
        loader: false,
        user: action.payload.data
      };
    }
    case GET_All_MEMBER_ERROR: {
      return {
        ...state
      };
    }

    case GET_CHATBYID_SUCCESS: {
      console.log("chatbuid", action.payload);
      return {
        ...state,
        loader: false,
        currentChat: action.payload.data
      };
    }
    case GET_CHATBYID_ERROR: {
      return {
        ...state,
        currentChat:[]
      };
    }
    case PUSH_CHAT_MESSAGE:{ 
      console.log('paylod',action.payload)
      return {
        ...state,
        currentChat: [...state.currentChat, action.payload]
      };
    }

    case SHOW_MESSAGE: {
      return {
        ...state,
        alertMessage: action.payload,
        showMessage: true,
        loader: false
      };
    }
    case HIDE_MESSAGE: {
      return {
        ...state,
        alertMessage: "",
        showMessage: false,
        loader: false
      };
    }

    case ON_SHOW_LOADER: {
      return {
        ...state,
        loader: true
      };
    }
    case ON_HIDE_LOADER: {
      return {
        ...state,
        loader: false,
        token: true
      };
    }
    default:
      return state;
  }
};
