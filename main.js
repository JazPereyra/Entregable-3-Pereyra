const productos = [
    {
       id: "bolso-05",
       titulo: "Bolso Matero",
       imagen: "./img/Bolso-05.jpg",
       precio: 1000
    },
    {
        id: "bolso-06",
        titulo: "Bolso",
        imagen: "./img/Bolso-06.jpg",
        precio: 1500
     },
     {
        id: "cartuchera-01",
        titulo: "Cartuchera",
        imagen: "./img/Cartuchera-01.jpg",
        precio: 2000
     },
     {
        id: "set-matero-03",
        titulo: "Set matero",
        imagen: "./img/Set-Matero-03.jpg",
        precio: 3000
     },
];

const contenedorProductos = document.querySelector("#contenedor-productos");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

function cargarProductos() {

    contenedorProductos.innerHTML = "";
    
    productos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto"); 
        div.innerHTML = `
                <div class="contenedor-productos">
                <img class="img-producto" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="productos-detalles">
                    <p class="producto-titulo">${producto.titulo}</p>
                    <small class="producto-precio">Precio: ${producto.precio}</small><br>
                    <button class="producto-agregar" id="${producto.id}">Agregar al carrito</button>
                </div>
                </div>`;

                contenedorProductos.append(div);
                
            
    }) 
    actualizarBotonesAgregar ()
}

function actualizarBotonesAgregar () {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito )
    })
}

cargarProductos(productos)

let productosEnCarrito;
let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");


if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
} else {
    productosEnCarrito = []
}


function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito()

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
};

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}
