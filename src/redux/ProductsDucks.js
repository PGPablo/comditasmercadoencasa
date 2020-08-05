import {db, storage} from '../firebase'

// constantes
const dataInicial = {
    loading: false,
    error: false
}

// types
const LOADING = 'LOADING'
const GET_PRODUCTO_SUCCESS = 'GET_PRODUCTO_SUCCESS'
const SET_PRODUCTO_SUCCESS = 'SET_PRODUCTO_SUCCESS'
const DELETE_PRODUCTO_SUCCESS = 'DELETE_PRODUCTO_SUCCESS'
const PUT_PRODUCTO_SUCCESS = 'PUT_PRODUCTO_SUCCESS'
const ERROR_PRODUCTO = 'ERROR_PRODUCTO'

// reducer
export default function productoReducer(state = dataInicial, action){
    switch(action.type){
        case LOADING:
            return{...state, loading: true}
        case GET_PRODUCTO_SUCCESS:
            return{...state, loading: false, listaProductos: action.payload}
        case SET_PRODUCTO_SUCCESS:
            return{...state, loading: false, }
        case PUT_PRODUCTO_SUCCESS:
            return{...state, loading: false, }
        case DELETE_PRODUCTO_SUCCESS:
            return{...state, loading: false,}
        case ERROR_PRODUCTO:
            return{...state, error: true}  
        default:
            return {...state}
    }
}

// actions
export const obtenerProductosAction = () => async (dispatch) => {
    dispatch({
        type: LOADING
    })

    try{
        const data = await db.collection('productos').orderBy('prioridad').get()
        const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        dispatch({
            type: GET_PRODUCTO_SUCCESS,
            payload: arrayData
        })
    }catch (e) {
        dispatch({
            type: ERROR_PRODUCTO
        })
    }
}

//Esto se puede mejorar con el getState y modificando unicamente el campo 
export const crearProductosAction = (productosData) => async (dispatch) => {
    dispatch({
        type: LOADING
    })
    try {
        const imagenRef = await storage.ref().child('img_productos').child(productosData.imagenurl.name)
        await imagenRef.put(productosData.imagenurl)

        const imagenURL = await imagenRef.getDownloadURL()
        productosData.imagenurl = imagenURL

        await db.collection('productos').doc().set(productosData)

        const data = await db.collection('productos').orderBy('prioridad').get()
        const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data() }))

        dispatch({
            type: SET_PRODUCTO_SUCCESS,
        })
        dispatch({
            type: GET_PRODUCTO_SUCCESS,
            payload: arrayData
        })
        


    } catch (e) {
        dispatch({
            type: ERROR_PRODUCTO
        })
    }
}

//Igual con todo esto 
export const modificarProductosAction = (productosData, id) => async (dispatch) => {
    dispatch({
        type: LOADING
    })
    
    let imagenURL = productosData.imagenurl

    try {
        try {
            const imagenRef = await storage.ref().child('img_noticias').child(productosData.imagenurl.name)
            await imagenRef.put(productosData.imagenurl)
            imagenURL = await imagenRef.getDownloadURL()
        } catch (error) {
            imagenURL = productosData.imagenurl
        }

        await db.collection('productos').doc(id).update({
            nombre: productosData.nombre,
            precio: productosData.precio,
            medida: productosData.medida,
            prioridad: productosData.prioridad,
            categoria: productosData.categoria,
            imagenurl: imagenURL,
        })

        const data = await db.collection('productos').orderBy('prioridad').get()
        const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data() }))

        dispatch({
            type: PUT_PRODUCTO_SUCCESS
        })
        dispatch({
            type: GET_PRODUCTO_SUCCESS,
            payload: arrayData
        })
    } catch (error) {
        dispatch({
            type: ERROR_PRODUCTO
        })
    }
}

//Mejoralo plis
export const eliminarProductosAction = (id) => async (dispatch) => {
    dispatch({
        type: LOADING
    })
    try {

        await db.collection('productos').doc(id).delete()
        
        dispatch({
            type: DELETE_PRODUCTO_SUCCESS
        })
        
        const data = await db.collection('productos').orderBy('prioridad').get()
        const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  
        dispatch({
            type: GET_PRODUCTO_SUCCESS,
            payload: arrayData
        })

        
    } catch (error) {
        console.log(error)
        dispatch({
            type: ERROR_PRODUCTO
        })
    }
} 