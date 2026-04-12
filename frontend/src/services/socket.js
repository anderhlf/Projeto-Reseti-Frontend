// Aqui vou esta configurando o WebSocket para atualizar a pagina toda vez que houver uma alteração 
import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:5000"; // URL do Flask

const socket = io(SOCKET_URL, {
    autoConnect: true, 
    reconnection: true, 
});


socket.on("connect", () => {
    console.log("Conectado ao servidor! ID:", socket.id);
});

export default socket;