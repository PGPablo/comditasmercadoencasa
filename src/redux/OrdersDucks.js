import {db} from '../firebase'

// constantes
const dataInicial = {
    loading: false,
    error: false
}

// types
const LOADING = 'LOADING'
const GET_PEDIDO_SUCCESS = 'GET_PEDIDO_SUCCESS'
const SET_PEDIDO_SUCCESS = 'SET_PEDIDO_SUCCESS'
const DELETE_PEDIDO_SUCCESS = 'DELETE_PEDIDO_SUCCESS'
const PUT_PEDIDO_SUCCESS = 'PUT_PEDIDO_SUCCESS'
const ERROR_PEDIDO = 'ERROR_PEDIDO'

// reducer
export default function pedidoReducer(state = dataInicial, action){
    switch(action.type){
        case LOADING:
            return{...state, loading: true}
        case GET_PEDIDO_SUCCESS:
            return{...state, loading: false, listaPedidos: action.payload}
        case SET_PEDIDO_SUCCESS:
            return{...state, loading: false, }
        case PUT_PEDIDO_SUCCESS:
            return{...state, loading: false, }
        case DELETE_PEDIDO_SUCCESS:
            return{...state, loading: false,}
        case ERROR_PEDIDO:
            return{...state, error: true}  
        default:
            return {...state}
    }
}

// actions
export const obtenerPedidosAction = () => async (dispatch) => {
    dispatch({
        type: LOADING
    })

    try{
        const data = await db.collection('pedidos').orderBy('fecha', 'desc').get()
        const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        dispatch({
            type: GET_PEDIDO_SUCCESS,
            payload: arrayData
        })
    }catch (e) {
        dispatch({
            type: ERROR_PEDIDO
        })
    }

}

//Esto se puede mejorar con el getState y modificando unicamente el campo 
export const crearPedidosAction = (pedidoData) => async (dispatch) => {

    console.log(pedidoData)
    dispatch({
        type: LOADING
    })
    try {

        await db.collection('pedidos').doc().set(pedidoData)

        const data = await db.collection('pedidos').orderBy('fecha', 'desc').get()
        const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data() }))

        dispatch({
            type: SET_PEDIDO_SUCCESS,
        })
        dispatch({
            type: GET_PEDIDO_SUCCESS,
            payload: arrayData
        })
    } catch (e) {
        dispatch({
            type: ERROR_PEDIDO
        })
    }
}

//Igual con todo esto 
export const modificarPedidoAction = (pedidoData, id) => async (dispatch) => {
    dispatch({
        type: LOADING
    })
    
    try {

        await db.collection('pedido').doc(id).update({
            nombre: pedidoData.nombre,
            telefono: pedidoData.telefono,
            fecha: pedidoData.fecha,
            municipio: pedidoData.municipio,
            colonia: pedidoData.colonia,
            calle: pedidoData.calle,
            pedido: pedidoData.pedido,
            total: pedidoData.total,
            
        })

        const data = await db.collection('pedidos').orderBy('fecha', 'desc').get()
        const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data() }))

        dispatch({
            type: PUT_PEDIDO_SUCCESS
        })
        dispatch({
            type: GET_PEDIDO_SUCCESS,
            payload: arrayData
        })
    } catch (error) {
        dispatch({
            type: ERROR_PEDIDO
        })
    }
}

//Mejoralo plis
export const eliminarPedidoAction = (id) => async (dispatch) => {
    dispatch({
        type: LOADING
    })
    try {

        await db.collection('pedidos').doc(id).delete()
        
        dispatch({
            type: DELETE_PEDIDO_SUCCESS
        })
        
        const data = await db.collection('pedidos').orderBy('fecha', 'desc').get()
        const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  
        dispatch({
            type: GET_PEDIDO_SUCCESS,
            payload: arrayData
        })

        
    } catch (error) {
        console.log(error)
        dispatch({
            type: ERROR_PEDIDO
        })
    }
} 