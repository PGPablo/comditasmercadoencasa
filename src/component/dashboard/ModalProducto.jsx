import React from 'react'
import ReactDOM from 'react-dom'
import { useDispatch } from 'react-redux'

import { crearProductosAction, modificarProductosAction, eliminarProductosAction } from '../../redux/ProductsDucks'

import './style.css'


const ModalProducto = (props) => {
    const dispatch = useDispatch()

    const [nombre, setNombre] = React.useState("")
    const [precio, setPrecio] = React.useState("")
    const [categoria, setCategoria] = React.useState("")
    const [medida, setMedida] = React.useState("")
    const [prioridad, setPrioridad] = React.useState("")
    const [imagen, setImagen] = React.useState("")
    const [accion, setAccion] = React.useState("")
    const [error, setError] = React.useState("")


    React.useEffect(() => {
        if (props.producto) {
            setAccion('actualizar')
            setNombre(props.producto.nombre)
            setPrecio(props.producto.precio)
            setCategoria(props.producto.categoria)
            setMedida(props.producto.medida)
            setPrioridad(props.producto.prioridad)
            setImagen(props.producto.imagenurl)
        } else {

        }
    }, [props])

    const accionFormProductos = (cerrarModal) => {
        if (!nombre.trim() || !precio.trim() || !categoria.trim() || !medida.trim() || !prioridad.trim() ) {
            setError('Alguno de los campos esta vacio')
            return
        }
        if (imagen === "") {
            setError('Seleccione una imagen, de preferencia con formato jpg o png')
            return
        }

        const productoData = {
            nombre: nombre,
            precio: precio,
            categoria: categoria,
            medida: medida,
            prioridad: prioridad,
            imagenurl: imagen,
        }
        if (accion === 'actualizar') {
            dispatch(modificarProductosAction(productoData, props.producto.id))
            setError("")
            cerrarModal()
        } else {
            dispatch(crearProductosAction(productoData))
            setError("")
            cerrarModal()
        }
    }
    const eliminarProducto = (cerrarModal) => {
        dispatch(eliminarProductosAction(props.producto.id))
        setError("")
        cerrarModal()
    }

    const nodo = (
        <div className="modalContainer">
            <div className="modalBox">
                <h4>
                    {
                        accion === 'actualizar' ? 'Modificar noticia' : 'Crear noticia'
                    }
                </h4>
                {
                    error !== "" &&
                    <div className="alert alert-warning mt-3">
                        {error}
                    </div>
                }
                <div className="form-group form-row">
                    <div className="col">
                        <input type="text"
                            className="form-control"
                            id="nombre_producto"
                            placeholder="Nombre"
                            value={nombre}
                            onChange={e => setNombre(e.target.value)} />
                    </div>
                    <div className="col">
                        <input type="number"
                            className="form-control"
                            id="precio_producto"
                            placeholder="Precio"
                            value={precio}
                            onChange={e => setPrecio(e.target.value)} />
                    </div>
                </div>
                <div className="form-group form-row" >
                    <div className="col">
                        <label htmlFor="select_categoria_producto">Categoria</label>
                        <select className="form-control" 
                                id="select_categoria_producto"
                                onClick={e => setCategoria(e.target.value)}>
                            <option value={categoria}>{categoria}</option>
                            <option value="Paquete">Paquete</option>
                            <option value="Fruta">Fruta</option>
                            <option value="Verdura">Verdura</option>
                            <option value="Basico">Basicos</option>
                        </select>
                    </div>
                    <div className="col">
                        <label htmlFor="select_medida_producto">Medida</label>
                        <select className="form-control" 
                                id="select_categoria_producto"
                                onClick={e => setMedida(e.target.value)}>
                            <option value={medida}>{medida}</option>
                            <option value="Pieza">Pieza</option>
                            <option value="Kilo">Kilo</option>
                            <option value="Gramos">Gramos</option>
                        </select>
                    </div>
                    <div className="col">
                        <label htmlFor="select_medida_producto">Prioridad</label>
                        <input type="number"
                            className="form-control"
                            id="prioridad_producto"
                            placeholder="Prioridad"
                            value={prioridad}
                            onChange={e => setPrioridad(e.target.value)} />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="imagenurl_input">Imagen</label>
                    {
                        accion === 'actualizar' && <div>
                            <img src={imagen} alt="..." className="imagen_modal" />
                            <br />
                        </div>
                    }
                    <input type="file"
                        className="form-control-file"
                        id="imagenurl_producto"
                        onChange={e => setImagen(e.target.files[0])} />
                </div>

                <div className="form-group">
                    <button type="submit"
                        className="btn btn-outline-info"
                        onClick={() => accionFormProductos(props.onClose)}>
                        {
                            accion === 'actualizar' ? 'Modificar' : 'Crear'
                        }
                    </button>
                    {
                        accion === 'actualizar' && 
                            <button className="btn btn-outline-danger ml-2 float-right"
                                onClick={() => eliminarProducto(props.onClose)}>
                                Eliminar
                            </button>
                    }
                    <button className="btn btn-outline-dark float-right"
                        onClick={props.onClose}>
                        Salir
                    </button>
                </div>
            </div>
        </div>
    )

    return ReactDOM.createPortal(nodo, document.getElementById("modal-root"))
}

export default ModalProducto