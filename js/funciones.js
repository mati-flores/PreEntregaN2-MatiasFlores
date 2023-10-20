let productos = [
    {id:1, nombre:"Muffin de animales", calorias:302, descripcion:"Muffins con formas de animales sabor limón, rellenos de ganash y dulce de leche.", imagen:"https://truffle-assets.tastemadecontent.net/d24d84df-pxqrocxwsjcc_4oolfidnnqwyykmog2iggk_dog-cupcakes_landscapethumbnail_en.png", precio:2300, categoria:"Pasteleria"},
    {id:2, nombre:"Galletas de Nube", calorias:97, descripcion:"Galletas de naranja con forma de nube, cubiertas con azúcar, ideal para eventos infantiles.", imagen:"https://i.pinimg.com/originals/ec/43/98/ec439888e354d25fcf75f1b28f247f3f.jpg", precio:1400, categoria:"Galletas"},
    {id:3, nombre:"Magdalenas Monstruosas", calorias:183, descripcion:"Magdalenas rellenas con chips de chocolate, bañadas en crema de chantilli y sabor limón.", imagen:"https://estaticos-cdn.prensaiberica.es/clip/a98cfea4-d7ca-4b04-8ea0-6084e9eb52c8_16-9-aspect-ratio_default_0.jpg", precio:1950, categoria:"Pasteleria"},
   ];

const guardarProductosLS = (productos) => {
    localStorage.setItem("productos", JSON.stringify(productos));
}

const cargarProductosLS = () => {
    return JSON.parse(localStorage.getItem("productos")) || [];
}

const renderProductos = () => {
    const productos = cargarProductosLS();
    let contenidoHTML = "";

    productos.forEach(producto => {
        contenidoHTML += `
            <div class="col-md-3 col-sm-6 mb-5">
                <div class "card">
                    <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                    <div class="card-body">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <h4 class="card-text">$${producto.precio}</h4>
                        <a href="#" class="btn btn-success" onclick="agregarProductoCarrito(${producto.id})">Agregar al Carro</a>
                    </div>
                </div>
            </div>
        `;
    });

    contenidoHTML = `<div class="row">${contenidoHTML}</div>`;
    document.getElementById("contenido").innerHTML = contenidoHTML;
}

const test = (id) => {
    const carrito = cargarCarritoLS();

    if (estaEnElCarrito(id)) {
        const producto = carrito.find(item => item.id === id);
        producto.cantidad += 1;
    } else {
        const producto = buscarProducto(id);
        producto.cantidad = 1;
        carrito.push(producto);
    }

    guardarCarritoLS(carrito);
    renderBotonCarrito();

    Swal.fire({
        icon: 'success',
        title: 'Producto Agregado al Carro',
        text: 'El producto se ha agregado correctamente al carrito.',
        confirmButtonText: 'Cerrar'
    });
}

const renderCarrito = () => {
    const productos = cargarCarritoLS();
    let contenidoHTML;
    if (cantProductosCarrito() > 0) {
        contenidoHTML = `<table class="table">`;

        productos.forEach(producto => {
            contenidoHTML += `<tr>
                <td><img src="${producto.imagen}" alt="${producto.nombre}" width="32"></td>
                <td class="align-items-center">${producto.nombre}</td>
                <td class="align-items-center">$${producto.precio} <button class="btn btn-warning rounded-circle" onclick="decrementarCantidadProducto(${producto.id})">-</button>${producto.cantidad}<button class="btn btn-warning rounded-circle" onclick="incrementarCantidadProducto(${producto.id})"> + </button></td>
                <td class="align-items-center">$${producto.precio * producto.cantidad}</td>
                <td><img src="../assets/Icon/trash-fill.svg" class="card-img-top" alt="Eliminar" width="24" onclick="eliminarProductoCarrito(${producto.id})"></td>
            </tr>`;
        });

        contenidoHTML += `<tr>
            <td>Total</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td colspan="3" class="text-start"><b>$${sumaProductosCarrito()}</b></td>
            <td>&nbsp;</td>
        </tr>
        </table>`;
    } else {
        contenidoHTML = `<div class="alert alert-warning my-5 text-center" role="alert">
            No hay productos en el carrito
        </div>`;
    }

    document.getElementById("contenido").innerHTML = contenidoHTML;
}

