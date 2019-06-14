let socket = io();
let labelTicket = $('#lblNuevoTicket');

socket.on('connect', () => {
    console.log('Estamos conectados con el servidor');
});

socket.on('disconnect', () => {
    console.log('Estamos desconectados del servidor');
});

socket.on('estadoActual', (data) => {
    labelTicket.text(data.actual);
})


// null porque no manda información
$('button').on('click', function(){
    socket.emit('siguienteTicket', null, function(siguienteTicket){
        labelTicket.text(siguienteTicket);
    });
});

