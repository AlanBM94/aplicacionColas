const socket = io();

let ticket1 = $('#lblTicket1');
let ticket2 = $('#lblTicket2');
let ticket3 = $('#lblTicket3');
let ticket4 = $('#lblTicket4');

let escritorio1 = $('#lblEscritorio1');
let escritorio2 = $('#lblEscritorio2');
let escritorio3 = $('#lblEscritorio3');
let escritorio4 = $('#lblEscritorio4');

const tickets = [ticket1, ticket2, ticket3, ticket4];
const escritorios = [escritorio1, escritorio2, escritorio3, escritorio4];


socket.on('estadoActual', data => {
    actualizarHTML(data.ultimos4);
});

socket.on('ultimos4', data => {
    var audio = new Audio('../audio/new-ticket.mp3');
    audio.play();
    actualizarHTML(data.ultimos4);
});


function actualizarHTML(ultimos4){
    for(let i = 0; i <= ultimos4.length - 1; i++){
        tickets[i].text(`Ticket ${ultimos4[i].numero}`);
        escritorios[i].text(`Escritorio ${ultimos4[i].escritorio}`);
    }
}
