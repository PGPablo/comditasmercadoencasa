import {auth} from '../firebase'

// constantes
const dataInicial = {
    loading: false,
    activo: false,
    error: false,
    info: {},
}

// types
const LOADING = 'LOADING'
const USUARIO_EXITO = 'USUARIO_EXITO'
const SIN_USUARIO = 'SIN_USUARIO'
const USUARIO_ERROR = 'USUARIO_ERROR'
const CERRAR_SESION = 'CERRAR_SESION'


// reducer
export default function usuarioReducer (state = dataInicial, action){
    switch(action.type){
        case LOADING:
            return {...state, loading: true}
        case USUARIO_ERROR:
            return {...dataInicial, error: true}
        case SIN_USUARIO:
            return {...dataInicial, loading: false}
        case USUARIO_EXITO:
            return {...state, loading: false, info: action.payload, activo: true}
        case CERRAR_SESION:
            return {...dataInicial}
        default:
            return {...state}
    }
}

// actions
export const loginUserAction = (email, pass) => async (dispatch) => {
    dispatch({
        type: "LOADING"
    })
    try {
        const res = await auth.signInWithEmailAndPassword(email, pass)
        dispatch({
            type: USUARIO_EXITO,
            payload: {
                uid: res.user.uid,
                email: res.user.email
            }
        })
        localStorage.setItem('usuario', JSON.stringify({
            uid: res.user.uid,
            email: res.user.email
        }))
    } catch (error) {
        dispatch({
            type: USUARIO_ERROR
        })
    }
}

export const leerUsuarioActivoAccion = () => (dispatch) => {
    if(localStorage.getItem('usuario')){
        dispatch({
            type: USUARIO_EXITO,
            payload: JSON.parse(localStorage.getItem('usuario'))
        })
    }else{
        dispatch({
            type: SIN_USUARIO,
        })
    }

}

export const cerrarSesionAccion = () => (dispatch) => {
    auth.signOut()
    localStorage.removeItem('usuario')
    dispatch({
        type: CERRAR_SESION
    })
}