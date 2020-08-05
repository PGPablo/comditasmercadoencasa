import React from 'react'
import { useDispatch } from 'react-redux'
import './style/formbag.css'

import { useSelector } from 'react-redux'

import Banner from './Banner'
import Footer from './Footer'
import Instructions from './Instructions'

import { scroller } from 'react-scroll';

import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';

import { crearPedidosAction } from '../redux/OrdersDucks'

import { withRouter } from "react-router-dom";


const FormBag = (props) => {
    if (localStorage.getItem('pedido')) {
        props.history.push('/success')
    }
    const dispatch = useDispatch()
    const [formulario, setformulario] = React.useState(false)
    const [modalPedido, setModalPedido] = React.useState(false)
    const [nombre, setNombre] = React.useState('')
    const [telefono, setTelefono] = React.useState('')
    const [municipio, setMunicipio] = React.useState('')
    const [colonia, setColonia] = React.useState('')
    const [calle, setCalle] = React.useState('')
    const [bolsa, setBolsa] = React.useState('No, gracias')
    const [pago, setPago] = React.useState('')
    const [pedido, setPedido] = React.useState({})
    const [arrPedido, setArrPedido] = React.useState([])
    const [ticket, setTicket] = React.useState({})
    const [total, setTotal] = React.useState('0.00')
    const [error, setError] = React.useState('')

    const productos = useSelector(store => store.productos.listaProductos)

    const llenarPedido = (nombre, valor, precio, medida) => {
        let precioFinal = ""
        if (medida === "g") {
            precioFinal = parseFloat(Math.round(((precio * valor) / 100) * 100) / 100).toFixed(2)
        } else {
            precioFinal = parseFloat(Math.round((precio * valor) * 100) / 100).toFixed(2)
        }

        const valorCantidad = `${nombre} - ${valor} ${medida} - $ ${precioFinal}`

        setPedido({
            ...pedido,
            [nombre]: precioFinal
        })

        setTicket({
            ...ticket,
            [nombre]: valorCantidad
        })
    }

    const cargarPedido = (e) => {
        e.preventDefault()
        setError('')

        let arreglo = []
        for (let key in ticket) {
            if (pedido[key] === "0.00") {

            } else {
                arreglo.push(ticket[key])
            }
        }

        if (!nombre.trim() || !telefono.trim() || !municipio.trim() || !colonia.trim() || !calle.trim() || !pago.trim()) {
            setError('Alguno de los campos esta vacio')
            return
        }
        if (total === "0.00") {
            setError('El pedido no tiene productos')
            return
        }

        const pedidoData = {
            nombre: nombre,
            telefono: telefono,
            fecha: Date.now(),
            municipio: municipio,
            colonia: colonia,
            calle: calle,
            bolsa: bolsa,
            pago: pago,
            pedido: arreglo,
            total: total,
        }
        dispatch(crearPedidosAction(pedidoData))
        setError('')

        localStorage.setItem('pedido', JSON.stringify(pedidoData))
        props.history.push('/success')

    }

    const cargarModal = (e) => {
        e.preventDefault()
        let arreglo = []
        let sumaTotal = 0

        for (let key in ticket) {
            if (pedido[key] === "0.00") {

            } else {
                arreglo.push(ticket[key])
            }
        }

        for (let key in pedido) {
            sumaTotal = sumaTotal + parseFloat(pedido[key])
        }

        setArrPedido(arreglo)
        setTotal(sumaTotal)

        setModalPedido(!modalPedido)
    }

    const activarUsuarioForm = (e) => {

        let sumaTotal = 0
        for (let key in pedido) {
            sumaTotal = sumaTotal + parseFloat(pedido[key])
        }
        setTotal(sumaTotal)

        setformulario(true)
        scroller.scrollTo("scroll_pedido");

    }

    const desactivarUsuarioForm = () => {

        setformulario(false)
        scroller.scrollTo("scroll_banner");

    }


    return (
        <div>
            <button className="btn boton_flotante"
                onClick={e => cargarModal(e)}>
                Carrito <span role="img" aria-label="emojis">🛒</span>
            </button>

            <div className="columna">
                <Banner />
                <Instructions />
                {
                    !formulario ?
                        (
                            <div className="pedido">


                                <div className="border contenedor_seccion mt-4 mb-4 verduras">
                                    <div className="linea_amarillo" />
                                    <div className="m-3 formbag_imagen_paquetes" />

                                    <div className="row mb-2 w-100">
                                        {
                                            productos ? productos.map(row => {
                                                if (row.categoria === 'Paquete') {

                                                    return (
                                                        <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 mb-4 mt-4 text-center W-100 p-0"
                                                            key={row.id}>
                                                            <div className="contenedor_imagen" >
                                                                <img src={row.imagenurl}
                                                                    alt="..." className="imagen_paquete" />


                                                            </div>
                                                            <div className="contenedor_info">
                                                                <label className="mt-4" htmlFor="verduras">
                                                                    {row.nombre} - $ {row.precio}
                                                                </label> <br />
                                                                {
                                                                    row.medida === "Pieza" ? (
                                                                        <select id="inputState"
                                                                            className="form-control btn border w-100 float-right mr-2 mt-.3"
                                                                            onChange={e => llenarPedido(row.nombre, e.target.value, row.precio, "pza")}>
                                                                            <option value={0}> Agregar al carrito </option>

                                                                            <option value={1}>1 paquete </option>
                                                                            <option value={2}>2 paquete </option>
                                                                            <option value={3}>3 paquete </option>
                                                                            <option value={4}>4 paquete </option>
                                                                            <option value={5}>5 paquete </option>


                                                                            <option value={0} className="texto_rojo float-right"> Quitar del pedido </option>
                                                                        </select>
                                                                    ) : null
                                                                }
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            }) : null
                                        }
                                    </div>

                                </div>





                                <div className="border contenedor_seccion mt-4 mb-4 verduras">
                                    <div className="linea_verde" />
                                    <div className="m-3 formbag_imagen_verduras" />


                                    <div className="row mb-2 w-100">
                                        {
                                            productos ? productos.map(row => {
                                                if (row.categoria === 'Verdura') {

                                                    return (
                                                        <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 mb-4 mt-4 text-center W-100 p-0"
                                                            key={row.id}>
                                                            <div className="contenedor_imagen" >
                                                                <img src={row.imagenurl}
                                                                    alt="..." className="imagen_producto" />


                                                            </div>
                                                            <div className="contenedor_info">
                                                                <label className="mt-4" htmlFor="verduras">
                                                                    {row.nombre} - {row.medida === "Gramos" ? (100) : (1)} {row.medida}: $ {row.precio}
                                                                </label> <br />
                                                                {
                                                                    row.medida === "Kilo" ? (
                                                                        <select id="inputState"
                                                                            className="form-control btn border w-100 float-right mr-2 mt-.3"
                                                                            onChange={e => llenarPedido(row.nombre, e.target.value, row.precio, "kg")}>
                                                                            <option value={0}> Seleccione cantidad </option>

                                                                            <option value={.250}>250g - $ {parseFloat(Math.round((row.precio * 0.25) * 100) / 100).toFixed(2)}</option>
                                                                            <option value={.500}>500g - $ {parseFloat(Math.round((row.precio * 0.50) * 100) / 100).toFixed(2)}</option>
                                                                            <option value={1.00}>1kg - $ {parseFloat(Math.round((row.precio * 1) * 100) / 100).toFixed(2)}</option>
                                                                            <option value={2.00}>2kg - $ {parseFloat(Math.round((row.precio * 2) * 100) / 100).toFixed(2)}</option>

                                                                            <option value={0} className="texto_rojo float-right"> Quitar del pedido </option>
                                                                        </select>
                                                                    ) : null
                                                                }
                                                                {
                                                                    row.medida === "Pieza" ? (
                                                                        <select id="inputState"
                                                                            className="form-control btn border w-100 float-right mr-2 mt-.3"
                                                                            onChange={e => llenarPedido(row.nombre, e.target.value, row.precio, "pza")}>
                                                                            <option value={0}> Seleccione cantidad </option>

                                                                            <option value={1}>1 pieza - $ {parseFloat(Math.round((row.precio * 1) * 100) / 100).toFixed(2)} </option>
                                                                            <option value={2}>2 piezas - $ {parseFloat(Math.round((row.precio * 2) * 100) / 100).toFixed(2)}</option>
                                                                            <option value={3}>3 piezas - $ {parseFloat(Math.round((row.precio * 3) * 100) / 100).toFixed(2)}</option>
                                                                            <option value={4}>4 piezas - $ {parseFloat(Math.round((row.precio * 4) * 100) / 100).toFixed(2)}</option>
                                                                            <option value={5}>5 piezas - $ {parseFloat(Math.round((row.precio * 5) * 100) / 100).toFixed(2)}</option>
                                                                            <option value={6}>6 piezas - $ {parseFloat(Math.round((row.precio * 6) * 100) / 100).toFixed(2)}</option>
                                                                            <option value={7}>7 piezas - $ {parseFloat(Math.round((row.precio * 7) * 100) / 100).toFixed(2)}</option>
                                                                            <option value={8}>8 piezas - $ {parseFloat(Math.round((row.precio * 8) * 100) / 100).toFixed(2)}</option>
                                                                            <option value={9}>9 piezas - $ {parseFloat(Math.round((row.precio * 9) * 100) / 100).toFixed(2)}</option>
                                                                            <option value={10}>10 piezas - $ {parseFloat(Math.round((row.precio * 10) * 100) / 100).toFixed(2)}</option>

                                                                            <option value={0} className="texto_rojo float-right"> Quitar del pedido </option>
                                                                        </select>
                                                                    ) : null
                                                                }
                                                                {
                                                                    row.medida === "Gramos" ? (
                                                                        <select id="inputState"
                                                                            className="form-control btn border w-100 float-right mr-2 mt-.3"
                                                                            onChange={e => llenarPedido(row.nombre, e.target.value, row.precio, "g")}>
                                                                            <option value={0}> Seleccione cantidad </option>

                                                                            <option value={100}>100g - $ {parseFloat(Math.round((row.precio * 1) * 100) / 100).toFixed(2)}</option>
                                                                            <option value={200}>200g - $ {parseFloat(Math.round((row.precio * 2) * 100) / 100).toFixed(2)}</option>
                                                                            <option value={300}>300g - $ {parseFloat(Math.round((row.precio * 3) * 100) / 100).toFixed(2)}</option>
                                                                            <option value={500}>500g - $ {parseFloat(Math.round((row.precio * 5) * 100) / 100).toFixed(2)}</option>
                                                                            <option value={1000}>1kg - $ {parseFloat(Math.round((row.precio * 10) * 100) / 100).toFixed(2)}</option>

                                                                            <option value={0} className="texto_rojo float-right"> Quitar del pedido </option>
                                                                        </select>
                                                                    ) : null
                                                                }
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            }) : null
                                        }
                                    </div>

                                </div>

                                <div className="border contenedor_seccion mt-4 mb-4 frutas">
                                    <div className="linea_roja" />
                                    <div className="m-3 formbag_imagen_frutas" />


                                    <div className="row mb-2 w-100">
                                        {
                                            productos ? productos.map(row => {
                                                if (row.categoria === 'Fruta') {
                                                    return (
                                                        <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 mb-4 mt-4 text-center W-100 p-0"
                                                            key={row.id}>
                                                            <div className="contenedor_imagen" >
                                                                <img src={row.imagenurl}
                                                                    alt="..." className="imagen_producto" />


                                                            </div>
                                                            <div className="contenedor_info">
                                                                <label className="mt-4" htmlFor="verduras">
                                                                    {row.nombre} - 1 {row.medida}: $ {row.precio}
                                                                </label> <br />
                                                                {
                                                                    row.medida === "Kilo" ? (
                                                                        <select id="inputState"
                                                                            className="form-control btn border w-100 float-right mr-2 mt-.3"
                                                                            onChange={e => llenarPedido(row.nombre, e.target.value, row.precio, "kg")}>
                                                                            <option value={0}> Seleccione cantidad </option>

                                                                            <option value={.250}>250g - $ {parseFloat(Math.round((row.precio * 0.25) * 100) / 100).toFixed(2)}</option>
                                                                            <option value={.500}>500g - $ {parseFloat(Math.round((row.precio * 0.50) * 100) / 100).toFixed(2)}</option>
                                                                            <option value={1.00}>1kg - $ {parseFloat(Math.round((row.precio * 1) * 100) / 100).toFixed(2)}</option>
                                                                            <option value={2.00}>2kg - $ {parseFloat(Math.round((row.precio * 2) * 100) / 100).toFixed(2)}</option>

                                                                            <option value={0} className="texto_rojo float-right"> Quitar del pedido </option>
                                                                        </select>
                                                                    ) : (
                                                                            <select id="inputState"
                                                                                className="form-control btn border w-100 float-right mr-2 mt-.3"
                                                                                onChange={e => llenarPedido(row.nombre, e.target.value, row.precio, "pza")}>
                                                                                <option value={0}> Seleccione cantidad </option>

                                                                                <option value={1}>1 pieza - $ {parseFloat(Math.round((row.precio * 1) * 100) / 100).toFixed(2)} </option>
                                                                                <option value={2}>2 piezas - $ {parseFloat(Math.round((row.precio * 2) * 100) / 100).toFixed(2)}</option>
                                                                                <option value={3}>3 piezas - $ {parseFloat(Math.round((row.precio * 3) * 100) / 100).toFixed(2)}</option>
                                                                                <option value={4}>4 piezas - $ {parseFloat(Math.round((row.precio * 4) * 100) / 100).toFixed(2)}</option>
                                                                                <option value={5}>5 piezas - $ {parseFloat(Math.round((row.precio * 5) * 100) / 100).toFixed(2)}</option>
                                                                                <option value={6}>6 piezas - $ {parseFloat(Math.round((row.precio * 6) * 100) / 100).toFixed(2)}</option>
                                                                                <option value={7}>7 piezas - $ {parseFloat(Math.round((row.precio * 7) * 100) / 100).toFixed(2)}</option>
                                                                                <option value={8}>8 piezas - $ {parseFloat(Math.round((row.precio * 8) * 100) / 100).toFixed(2)}</option>
                                                                                <option value={9}>9 piezas - $ {parseFloat(Math.round((row.precio * 9) * 100) / 100).toFixed(2)}</option>
                                                                                <option value={10}>10 piezas - $ {parseFloat(Math.round((row.precio * 10) * 100) / 100).toFixed(2)}</option>

                                                                                <option value={0} className="texto_rojo float-right"> Quitar del pedido </option>
                                                                            </select>
                                                                        )
                                                                }
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            }) : null
                                        }
                                    </div>

                                </div>

                                <div className="border contenedor_seccion mt-4 mb-4 basicos">
                                    <div className="linea_cafe" />
                                    <div className="m-3 formbag_imagen_basicos" />


                                    <div className="row mb-2 w-100">
                                        {/* Aqui empiezan los productos */}

                                        {
                                            productos ? productos.map(row => {
                                                if (row.categoria === 'Basico') {
                                                    return (
                                                        <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 mb-4 mt-4 text-center W-100 p-0"
                                                            key={row.id}>
                                                            <div className="contenedor_imagen" >
                                                                <img src={row.imagenurl}
                                                                    alt="..." className="imagen_producto" />


                                                            </div>
                                                            <div className="contenedor_info">
                                                                <label className="mt-4" htmlFor="verduras">
                                                                    {row.nombre} - 1 {row.medida}: $ {row.precio}
                                                                </label> <br />
                                                                {
                                                                    row.medida === "Kilo" ? (
                                                                        <select id="inputState"
                                                                            className="form-control btn border w-100 float-right mr-2 mt-.3"
                                                                            onChange={e => llenarPedido(row.nombre, e.target.value, row.precio, "kg")}>
                                                                            <option value={0}> Seleccione cantidad </option>

                                                                            <option value={.250}>250g - $ {parseFloat(Math.round((row.precio * 0.25) * 100) / 100).toFixed(2)}</option>
                                                                            <option value={.500}>500g - $ {parseFloat(Math.round((row.precio * 0.50) * 100) / 100).toFixed(2)}</option>
                                                                            <option value={1.00}>1kg - $ {parseFloat(Math.round((row.precio * 1) * 100) / 100).toFixed(2)}</option>
                                                                            <option value={2.00}>2kg - $ {parseFloat(Math.round((row.precio * 2) * 100) / 100).toFixed(2)}</option>

                                                                            <option value={0} className="texto_rojo float-right"> Quitar del pedido </option>
                                                                        </select>
                                                                    ) : (
                                                                            <select id="inputState"
                                                                                className="form-control btn border w-100 float-right mr-2 mt-.3"
                                                                                onChange={e => llenarPedido(row.nombre, e.target.value, row.precio, "pza")}>
                                                                                <option value={0}> Seleccione cantidad </option>

                                                                                <option value={1}>1 pieza - $ {parseFloat(Math.round((row.precio * 1) * 100) / 100).toFixed(2)} </option>
                                                                                <option value={2}>2 piezas - $ {parseFloat(Math.round((row.precio * 2) * 100) / 100).toFixed(2)}</option>
                                                                                <option value={3}>3 piezas - $ {parseFloat(Math.round((row.precio * 3) * 100) / 100).toFixed(2)}</option>
                                                                                <option value={4}>4 piezas - $ {parseFloat(Math.round((row.precio * 4) * 100) / 100).toFixed(2)}</option>
                                                                                <option value={5}>5 piezas - $ {parseFloat(Math.round((row.precio * 5) * 100) / 100).toFixed(2)}</option>
                                                                                <option value={6}>6 piezas - $ {parseFloat(Math.round((row.precio * 6) * 100) / 100).toFixed(2)}</option>
                                                                                <option value={7}>7 piezas - $ {parseFloat(Math.round((row.precio * 7) * 100) / 100).toFixed(2)}</option>
                                                                                <option value={8}>8 piezas - $ {parseFloat(Math.round((row.precio * 8) * 100) / 100).toFixed(2)}</option>
                                                                                <option value={9}>9 piezas - $ {parseFloat(Math.round((row.precio * 9) * 100) / 100).toFixed(2)}</option>
                                                                                <option value={10}>10 piezas - $ {parseFloat(Math.round((row.precio * 10) * 100) / 100).toFixed(2)}</option>

                                                                                <option value={0} className="texto_rojo float-right"> Quitar del pedido </option>
                                                                            </select>
                                                                        )
                                                                }
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            }) : null
                                        }



                                    </div>

                                </div>

                            </div>
                        ) :
                        (
                            <div className="usuario" >

                                <div className="border contenedor_seccion mt-4 mb-4 basicos">
                                    <div className="linea_azul" />

                                    <div className="m-4">
                                        <div className="form-row">
                                            <div className="form-group col-12">
                                                <label htmlFor="inputEmail4">Nombre completo</label>
                                                <input type="text" className="form-control" id="nombre" value={nombre}
                                                    onChange={e => setNombre(e.target.value)} />
                                            </div>
                                            <div className="form-group col-12">
                                                <div className="m-4">
                                                    <label className="mb-4">¿Quiéres bolsa para tus productos?</label> <br />
                                                    <div className="custom-control custom-radio custom-control-inline">
                                                        <input type="radio" id="bolsa_si" name="bolsa" className="custom-control-input"
                                                            onClick={() => setBolsa('Si, porfavor')} />
                                                        <label className="custom-control-label" htmlFor="bolsa_si">Si, porfavor</label>
                                                    </div>
                                                    <div className="custom-control custom-radio custom-control-inline">
                                                        <input type="radio" id="bolsa_no" name="bolsa" className="custom-control-input"
                                                            onClick={() => setBolsa('No, gracias')} defaultChecked />
                                                        <label className="custom-control-label" htmlFor="bolsa_no">No, gracias</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group col-12">
                                                <label htmlFor="inputPassword4">Telefono celular</label>
                                                <input type="text" className="form-control" id="telefono" value={telefono}
                                                    onChange={e => setTelefono(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-6">
                                                <label htmlFor="inputState">Municipio</label>
                                                <select id="municipio" className="form-control"
                                                    onClick={e => setMunicipio(e.target.value)}>
                                                    <option>Seleccione su ciudad</option>
                                                    <option value='Celaya'>Celaya</option>
                                                    <option calue='Apaseo'>Apaseo el Grande</option>

                                                </select>
                                            </div>
                                            <div className="form-group col-6">
                                                <label htmlFor="inputAddress">Colonia</label>
                                                <input type="text" className="form-control" id="colonia"
                                                    value={colonia}
                                                    onChange={e => setColonia(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="inputEmail4">Calle (con número y exterior si existe)</label>
                                            <input type="text" className="form-control" id="calle"
                                                value={calle}
                                                onChange={e => setCalle(e.target.value)} />
                                        </div>

                                        <hr className="mt-3 mb-3" />

                                        <div className="form-group">
                                            <label htmlFor="inputState">Forma de pago</label>
                                            <select id="formaPago" className="form-control"
                                                onClick={e => setPago(e.target.value)}>
                                                <option>Seleccione alguna forma de pago</option>
                                                <option value="Efectivo" >Efectivo</option>
                                                <option value="Trasferencia" >Trasferencia</option>
                                                <option value="CoDi">CoDi</option>
                                            </select>
                                        </div>
                                        {
                                            error !== "" &&
                                            <div className="alert alert-warning mt-3">
                                                {error}
                                            </div>
                                        }
                                    </div>
                                </div>

                            </div>
                        )
                }


                {/* Botones de procesos */}
                {
                    !formulario ?
                        (
                            <div className="border contenedor_seccion mt-4 mb-4 basicos">
                                <button className="btn btn-lg w-100 estilo_boton_pedido"
                                    onClick={() => activarUsuarioForm()}>
                                    Realizar mi pedido
                             </button>
                            </div>
                        ) :
                        (
                            <div className="">
                                <div className="border contenedor_seccion mt-4 mb-4 basicos text-center">
                                    <button className="btn m-2 mt-4 mb-4 btn-warning"
                                        onClick={(e) => desactivarUsuarioForm()}>
                                        Regresar
                                </button>
                                    <button className="btn m-2 mt-4 mb-4 btn-success"
                                        onClick={e => cargarPedido(e)}>
                                        Terminar pedido
                                </button>
                                </div>
                            </div>
                        )
                }


                <Footer />
            </div>

            {
                modalPedido ? (
                    <div className="modalContainer">
                        <div className="modalBox">
                            <h3 className="text-center" >Información del pedido </h3>
                            <hr />
                            <h6>Productos</h6>
                            <div className="estilo_productos_carrito">
                                {
                                    arrPedido.length > 0 ? (
                                        arrPedido.map(row => {
                                            return (
                                                <p key={row} htmlFor=".."> {row} </p>
                                            )
                                        })
                                    ) : (
                                            <label htmlFor="...">Aun no hay productos seleccionados, elije algunos del catalogo</label>
                                        )
                                }
                            </div>
                            <hr />
                            <p className=" inline float-right " >Total: $ {((total * 100) / 100).toFixed(2)}</p>
                            <button className="btn btn-outline-dark float-right"
                                onClick={e => setModalPedido(!modalPedido)}>
                                Salir
                            </button>
                        </div>
                    </div>
                ) : null
            }
        </div>
    )
}

export default withRouter(FormBag)  