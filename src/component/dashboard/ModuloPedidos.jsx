import React from 'react'
import {useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import 'moment/locale/es'

import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

import {eliminarPedidoAction} from '../../redux/OrdersDucks'

const ModuloPedidos = () => {
    const dispatch = useDispatch()
    const ordenes = useSelector(store => store.ordenes.listaPedidos)

    return (
        <div className="border">
            <h1 className="text-center">
                Tabla de pedidos
            </h1>
            <div className="row my-4 mx-1">
                {
                    ordenes ? (ordenes.map((row) => {
                        return (
                            <div className="col-sm-12 col-md-6 col-lg-4 col-xl-4 my-4">
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="card-title">
                                            {row.nombre}
                                            <button className="btn btn-danger float-rigth mt-2 ml-5"
                                                onClick={() => dispatch(eliminarPedidoAction(row.id))}>
                                                <DeleteOutlineIcon />
                                            </button>
                                            
                                        </h4>
                                        <h5 className="card-title">{row.telefono} - {moment(row.fecha).format('MMMM Do YYYY')}</h5>
                                        <p className="card-text">{row.municipio} - {row.colonia} - {row.calle}</p>
                                        <p className="card-text">Bolsa: {row.bolsa} </p>
                                    </div> <hr />
                                    <p>
                                        {
                                            row.pedido.map(elemento => {
                                                return (
                                                    <p htmlFor="...">{elemento}</p>
                                                )
                                            })
                                        }
                                    </p>

                                    <h4>
                                        Total a pagar: {row.total}
                                    </h4>
                                </div>
                            </div>
                        )
                    })) : null
                }
            </div>
        </div>
    )
}

export default ModuloPedidos
