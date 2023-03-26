$(document).ready(function () {
    // $("#registro").on("click", validaPass);
    $("#form_login").on("submit", function (e){
        e.preventDefault();
        let usuario = $("#usuario").val();
        let password = $("#pass").val();
        validaUsuario(usuario, password);
    })
    $("#form_registro").on("submit", function (e){
        e.preventDefault();
        validaPass();
        // let usuario = $("#usuario").val();
        Swal.fire('Usuario registrado correctamente');
    })

    $('.rounded-pill').html(localStorage.getItem('cant_productos') === null ? 0 : localStorage.getItem('cant_productos'));
    $(".agregar_carrito").on('click', agregaCarritoLocalStorage)

})

let user = "Geral";
let pass = "123";


function validaPass(){
    let val1 = $("#pass").val();
    let val2 = $("#pass2").val();
    if(val1 === val2){
        Swal.fire('Usuario registrado correctamente');
        // $("#form_registro")[0].reset();
    }else{
        Swal.fire('Contraseñas no coinciden, por favor verifique los datos y vuelva a intentarlo!');
    }
}

function validaUsuario(usuario = "", contraseña = ""){
    if (usuario === user && contraseña === pass){
        // $(location).attr('href', "");
        window.location = "./";
        $("#nombre_usuario").text("¡Bienvenida", user, "!")
    }else{
        Swal.fire('Usuario o contraseña incorrecto intente nuevamente');
        $("#form_login")[0].reset();
    }
}


function agregaCarritoLocalStorage() {
    let productos_carrito;
    if(localStorage.getItem('carrito_compra') === null) {
        productos_carrito = [];
    } else {
        productos_carrito = JSON.parse(localStorage.getItem('carrito_compra'));
    }

    let productos_seleccionados = {
        imagen_valida: $('#imagen_valida').val(),
        descripcion: $('#descripcion_producto').text(),
        cantidad_productos_carrito: $('#cantidad_productos_carrito').val(),
        precio: $('#precio span').text().replace('.', '').split('.').join('')

    }
    productos_carrito.push(productos_seleccionados);
    $('.rounded-pill').html(productos_carrito.length);
    localStorage.setItem('cant_productos', productos_carrito.length);
    localStorage.setItem('carrito_compra', JSON.stringify(productos_carrito));
    Swal.fire({
      icon: 'success',
      title: 'El producto se agrego correctamente',
      showConfirmButton: false,
      timer: 1000
    });
}