const guardarCarritoLS = (carrito) => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

const cargarCarritoLS = () => {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

const agregarProductoCarrito = (id) => {
    const carrito = cargarCarritoLS();

    if (estaEnElCarrito(id)) {
        const producto = carrito.find(item => item.id === id);
        producto.cantidad += 1;
    } else {
        const producto = buscarProducto(id);
        producto.cantidad = 1;
        carrito.push(producto);
    }

    guardarCarritoLS(carrito);
    renderBotonCarrito();

    Swal.fire({
        icon: 'success',
        title: 'Producto Agregado al Carro',
        text: 'El producto se ha agregado correctamente al carrito.',
        confirmButtonText: 'Cerrar'
    });
}

const eliminarProductoCarrito = (id) => {
    const carrito = cargarCarritoLS();
    const producto = carrito.find(item => item.id === id);

    if (producto.cantidad > 1) {
        producto.cantidad -= 1;
    } else {
        const nuevoCarrito = carrito.filter(item => item.id !== id);
        guardarCarritoLS(nuevoCarrito);
    }

    renderBotonCarrito();
    renderCarrito();

    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'El producto ha sido eliminado del carrito',
        showConfirmButton: false,
        timer: 1500
    });
}

const incrementarCantidadProducto = (id) => {
    const carrito = cargarCarritoLS();
    const producto = carrito.find(item => item.id === id);
    producto.cantidad += 1;
    guardarCarritoLS(carrito);
    renderCarrito();
    renderBotonCarrito();
}

const decrementarCantidadProducto = (id) => {
    const carrito = cargarCarritoLS();
    const producto = carrito.find(item => item.id === id);
    if (producto.cantidad > 1) {
        producto.cantidad -= 1;
        guardarCarritoLS(carrito);
        renderCarrito();
        renderBotonCarrito();
    } else {
        eliminarProductoCarrito(id);
    }
}

const buscarProducto = (id) => {
    const productos = cargarProductosLS();
    let producto = productos.find(item => item.id === id);
    return producto;
}

const estaEnElCarrito = (id) => {
    const productos = cargarCarritoLS();
    return productos.some(item => item.id === id);
}

const cantProductosCarrito = () => {
    const carrito = cargarCarritoLS();
    return carrito.reduce((acumulador, item) => acumulador += item.cantidad, 0);
}

const sumaProductosCarrito = () => {
    const carrito = cargarCarritoLS();
    return carrito.reduce((acumulador, item) => acumulador += item.precio * item.cantidad, 0);
}

const renderBotonCarrito = () => {
    let totalCarrito = document.getElementById("totalCarrito");
    totalCarrito.innerHTML = cantProductosCarrito();
}

// main.js

const renderProductosPasteleria = () => {
    const productosPasteleria = productos.filter(producto => producto.categoria === "Pasteleria");
    
    const contenidoHTML = productosPasteleria.map(producto => `
        <div class="col-md-3 col-sm-6 mb-5">
            <div class="card">
                <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <h4 class="card-text">$${producto.precio}</h4>
                    <a href="#" class="btn btn-success" onclick="agregarProductoCarrito(${producto.id})">Agregar al Carro</a>
                </div>
            </div>
        </div>
    `).join('');

    document.getElementById("productos-pasteleria").innerHTML = `<div class="row">${contenidoHTML}</div>`;
}



const renderProductosGalletas = () => {
    const productosGalletas = productos.filter(producto => producto.categoria === "Galletas");
    
    const contenidoHTML = productosGalletas.map(producto => `
        <div class="col-md-3 col-sm-6 mb-5">
            <div class="card">
                <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <h4 class="card-text">$${producto.precio}</h4>
                    <a href="#" class="btn btn-success" onclick="agregarProductoCarrito(${producto.id})">Agregar al Carro</a>
                </div>
            </div>
        </div>
    `).join('');

    document.getElementById("productos-galletas").innerHTML = `<div class="row">${contenidoHTML}</div>`;
}


