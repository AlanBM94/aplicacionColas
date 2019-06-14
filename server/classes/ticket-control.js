const fs = require('fs');

class Ticket{
    constructor(numero, escritorio){
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl{
    constructor(){
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];
        let data = require('../data/data.json');

        if(this.hoy === data.hoy){
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
        }else{
            this.reiniciarConteo();
        }

    }

    siguiente(){
        this.ultimo += 1;
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);
        this.grabarArchivo();
        return `Ticket ${this.ultimo}`;
    }

    reiniciarConteo(){
        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];
        this.grabarArchivo();
        console.log('Se ha reinicializado el sistema');
    }

    grabarArchivo(){
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        };

        // Convierte el jsonData a un json
        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', jsonDataString);

    }

    getUltimoTicket(){
        return `Ticket ${this.ultimo}`;
    }
    
    getUltimos4(){
        return this.ultimos4;
    }

    atenderTicket(escritorio){
        // Si no hay tickets retorna no hay más tickets
        if(this.tickets.length === 0){
            return 'No hay más tickets';
        }
        // Obtiene el numero del primer ticket del arreglo tickets
        let numeroTicket = this.tickets[0].numero;
        // Elimina el primer elemento del arreglo tickets
        this.tickets.shift();
        // Crea un nuevo ticket que es el que será atendido
        let atenderTicket = new Ticket(numeroTicket, escritorio);
        // Agrega el atenderTicket al arreglo de los últimos 4
        this.ultimos4.unshift(atenderTicket);
        // Si los ultimos 4 arreglos es mayor a 4 elimina el último
        if(this.ultimos4.length > 4){
            this.ultimos4.splice(-1, 1);
            console.log(this.ultimos4);
        }
        // console.log('Ultimos 4');
        // console.log(this.ultimos4);
        this.grabarArchivo();
        return atenderTicket;
    }   
}




module.exports = {
    TicketControl
}