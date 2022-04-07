function registrar() {
    let txt_nombre = $("#nombre").val();
    let txt_fecha = $("#fecha").val();
    let txt_descripcion = $("#descripcion").val();
    let txt_imagen = "../assets/img/123.jpg";
    let txt_streamer = $("#streamer").val();
    $.ajax({
        url:'http://localhost:8080/eventos',   // url
        dataType: 'text/json',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded',
        data: {
            nombre: txt_nombre,
            fecha: txt_fecha,
            descripcion : txt_descripcion,
            imagen: txt_imagen,
            streamer: txt_streamer,
        }, // data to be submit
        success: function( data, textStatus, jQxhr ){
            alert("Guardado!!!");
            cargar();
        },
        error: function( jqXhr, textStatus, errorThrown ){
            console.log(jqXhr);
            cargar();
        }
    });
}

function cargar() {
    $.ajax({
        url:'http://localhost:8080/eventos',   // url
        type: 'get',
        success: function( data, textStatus, jQxhr ){
            let i = 0;
            let html = "";
            console.log(data);
            data[0].forEach(element => {
                console.log(element);
                i++;
                html += '<tr id="' + element.nombre + '"><th scope="row">' + i
                + '</th> <td>' + element.nombre + '</td> <td>' + element.fecha + '</td> <td>' + element.participantes + '</td>' +
                ' <td> <button class="btn btn-secondary btn-lg" onclick="">Eliminar</button> <button class="btn btn-primary btn-lg" onclick="">Editar</button> </td></tr>';
            $("#personajes").html(html);
            });
        },
        error: function( jqXhr, textStatus, errorThrown ){
            console.log( errorThrown );
        }
    });
}

$(document).ready(function(){
    cargar();
});