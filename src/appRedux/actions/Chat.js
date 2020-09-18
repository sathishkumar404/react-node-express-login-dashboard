
import {
  GET_CHAT_SUCCESS,
  GET_CHAT_ERROR,
  GET_All_MEMBER_SUCCESS,
  GET_All_MEMBER_ERROR,
  GET_CHATBYID_SUCCESS,
  GET_CHATBYID_ERROR,
  GET_CHAT_INSERT_SUCCESS,
  GET_CHAT_INSERT_ERROR,
  PUSH_CHAT_MESSAGE
} from "../../constants/ActionTypes"; 

import io from "socket.io-client";
import { URL } from "constants/ThemeSetting";
import axios from "axios"; 



export const getUser = () => {
            return dispatch => {
    axios
      .get(URL + "/api/user/getUsers")
      .then(res => {
          console.log(res)
        dispatch(showSuccess(res.data));
      })
      .catch(err => {
           console.log(err);
        dispatch(showFail(err));
      });
        };  
    }   


    
export const insertChat = userData => {
    
  return dispatch => {
    axios.post(URL + "/api/user/insertChat", userData).then(res => { 
        global.socket.emit("message",res.data );
        dispatch({
          type: GET_CHAT_INSERT_SUCCESS,
          payload: res
        }); 


    });
  };
};

    export const getChat = () => {
      return dispatch => {
        axios
          .get(URL + "/api/user/getChat/")
          .then(res => {
            console.log(res);
            return {
              type: GET_CHAT_SUCCESS,
              payload: res.data
            };
          })
          .catch(err => {
           return {
             type: GET_CHAT_ERROR,
             payload: err
           };
          });
      };
    }; 


        export const getChatById = (id,id1) => { 

      return dispatch => {
      
        axios
          .get(URL + "/api/user/getChatById/"+id+"/"+id1)
          .then(res => {
            console.log(res);
            dispatch(showChatSuccess(res.data));
          })
          .catch(err => { 
              console.log('error',err)
          dispatch(showChatError(err));
          });
      };
    }; 

export const showChatSuccess = data => {
  return {
    type: GET_CHATBYID_SUCCESS,
    payload: data
  };
};

export const pushChatMessage = data => {
  return {
    type: PUSH_CHAT_MESSAGE,
    payload: data
  };
};
 

export const showChatError = err => {
  return {
    type: GET_CHATBYID_ERROR,
    payload: err
  };
};




       export const showSuccess = payload => ({
                type: GET_All_MEMBER_SUCCESS,
                payload: payload
              }); 

       export const showFail = error => ({
                type: GET_All_MEMBER_ERROR,
                payload: error
              });
       
       
