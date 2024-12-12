let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
let botonesEliminar = document.querySelectorAll(".producto-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonSWAL = document.getElementById("btnSWAL");



function cargarProductosCarrito() {
    if (productosEnCarrito) {

        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");

        contenedorCarritoProductos.innerHTML = "";

        productosEnCarrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                    <img class="img-producto" src="${producto.imagen}" alt="">
                    <div class="productos-detalles">
                        <div>
                            <p class="producto-titulo">${producto.titulo}</p>
                        </div>
                        <div class="producto-precio-container">
                            <small class="producto-precio">Precio: ${producto.precio}</small><br>
                        </div>
                        <div class="producto-total">
                            <p>Total:</p>
                            <p class="precio-total" id="total">${producto.precio * producto.cantidad}</p><br>
                        </div>
                        <button class="producto-eliminar" id="${producto.id}">Borrar del carrito</button>
                    </div>`;

            contenedorCarritoProductos.append(div);


        })
    }

    actualizarBotonesEliminar();
    actualizarTotal ()

}

cargarProductosCarrito();


function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".producto-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito)
    })
}

function eliminarDelCarrito (e) {
    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
    productosEnCarrito.splice(index,1);
    cargarProductosCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito))
    
}


botonVaciar.addEventListener("click", vaciarCarrito);

function vaciarCarrito () {
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito))
    cargarProductosCarrito();
}

function actualizarTotal () {
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText =  `$${totalCalculado}`;
}



botonSWAL.addEventListener("click", () => {
    Swal.fire({
        title: "¡Compra exitosa!",
        text: "Vuelva pronto",
        icon: "success"
      });
})