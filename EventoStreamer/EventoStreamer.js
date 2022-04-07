function registrar() {
    let txt_nombre = $("#nombre").val();
    let txt_informacion = $("#info").val();
    let txt_imagen = $("#participantes").val();
    let txt_Participantes = $("#edad").val();
    let txt_Notas = $("#notas").val();
    let txt_foto = $("#foto_perfil").val();
    let txt_datos = $("#datos_perfil").val();
    $.ajax({
        url:'https://pruebauao.azurewebsites.net/eventos',   // url
        dataType: 'text/json',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded',
        data: {
            nombre: txt_nombre,
            correo: txt_informacion,
            password: txt_imagen,
            edad: txt_Participantes,
            pais: txt_Notas,
            foto_perfil: txt_foto,
            datos_perfil: txt_datos,
        }, // data to be submit
        success: function( data, textStatus, jQxhr ){
            alert("Guardado!!!");
            cargar();
        },
        error: function( jqXhr, textStatus, errorThrown ){
            cargar();
        }
    });
}

function cargar() {
    $.ajax({
        url:'https://pruebauao.azurewebsites.net/eventos',   // url
        type: 'get',
        success: function( data, textStatus, jQxhr ){
            let i = 0;
            let html = "";
            console.log(data);
            data[0].forEach(element => {
                console.log(element);
                i++;
                html += '<tr id="' + element.nombre + '"><th scope="row">' + i
                + '</th> <td>' + element.nombre + '</td> <td>' + element.participantes + '</td> <td>' + element.notas + '</td>' +
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