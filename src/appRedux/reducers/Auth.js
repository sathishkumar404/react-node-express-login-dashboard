import {
  HIDE_MESSAGE,
  INIT_URL,
  ON_HIDE_LOADER,
  ON_SHOW_LOADER,
  SHOW_MESSAGE,
  SIGNIN_USER,
  SIGNOUT_USER,
  SIGNUP_USER,
  NEW_USER,
  DELETE_USER,
  SIGNIN_USER_FAILED,
  SIGNIN_USER_SUCCESS,
  GET_USER
} from "constants/ActionTypes";

const INIT_STATE = {
  loader: false,
  alertMessage: '',
  showMessage: false,
  initURL: '',
  token:'',
  authUser: localStorage.getItem('user_id'),
  user:[]
};


export default (state = INIT_STATE, action) => {
  switch (action.type) {
  
    case SIGNIN_USER_SUCCESS: { 
       console.log('reducer')
      return {
        ...state,
        loader: false,
        authUser: action.payload,
        initURL: "/main/dashboard/crm/"
      };
    } 
    case SIGNIN_USER:{ 
      console.log('login')
      
    } 
    case GET_USER:{
       console.log('called',action.payload)
       return{
         ...state,
         loader:false,
         user:action.payload
       }
    }
    case SIGNUP_USER:{
      console.log('sign up')
    }
       case SIGNIN_USER_FAILED: { 
       console.log('reducer')
      return {
        ...state,
        loader: false,
         showMessage: true,
        authUser: []
      }
    }
 
    case NEW_USER:{ 
      console.log('new user reducer')
      return{
        ...state,
        user: [...state.user,action.payload],
        loader: false,
      }
    }
    case DELETE_USER: {
      return {
        ...state,
        user: state.user.filter((item,i)=> item.emp_id !=action.payload),
        loader: false,
      }
    }
    case INIT_URL: {
      return {
        ...state,
        initURL: action.payload
      }
    }
    case SIGNOUT_USER: {
      return {
        ...state,
        authUser: null,
        initURL: '/',
        loader: false,
        token:'',
        alertMessage: '',
        showMessage: false,
        user:[]
      }
    }

    case SHOW_MESSAGE: {
      return {
        ...state,
        alertMessage: action.payload,
        showMessage: true,
        loader: false
      }
    }
    case HIDE_MESSAGE: {
      return {
        ...state,
        alertMessage: '',
        showMessage: false,
        loader: false
      }
    }

    case ON_SHOW_LOADER: {
      return {
        ...state,
        loader: true
      }
    }
    case ON_HIDE_LOADER: {
      return {
        ...state,
        loader: false,
        token:true
      }
    }
    default:
      return state;
  }
}
