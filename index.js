import http from "http"
import {readFile} from "fs/promises";

class Person{
    constructor(name, lastName, semester){
        this.name = name;
        this.lastName = lastName;
        this.semester = semester;
    }

    getJSON(){
        return {
            name: this.name,
            last_name: this.lastName,
            semester: this.semester
        }
    }
}

const saul = new Person('Saul Esteban', 'Lopez Bermudez', 'IX');
const ronald = new Person('Ronald Julian', 'Ordoñez Bohórquez', 'IX');
const sebasPerez = new Person('Juan Sebastian', 'Perez Agudelo', 'VIII');
const sebasAmortegui = new Person('Sebastian Alonso', 'Amortegui García', 'IX');

const data = {
    persons : [
        saul.getJSON(),
        ronald.getJSON(),
        sebasPerez.getJSON(),
        sebasAmortegui.getJSON()
    ]
}

const file = await readFile('./index.html');
const jsFile = await readFile('./module1.js');

const handleRequest = (request, response) => {
    const {method, url} = request;
    console.log(url);
    if(url == "/public/js/module"){
        response.setHeader('Content-Type', 'text/javascript');
        response.end(jsFile, 'utf-8');
        return;
    }
    if (url === '/api'){
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify(data));
        return ;
    }

    if ( url == '/person' && method == 'POST'){
        let body = '';

        request.on('data', (chunk) => {
            // Concatenar los datos recibidos en el cuerpo de la solicitud
            body += chunk.toString();
            const info = JSON.parse(body);
            console.log(info);
            const newPerson = new Person(info.name, info.last_name, info.semester);
            data.persons.push(newPerson.getJSON());
        });
    }
    response.setHeader('Content-Type', 'text/html');
    response.end(file, 'utf-8');
};

const server = http.createServer(handleRequest);

server.listen(4000, () => {
    console.log('Server listening on port 4000');
})