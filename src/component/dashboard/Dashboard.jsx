import React from 'react'
import { withRouter } from 'react-router'
import {useDispatch} from 'react-redux'
import ModuloProductos from './ModuloProductos'
import ModuloPedidos from './ModuloPedidos'
import Banner from '../Banner'

import {cerrarSesionAccion} from '../../redux/UserDucks'

import './style.css'

const Dashboard = (props) => {
    const dispatch = useDispatch()

    const [mod, setMod] = React.useState('pedidos')    

    const cerrarSesion = () => {
        dispatch(cerrarSesionAccion())
        props.history.push('/login')
    }

    return (
        <div className="">
            <div className="row h-100">
                <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3 text-center estilo_dashboard_panel ">
                    <div className="mt-5 mb-5 sticky-top">
                        <h3>Panel de control</h3> <hr />
                        <button className="btn btn-light mt-3 ml-2 w-100"
                                onClick={() => setMod('productos')}>
                            Productos
                        </button> <br />
                        <button className="btn btn-light mt-3 ml-2 w-100"
                                onClick={() => setMod('pedidos')}>
                            Pedidos
                        </button> <br />
                        <button className="btn btn-danger mt-3 ml-2 w-100"
                                onClick={() => cerrarSesion()}>
                            Cerrar sesion
                        </button>
                    </div>
                </div>

                <div className="col-sm-12 col-md-9 col-lg-9 col-xl-9 text-center estilo_dashboard_contenido ">
                    <div className="estilo_banner_panel">
                        <Banner />
                    </div>
                    {
                        mod === 'productos' ? 
                        <ModuloProductos /> :
                        null
                    }
                    {
                        mod === 'pedidos' ? 
                        <ModuloPedidos /> :
                        null
                    }
                    
                </div>
            </div>
        </div>
    )
}

export default withRouter(Dashboard)
