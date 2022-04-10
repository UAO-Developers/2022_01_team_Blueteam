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
                logear(data.nombre);
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

function logear(nombre){
    localStorage.user_name = nombre;
    localStorage.logeado = true;
    localStorage.tipoCuenta = "streamer";
    localStorage.correo = $("#email").val();
    window.location.href = 'homeStreamer.html';
}

function mostrarError(error){
    console.log(error);
}

function tipoDeCuenta(cuenta){
    if(cuenta == "colaborador"){
        $("#Colaborador").prop( "checked", true );
        $("#Streamer").prop( "checked", false );
        $("#labelStreamer").css('color', 'black');
        $("#labelColaborador").css('color', 'white');
    } else {
        $("#Colaborador").prop( "checked", false );
        $("#Streamer").prop( "checked", true );
        $("#labelStreamer").css('color', 'white');
        $("#labelColaborador").css('color', 'black');
    }
}

$(document).ready(function(){
});

function deslogearse(){
    localStorage.clear();
}

$('.inputlogin').bind('keypress', function (e) {
    if (e.key === 'Enter') {
        solicitar();
    }
});