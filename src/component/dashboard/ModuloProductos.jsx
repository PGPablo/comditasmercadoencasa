import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { obtenerProductosAction } from '../../redux/ProductsDucks'

import SpaIcon from '@material-ui/icons/Spa';
import AppleIcon from '@material-ui/icons/Apple';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import AllInboxIcon from '@material-ui/icons/AllInbox';

import ModalProducto from './ModalProducto'

import './style.css'

const ModuloProductos = () => {
    const dispatch = useDispatch()
    const productos = useSelector(store => store.productos.listaProductos)
    const loading = useSelector(store => store.productos.loading)


    const [modal, setModal] = React.useState(false)
    const [producto, setProducto] = React.useState(null)
    const [filtro, setFiltro] = React.useState('Todo')

    React.useEffect(() => {
        const fetchData = () => {
            dispatch(obtenerProductosAction())
        }
        fetchData()
    }, [dispatch])


    const activarModal = (producto) => {
        setProducto(producto)
        setModal(true)
    }

    const desactivarModal = () => {
        setModal(false)
    }

    return !loading ? (
        <div className="border">
            <h1>
                Tabla de productos
                <button className="btn btn-success float-left mt-2 ml-5"
                    onClick={() => activarModal()}>
                    Crear producto
                </button>
                <button className="btn btn-danger  ml-2 float-rigth mt-2 ml-5"
                    onClick={() => setFiltro("Todo")}>
                    <AllInboxIcon />
                </button>
                <button className="btn btn-primary float-rigth mt-2 ml-5"
                    onClick={() => setFiltro("Verdura")}>
                    <SpaIcon />
                </button>
                <button className="btn btn-primary float-rigth mt-2 ml-5"
                    onClick={() => setFiltro("Fruta")}>
                    <AppleIcon />
                </button>
                <button className="btn btn-primary float-rigth mt-2 ml-5"
                    onClick={() => setFiltro("Basico")}>
                    <ShoppingBasketIcon />
                </button>

            </h1>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Categoria</th>
                        <th scope="col">Medida</th>
                        <th scope="col">Prioridad</th>
                        <th scope="col">Imagen</th>
                        <th scope="col">Opciones</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        productos ? (productos.map((row) => {
                            if (filtro === 'Todo') {
                                return (
                                    <tr key={row.id}>
                                        <th> {row.nombre} </th>
                                        <td> ${row.precio} </td>
                                        <th> {row.categoria} </th>
                                        <th> {row.medida} </th>
                                        <th> {row.prioridad} </th>
                                        <td> <img src={row.imagenurl} alt="..." className="estilo_imagen_producto_panel" /> </td>
                                        <td>
                                            <button className="btn btn-warning"
                                                onClick={() => activarModal(row)}>
                                                Modificar
                                                </button>
                                        </td>
                                    </tr>
                                )
                            } else {
                                if (filtro === row.categoria) {
                                    return(
                                        <tr key={row.id}>
                                            <th> {row.nombre} </th>
                                            <td> ${row.precio} - 1kg</td>
                                            <th> {row.categoria} </th>
                                            <th> {row.medida} </th>
                                            <th> {row.prioridad} </th>
                                            <td> <img src={row.imagenurl} alt="..." className="estilo_imagen_producto_panel" /> </td>
                                            <td>
                                                <button className="btn btn-warning"
                                                    onClick={() => activarModal(row)}>
                                                    Modificar
                                                    </button>
                                            </td>
                                        </tr>
                                    )
                                } 
                            }
                        })) : null
                    }

                </tbody>
            </table>

            {modal && <ModalProducto
                producto={producto}
                onClose={() => desactivarModal()} />}

        </div>
    ) : (
            <div className="container border m-5 text-center">
                <div className="spinner-grow text-danger m-5" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )
}

export default ModuloProductos
