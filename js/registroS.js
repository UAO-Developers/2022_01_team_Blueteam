function registrar() {
    let txt_nombre = $("#nombre").val();
    let txt_correo = $("#correo").val();
    let txt_contrasena = $("#contrasena").val();
    let txt_edad = $("#edad").val();
    let txt_pais = $("#pais").val();

    $.ajax({
        url:'https://pruebauao.azurewebsites.net/streamers',   // url
        dataType: 'text',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded',
        data: {
            nombre: txt_nombre,
            correo: txt_correo,
            password: txt_contrasena,
            edad: txt_edad,
            pais: txt_pais,
            foto_perfil: "../assets/img/collection/perfil/default_perfil.jpg",
            datos_perfil: "",
        },
        success: function( data, textStatus, jQxhr ){
            registrado();
        },
        error: function( jqXhr, textStatus, errorThrown ){
            console.log( jqXhr);
        }
    });
}

function registrado(){
    localStorage.user_name = $("#nombre").val();
    localStorage.logeado = true;
    localStorage.tipoCuenta = "streamer";
    localStorage.correo = $("#correo").val();
    window.location.href = 'configuracionS.html';
}

$(document).ready(function(){
    $("form").submit(function(event) {
        event.preventDefault();
    })
});