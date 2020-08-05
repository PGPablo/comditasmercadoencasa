import React from 'react'
import emailjs from 'emailjs-com';
import Banner from './Banner'
import { withRouter } from "react-router-dom";

import { animateScroll as scroll} from 'react-scroll';


import moment from 'moment'
import 'moment/locale/es'

import './style/thanks.css'
var request = require('request');

const Thanks = (props) => {

    if(!localStorage.getItem('pedido')){
        props.history.push('/home')
        return
    }
    scroll.scrollToTop();

    const pedidoInfo = JSON.parse(localStorage.getItem('pedido'))
    console.log(pedidoInfo)


    var template_params = {
        "nombre": pedidoInfo.nombre,
        "calle": pedidoInfo.calle,
        "colonia": pedidoInfo.colonia,
        "municipio": pedidoInfo.municipio,
        "telefono": pedidoInfo.telefono,
        "pago": pedidoInfo.pago,
        "bolsa": pedidoInfo.bolsa,
        "fecha": moment(pedidoInfo.fecha).format('MMMM Do YYYY'),
        "pedido": pedidoInfo.pedido,
        "total": pedidoInfo.total
     }
     
     emailjs.send('gmail', 'comiditas_pedido', template_params, 'user_E5exgyTLQ2gEUxXpV2Pwz');
    
    const nuevoPedido = (e) => {
        localStorage.removeItem('pedido')
        props.history.push('/home')
    }

    return (
        <div className="columna">
            <Banner />
            <div className="jumbotron fondo_blanco border">
                <h1 className="display-4">
                    ¡Listo!
                    <button className="btn btn-outline-dark float-right"
                        onClick={e => nuevoPedido()}>
                        Realizar un nuevo pedido
                    </button>
                </h1>
                <p className="lead">Tu pedido está hecho</p>
                <hr className="my-4" />
                <p>En instantes nos comunicaremos contigo para coordinar el horario y día de entrega <span role="img" aria-label="emojis">📆</span></p>
            </div>


            <div className="jumbotron pt-0 border">
                <div className="banner_thanks" />
                <p className="lead">Nombre: {pedidoInfo.nombre}.</p>
                <hr className="my-4" />
                <p>Dirección: {pedidoInfo.calle} - {pedidoInfo.colonia} - {pedidoInfo.municipio} </p>
                <p> Celular: {pedidoInfo.telefono} </p>
                <p> Forma de pago: {pedidoInfo.pago} </p>
                <p> Fecha de pedido: { moment(pedidoInfo.fecha).format('MMMM Do YYYY') } </p>
                <h3 className="text-center" >Información del pedido </h3>
                <hr />
                <h6>Productos</h6>

                {
                    pedidoInfo.pedido.map(row => {
                        return (
                            <div key={row}>
                                <label htmlFor=".."> {row} </label> <br />
                            </div>
                            
                        )
                    })
                }

                <hr />
                <p className=" inline float-right " >Total: $ {((pedidoInfo.total * 100) / 100).toFixed(2)}</p>
                <br/> <br/>
                <button className="btn btn-outline-dark float-right"
                    onClick={e => nuevoPedido()}>
                    Realizar un nuevo pedido
                </button>
            </div>

        </div>
    )
}

export default withRouter(Thanks)
