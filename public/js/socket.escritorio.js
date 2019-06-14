// Establece la conexión
const socket = io();

let searchParams = new URLSearchParams(window.location.search);

if(!searchParams.has('escritorio')){
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

const escritorio = searchParams.get('escritorio');

let label = $('small');

$('h1').text(`Escritorio ${escritorio}`);

$('button').on('click', () => {
    socket.emit('atenderTicket', {escritorio}, function(resp){
        if(resp === 'No hay más tickets'){
            label.text('Ya no hay tickets');
            return;
        }
        label.text(`Ticket  ${resp.numero}`)
    })
});

