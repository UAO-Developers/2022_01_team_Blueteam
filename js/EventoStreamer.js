function registrar() {

    $("form").submit(function(event) {
        event.preventDefault();
    })

    let txt_nombre = $("#nombre").val();
    let txt_fecha = $("#fecha").val();
    let txt_descripcion = $("#descripcion").val();
    let txt_imagen = "../assets/img/collection/events/default_event.jpg";
    let txt_estado = "Sin lanzar";
    $.ajax({
        url:'https://pruebauao.azurewebsites.net/eventos',   // url
        dataType: 'text/json',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded',
        data: {
            nombre: txt_nombre,
            fecha: txt_fecha,
            descripcion : txt_descripcion,
            imagen: txt_imagen,
            streamer: localStorage.getItem("user_name"),
            estado: txt_estado,
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
        url:'https://pruebauao.azurewebsites.net/eventos/streamer/' + localStorage.getItem("user_name"),   // url
        type: 'get',
        success: function( data, textStatus, jQxhr ){
            let i = 0;
            let html = "";
            console.log(data.eventos);
            data.eventos.forEach(element => {
                console.log(element);
                i++;
                const formatDate = (date)=>{
                    let formatted_date = date.getFullYear() + "-0" + date.getDate() + "-0" + (date.getMonth() + 1)
                    return formatted_date;
                }

                if(element.participantes == undefined){
                    var participantes = "Sin asignar";
                }

                var id = element._id;

                html += '<tr id="' + element.nombre + '"><th scope="row">' + i
                + '</th> <td>' + element.nombre + '</td> <td>' + formatDate(new Date(element.fecha)) + '</td> <td>' + participantes + '</td> <td>' + element.estado + '</td>' +
                ' <td> <button class="btn btn-secondary btn-lg" onclick="eliminar('+ "'" +  id  + "'" + ')">Eliminar</button> <button class="btn btn-primary btn-lg" onclick="editar('+ "'" + id + "'" + ')">Editar</button> </td></tr>';
            $("#personajes").html(html);
            });
        },
        error: function( jqXhr, textStatus, errorThrown ){
            if(jqXhr.responseJSON.message == 'Not Found'){
                html = "";
                $("#personajes").html(html);
            } else {
                console.log(jqXhr)
            }
        }
    });
}

function eliminar(valor){
    $.ajax({
        url : 'https://pruebauao.azurewebsites.net/eventos/_id/' + valor,
        type : 'DELETE',
        success : function ( data ) {
            cargar();
        },
        error : function ( jqXhr, textStatus, errorMessage ) {
            console.log(errorMessage);
        }
    });
}

function editar(id_evento){
    localStorage.id = id_evento;
    window.location.href = 'Evento.html';
}
$(document).ready(function(){
    cargar();
});