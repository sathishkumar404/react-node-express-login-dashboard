
import io from "socket.io-client";
const SOCKET_URI = "http://localhost:5000"; 



export default  io.connect(SOCKET_URI);
