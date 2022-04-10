function registrar() {
    var file = $('#imagen')[0].files[0];

    var name = file.name;
    var form_data = new FormData();
    var ext = name.split('.').pop().toLowerCase();

    if(jQuery.inArray(ext, ['gif','png','jpg','jpeg']) == -1)
    {
        alert("Invalid Image File");
    }
    else{
        var oFReader = new FileReader();
        oFReader.readAsDataURL(file);
        var f = file;
        var fsize = f.size||f.fileSize;
        if(fsize > 2000000)
        {
            alert("Image File Size is very big");
        }
        else
        {
            form_data.append("file", file);
            $.ajax({
                url:"upload.php",
                method:"POST",
                data: form_data,
                contentType: false,
                cache: false,
                processData: false,
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },
                beforeSend:function(){
                    $('#uploaded_image').html("<label class='text-success'>Image Uploading...</label>");
                },
                success:function(data)
                {
                    $('#uploaded_image').html(data);
                }
                ,error: function(ts)
                {
                    alert("error:" + ts.responseText);
                }
            });
        }
    }




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