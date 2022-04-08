function solicitar() {
    let contrasena = $("#contrasena").val();
    let correo = $("#email").val();

    $.ajax({
        url:'https://pruebauao.azurewebsites.net/streamers/login',   // url
        dataType: 'json',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded',
        data: {
            correo: correo,
            password: contrasena,
        }, // data to be submit
        success: function( data, textStatus, jQxhr ){
            console.log( data );
            if(data.message == "Correcto"){
                comprobar(data.nombre);
            } else{
                if(data.message == "contrasena"){
                    mostrarError("Contraseña incorrecta");
                } else{
                    mostrarError("No existe el streamer");
                }
            }
        },
        error: function( jqXhr, textStatus, errorThrown ){
            console.log(jqXhr);
        }
    });
}

function comprobar(nombre){
    localStorage.user_name = nombre;
    localStorage.logeado = true;
    localStorage.tipoCuenta = "streamer";
    localStorage.correo = $("#email").val();
    window.location.href = 'homeStreamer.html';
}

function mostrarError(error){
    console.log(error);
}

$(document).ready(function(){
});