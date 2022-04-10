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
                    var participantes = 0;
                }
                html += '<tr id="' + element.nombre + '"><th scope="row">' + i
                + '</th> <td>' + element.nombre + '</td> <td>' + formatDate(new Date(element.fecha)) + '</td> <td>' + participantes + '</td>' +
                ' <td><img src="' + element.imagen + '" width="150px"></td> <td>' + element.estado + '</td> </tr>';
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