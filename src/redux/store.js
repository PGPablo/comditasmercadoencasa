import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import usuarioReducer, {leerUsuarioActivoAccion} from './UserDucks'
import productoReducer, {obtenerProductosAction} from './ProductsDucks'
import pedidoReducer, {obtenerPedidosAction} from './OrdersDucks'

const rootReducer = combineReducers({
    usuario: usuarioReducer,
    productos: productoReducer,
    ordenes: pedidoReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore(){
    const store = createStore( rootReducer,  composeEnhancers( applyMiddleware(thunk) ))
    obtenerProductosAction()(store.dispatch)
    obtenerPedidosAction()(store.dispatch)
    leerUsuarioActivoAccion()(store.dispatch)

    return store;
}