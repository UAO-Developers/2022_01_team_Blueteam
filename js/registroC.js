function registrar(){
    let txt_nombre = $("#nombre").val();
    let txt_email = $("#correo").val();
    let txt_contrasena = $("#contrasena").val();
    let txt_edad = $("#edad").val();

    $.ajax({
        url: "http://localhost:8080/colaboradores",
        dataType: "text",
        method: "POST",
        data: {
            nombre: txt_nombre,
            correo: txt_email,
            password: txt_contrasena,
            edad: txt_edad,
        },
        success: function( data, textStatus, jQxhr ){
            registrado();
        }, error: function( jqXhr, textStatus, errorThrown ){
            console.log( jqXhr);
        }
    })
}


function registrado(){
    localStorage.user_name = $("#nombre").val();
    localStorage.logeado = true;
    localStorage.tipoCuenta = "colaborador";
    localStorage.correo = $("#correo").val();
    window.location.href = 'configuracionC.html';
}

$(document).ready(function(){
    $("form").submit(function(event) {
        event.preventDefault();
    })
});