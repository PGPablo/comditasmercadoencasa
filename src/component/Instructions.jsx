import React from 'react'

const Instructions = () => {
    return (
        <div>
            <div className="border contenedor_seccion">
                <div className="linea_amarilla" />
                <div className="p-4 ">
                    <h2 htmlFor="..." className="text-center titulo_banner">Arma tu pedido </h2>
                    <p htmlFor="..." className="mb-4 mt-2 text-center contenido_banner">
                        <span role="img" aria-label="emojis">🛒 </span>¡Bienvenido al carrito de compras! <span role="img" aria-label="emojis">🛒 </span>
                        <br />
                        <span role="img" aria-label="emojis">🍅🥕🌽🥑🥔🥬🍉🍎🍋🍌🍐🍈🍇🍓 </span>
                    </p> <br /> 
                    <p className="contenido_banner">
                    1. Identifica los productos que necesitas y selecciona la cantidad. Puedes revisar tu pedido en el botón "Carrito". <span role="img" aria-label="emojis">🛒</span> <br/><br/>

                    2. Cuando hayas terminado, ve a la parte inferior y haz click en "Realizar mi pedido". <span role="img" aria-label="emojis">✅</span> <br/><br/>

                    3. Llena el formulario con tus datos de entrega y oprime "Terminar pedido". <span role="img" aria-label="emojis">📝</span> <br/><br/>

                    4. Nos comunicaremos contigo vía WhatsApp para confirmar tu pedido y agendar el día y hora de entrega. Generalmente entregamos al día siguiente de tu compra. <span role="img" aria-label="emojis">📆</span> <br/><br/>

                    5. El costo de envío es de $25 en Celaya y Apaseo El Grande y no tenemos compra mínima. En compras mayores a $299 el envío es COMPLETAMENTE GRATIS. <span role="img" aria-label="emojis">🚚</span> <br/><br/>

                    6. Nuestros horarios de entrega son de lunes a viernes de 12:00 a 17:00 y los sábados de 12:00 a 15:00. <span role="img" aria-label="emojis">🕛🕔</span> <br/><br/>

                    7. Puedes realizar tu pago por adelantado por transferencia o en el momento de la entrega en efectivo o vía CoDi. <span role="img" aria-label="emojis">💵💳</span> <br/><br/>

                    </p>
                </div>
            </div>
            <div name="scroll_pedido"></div>
        </div>
    )
}

export default Instructions
