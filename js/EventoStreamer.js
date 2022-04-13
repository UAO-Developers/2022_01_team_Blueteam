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
            cargar();
        },
        error: function( jqXhr, textStatus, errorThrown ){
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
            let html2 = "";
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

                if(element.estado != "Sin lanzar"){
                    html2 += '<tr id="' + element.nombre + '"><th scope="row">' + i
                + '</th> <td>' + element.nombre + '</td> <td>' + formatDate(new Date(element.fecha)) + '</td> <td>' + participantes + '</td> <td>' + element.estado + '</td>' +
                ' <td> <button class="btn btn-danger btn-lg" onclick="eliminar('+ "'" +  id  + "'" + ')">Eliminar</button>  <button class="btn btn-primary btn-lg" onclick="editar('+ "'" + id + "'" + ')">Editar</button> <button class="btn btn-success btn-lg" onclick="lanzar('+ "'" +  id  + "'" + ')">Lanzar</button> </td></tr>';

            } else {
                    html += '<tr id="' + element.nombre + '"><th scope="row">' + i
                + '</th> <td>' + element.nombre + '</td> <td>' + formatDate(new Date(element.fecha)) + '</td> <td>' + participantes + '</td> <td>' + element.estado + '</td>' +
                ' <td> <button class="btn btn-danger btn-lg" onclick="eliminar('+ "'" +  id  + "'" + ')">Eliminar</button>  <button class="btn btn-primary btn-lg" onclick="editar('+ "'" + id + "'" + ')">Editar</button> <button class="btn btn-success btn-lg" onclick="lanzar('+ "'" +  id  + "'" + ')" data-bs-toggle="modal" data-bs-target="#exampleModal">Lanzar</button> </td></tr>';

            }

            $("#sinLanzar").html(html);
            $("#enlinea").html(html2);
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

function lanzar(id_evento){
    $.ajax({
        url:'https://pruebauao.azurewebsites.net/eventos/_id/' + id_evento,   // url
        type: 'get',
        success: function( data, textStatus, jQxhr ){
            console.log( data.eventos[0].participantes );
            requiredP = ((data.eventos[0].participantes == undefined) ? true : false);

        },
        error: function( jqXhr, textStatus, errorThrown ){
        }
    });
}
$(document).ready(function(){
    cargar();

    $(window).on('resize', function(){
        div = document.getElementsByClassName('tablas');
        var win = $(this);

        if (win.width() <= 1180) {
            div[0].classList.replace("col-8", "col-12");
        } else {
            div[0].classList.replace("col-12", "col-8");
        }
    });
});