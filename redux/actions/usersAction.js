import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage'

const usersAction = {
    signIn: (userSignIn) =>{
        
        return async (dispatch, getState) =>{
            try {
                
                let response = await axios.post("http://luxxor.herokuapp.com/api/user/sign-in", userSignIn)
                if(response.data.response === 'Email y/o contraseña incorrectos'){
                    return response.data.response 
                }else if(response.data.success){
                    await AsyncStorage.setItem('firstName', response.data.response.firstName)
                    await AsyncStorage.setItem('profilePic', response.data.response.profilePic)
                    await AsyncStorage.setItem("id", response.data.response._id)
                    await AsyncStorage.setItem('token', response.data.response.token)
                dispatch({type: "SIGN", payload: response.data.response})
                }else {
                    return response.data.errors
                }
            }catch(error) {
                console.log(error)
            }
        }
    },

    signUp: (userSignUp) =>{
        return async (dispatch, getState) =>{
            try {
                let response = await axios.post("http://luxxor.herokuapp.com/api/user/sign-up", userSignUp)
                if(response.data.success){
                        await AsyncStorage.setItem('firstName', response.data.response.firstName)
                        await AsyncStorage.setItem('profilePic', response.data.response.profilePic)
                        await AsyncStorage.setItem("id", response.data.response._id)
                        await AsyncStorage.setItem('token', response.data.response.token)
                    dispatch({type: "SIGN", payload: response.data.response})
                }else {
                    return response.data.errors
                }

            }catch(error){
                console.log(error)
            }
        }
    },

    signWithLocal: (token)=>{
        return async (dispatch)=>{
            try {
                let response = await axios.get("http://luxxor.herokuapp.com/api/verifyToken", {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                })
                dispatch({type: "SIGN", 
                payload: {token: token, 
                        profilePic: response.data.profilePic,
                        firstName: response.data.firstName,
                        lastName: response.data.lastName, 
                        eMail: response.data.eMail, 
                        admin: response.data.profilePic, 
                        id: response.data.id,
                        dni: response.data.dni
                    }})
            }catch(e){
                dispatch({type: "LOGOUT"})
            }
        }
    },

    getUserData: (id, token) => {
        return async (dispatch) => {
            let response = await axios.get(`http://luxxor.herokuapp.com/api/user/edit-profile/${id}`, {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
            if (!response.data.success) throw new Error(response.data.response)
            return response.data.response
        }
    },
    logOut: () => {
        return async (dispatch) => {
         await AsyncStorage.clear()
          return dispatch({ type: "LOGOUT" });
        }
      },
    editDataUser: (id, flagEdit, token, dataUser) => {
        return async (dispatch) => {
            const url = `http://luxxor.herokuapp.com/api/user/edit-profile/${id}`
            const headers = { Authorization: "Bearer " + token }
            let response = flagEdit ? await axios.put(url, {...dataUser}, { headers } ) : await axios.post(url, {...dataUser}, { headers })
            console.log("respuesta en action", response.data)
            if(response.data.success){
                if(flagEdit){
                    dispatch({ type: "UPDATE_USER", 
                    payload:{
                        firstName: response.data.response.firstName,
                        lastName: response.data.response.lastName,
                    }})
                } else {
                    dispatch({ type: "UPDATE_DNI", dispatch: response.data.response.dni})
                }
                return response.data
            } else {
                throw response.data.response
            }
        }
    },
}

export default usersAction