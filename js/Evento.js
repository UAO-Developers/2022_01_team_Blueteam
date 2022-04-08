function actualizar() {
    let txt_nombre = $("#nombre").val();
    let txt_fecha = $("#fecha").val();
    let txt_descripcion = $("#descripcion").val();
    let txt_imagen = "../assets/img/123.jpg";
    let txt_streamer = $("#streamer").val();
    $.ajax({
        url:'https://pruebauao.azurewebsites.net/eventos',   // url
        dataType: 'text/json',
        type: 'put',
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
        url:'https://pruebauao.azurewebsites.net/eventos',   // url
        type: 'get',
        success: function( data, textStatus, jQxhr ){
            let i = 0;
            let html = "";
            console.log(data);
            data[0].forEach(element => {
                console.log(element);
                i++;
                if(element.Participantes === undefined){
                    participantes = "Sin asignar";
                } else{
                    participantes = element.Participantes;
                }
                if(element.notas === undefined){
                    notas = "Sin asignar";
                } else{
                    notas = element.Participantes;
                }

                const formatDate = (date)=>{
                    let formatted_date = date.getFullYear() + "-0" + date.getDate() + "-0" + (date.getMonth() + 1)
                     return formatted_date;
                    }

                date = new Date(element.fecha);
                console.log(formatDate(date));
                $("#nombre").val(element.nombre);
                $("#fecha").val(formatDate(date));
                $("#descripcion").val(element.descripcion);
                console.log($( "#participantes" ).val())

                html += '<tr> <td>' + element.nombre + '</td> <td>' + element.fecha + '</td> <td>' + element.descripcion + '</td>' +
                ' <td>' + participantes + '</td> <td><img src="' + element.imagen + '" width="150px"></td> <td>' + notas + '</td>' +
                ' <td>' + element.estado + '</td> </tr>';
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