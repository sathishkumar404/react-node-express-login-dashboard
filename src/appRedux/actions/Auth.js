import {
  HIDE_MESSAGE,
  INIT_URL,
  ON_HIDE_LOADER,
  ON_SHOW_LOADER,
  SHOW_MESSAGE,
  SIGNIN_FACEBOOK_USER,
  SIGNIN_FACEBOOK_USER_SUCCESS,
  SIGNIN_GITHUB_USER,
  SIGNIN_GITHUB_USER_SUCCESS,
  SIGNIN_GOOGLE_USER,
  SIGNIN_GOOGLE_USER_SUCCESS,
  SIGNIN_TWITTER_USER,
  SIGNIN_TWITTER_USER_SUCCESS,
  SIGNIN_USER,
  SIGNIN_USER_SUCCESS,
  SIGNOUT_USER,
  SIGNOUT_USER_SUCCESS,
  SIGNUP_USER,
  SIGNUP_USER_SUCCESS,
  NEW_USER,
  DELETE_USER,
  GET_USER
} from "constants/ActionTypes";  
import {URL} from 'constants/ThemeSetting'


import setAuthToken from '../../util/setAuthToken';
import jwt_decode from 'jwt-decode';
import axios from 'axios'; 
export const userSignUp = (userData,onSuccess,onFailure) => {
     
      return dispatch => {
    axios.post(URL+'/api/admin/register',userData)
         .then(res => {  
        console.log(res);
            if(res.data.status!=0) { 
           
                console.log(res);
        
                   dispatch(showAuthMessage('User Registered')) 
                   onSuccess()
                 
            }else {
                dispatch(showAuthMessage('Registration Failed'))
                onFailure()
                
            } 

           
         })
         .catch(err => {
           return {
            type: SHOW_MESSAGE,
            payload: ''
            }
         }
        );
};  

};  



export const deleteUser = id => {
         return dispatch => {
           fetch(URL + "/api/v1/delete_emp/"+ id)
             .then(response => response.json())
             .then(responsejson => {
               console.log("getuser", responsejson);
               if (responsejson.status == 0)
                 dispatch({
                   type: DELETE_USER,
                   payload: id
                 });
               else dispatch(showMessage("Get Delete Failed"));
             });
         };
       };




export const showMessage = message => {
  return {
    type: SHOW_MESSAGE,
    payload: message
  };
};


export const newUser = (userData)=> { 
   return dispatch => {
     fetch(URL + "/api/v1/registerEmp", {
       method: "POST", // or 'PUT'
       headers: {
         "Content-Type": "application/json"
       },
       body: JSON.stringify(userData)
     }).then((response)=>response.json())
     .then((responsejson)=>{
       console.log(responsejson);  
       if(responsejson.status==0)
      dispatch(getUser(responsejson));
      else
      dispatch(showMessage('Insertion Failed'))
     })
  
};  

} 


export const getUser = userData => {
  return dispatch => {
    fetch(URL + "/api/v1/getEmpDetails")
      .then(response => response.json())
      .then(responsejson => {
        console.log('getuser',responsejson);
        if (responsejson.status == 0) dispatch(getUserR(responsejson.data));
        else dispatch(showMessage("Get Failed"));
      });
  };
};


export const sendUser = (post)=>{
  return {
    type: NEW_USER,
    payload: post
  };
}


export const getUserR = post => {
  return {
    type: GET_USER,
    payload: post
  };
};


//Login - Get User Token
export const loginUser = (userData)=> { 

       return dispatch => {
     fetch(URL + "/api/admin/login", {
       method: "POST", // or 'PUT'
       headers: {
         "Content-Type": "application/json"
       },
       body: JSON.stringify(userData)
     }).then((response)=>response.json())
     .then((res)=>{
          console.log('login',res); 
          var token=0;
          if(res.status==0)
            dispatch(showAuthMessage("Login Not Valid"));
            else{
              if (res.user_data) {
                localStorage.setItem(
                  "User_data",
                  JSON.stringify(res.user_data)
                );
              }

              //Set Token to Localstorage
              localStorage.setItem("jwtToken", res.token);
              //Set Token to Header
              setAuthToken(token); 

              //set Current User
              dispatch(userSignIn(res.user_data));

            }

          
       
      })
      .catch(err => {
        return {
          type: SHOW_MESSAGE,
          payload: err
        };
      });
};  

}


export const userSignIn = (storeData)  => {
 console.log(storeData)
    return{
    type:SIGNIN_USER_SUCCESS,
    payload:storeData
  }
};





export const userSignOut = () => { 
  return {
    type: SIGNOUT_USER
  };
};
export const userSignUpSuccess = (authUser) => {
  return {
    type: SIGNUP_USER_SUCCESS,
    payload: authUser
  };
}; 


export const userSignInSuccess = (authUser) => {
  return {
    type: SIGNIN_USER_SUCCESS,
    payload: authUser
  }
};   

export const userSignOutSuccess = () => {
  return {
    type: SIGNOUT_USER_SUCCESS,
  }
};

export const showAuthMessage = (message) => {
  return {
    type: SHOW_MESSAGE,
    payload: message
  };
};


export const userGoogleSignIn = () => {
  return {
    type: SIGNIN_GOOGLE_USER
  };
};
export const userGoogleSignInSuccess = (authUser) => {
  return {
    type: SIGNIN_GOOGLE_USER_SUCCESS,
    payload: authUser
  };
};
export const userFacebookSignIn = () => {
  return {
    type: SIGNIN_FACEBOOK_USER
  };
};
export const userFacebookSignInSuccess = (authUser) => {
  return {
    type: SIGNIN_FACEBOOK_USER_SUCCESS,
    payload: authUser
  };
};
export const setInitUrl = (url) => {
  return {
    type: INIT_URL,
    payload: url
  };
};
export const userTwitterSignIn = () => {
  return {
    type: SIGNIN_TWITTER_USER
  };
};
export const userTwitterSignInSuccess = (authUser) => {
  return {
    type: SIGNIN_TWITTER_USER_SUCCESS,
    payload: authUser
  };
};
export const userGithubSignIn = () => {
  return {
    type: SIGNIN_GITHUB_USER
  };
};
export const userGithubSignInSuccess = (authUser) => {
  return {
    type: SIGNIN_GITHUB_USER_SUCCESS,
    payload: authUser
  };
};
export const showAuthLoader = () => {
  return {
    type: ON_SHOW_LOADER,
  };
};

export const hideMessage = () => {
  return {
    type: HIDE_MESSAGE,
  };
}; 



export const hideAuthLoader = () => {
  console.log('test')
  return {
    type: ON_HIDE_LOADER,
  };
};
