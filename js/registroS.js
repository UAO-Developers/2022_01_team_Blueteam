

function registrar() {
    let txt_nombre = $("#nombre").val();
    let txt_correo = $("#correo").val();
    let txt_contrasena = $("#contrasena").val();
    let txt_edad = $("#edad").val();
    let txt_pais = $("#pais").val();

    $.ajax({
        url:'https://pruebauao.azurewebsites.net/streamers',   // url
        dataType: 'text/json',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded',
        data: {
            nombre: txt_nombre,
            correo: txt_correo,
            password: txt_contrasena,
            edad: txt_edad,
            pais: txt_pais,
            foto_perfil: "",
            datos_perfil: "",
        },
        success: function( data, textStatus, jQxhr ){
            correcto(true);
        },
        error: function( jqXhr, textStatus, errorThrown ){
        }
    });
}

function correcto(a){
    if(a == true){
        window.location.href = "http://127.0.0.1:5500/homeStreamer/homestreamer.html";
    }
}