$('document').ready(carritoCompra);


function carritoCompra() {
    // console.log(JSON.parse(localStorage.getItem('carrito_compra')));
    let productos_seleccionados = JSON.parse(localStorage.getItem('carrito_compra'));
    $('#limpiar_carrito').on('click', limpiarCarrito)
    crearTableCarrito(productos_seleccionados);
    totalPoductos();
}

function crearTableCarrito(productos_seleccionados = []) {
    let data_table = '';
    productos_seleccionados.forEach((i,o) => {
        data_table += '<tr>';
        data_table += '<th scope="row">\n' +
            ' <div class="card mb-3" style="max-width: 540px;">\n' +
            '  <div class="row g-0">\n' +
            '   <div class="col-md-4">\n' +
            '     <img src="'+i.imagen_valida+'" class="img-fluid rounded-start" alt="...">\n' +
            '   </div>\n' +
            '  <div class="col-md-8">\n' +
            ' <div class="card-body">\n' +
            ' <p class="card-text fs-5">'+i.descripcion+'</p>\n' +
            '  </div>\n' +
            '  </div>\n' +
            '  </div>\n' +
            '  </div>\n' +
            '  </th>';
        data_table += `<td class="text-center fs-5">$${parseInt(i.precio).toLocaleString('es')}</td>`;
        data_table += `<td class="text-center fs-5">
                            <input type="number" class="form-control" value="${i.cantidad_productos_carrito}">
                        </td>`;
        data_table += `<td class="text-center fs-5 precio_total_temporal" data-total_producto="${i.precio*i.cantidad_productos_carrito}">$${(i.precio*i.cantidad_productos_carrito).toLocaleString('es')}</td>`;
        data_table += '</tr>';
    });
    $('.table_carrito_compra > tbody').html(data_table);

}

function totalPoductos() {
    $('.valores_totales').html(localStorage.getItem('cant_productos') === null ? 0 : localStorage.getItem('cant_productos'));
    let total_col = 0


    let datos = $('.table_carrito_compra').find('.precio_total_temporal');
    for (let i = 0; i < datos.length; i++) {
        total_col += parseFloat($(datos[i]).data('total_producto'))
    }
    $('#valor_subtotal span').html(total_col.toLocaleString('es'));
    let valor_adicional = $('#valor_adicional span').data('valor_adicional');
    $('#valor_total span').html((total_col+valor_adicional).toLocaleString('es'))
    // console.log(valor_adicional)

    // console.log(total_col);
}

function limpiarCarrito() {
    localStorage.clear();
    crearTableCarrito([]);
    totalPoductos();
    $('.rounded-pill').html(0);
    $('#valor_total span').html(0)
}