function guardar(){
    let txt_descripcion = $("#descripcion").val();
    $.ajax({
        url:'https://pruebauao.azurewebsites.net/streamers/correo/' + localStorage.correo,   // url
        dataType: 'text',
        type: 'PUT',
        contentType: 'application/x-www-form-urlencoded',
        data: {
            datos_perfil : txt_descripcion,
        }, // data to be submit
        success: function( data, textStatus, jQxhr ){
            logear();
        },
        error: function( jqXhr, textStatus, errorThrown ){
            console.log(jqXhr);
            error();
        }
    });
}

function logear(){
    window.location.href = 'homeStreamer.html';
}

function error(){
    console.log(-1)
}