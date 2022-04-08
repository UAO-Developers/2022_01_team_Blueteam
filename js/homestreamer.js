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
                html += '<tr id="' + element.nombre + '"><th scope="row">' + i
                + '</th> <td>' + element.nombre + '</td> <td>' + element.participantes + '</td> <td>' + element.notas + '</td>' +
                ' <td> <button class="btn btn-secondary btn-lg" onclick="">Eliminar</button> <button class="btn btn-primary btn-lg" onclick="">Editar</button> </td></tr>';
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