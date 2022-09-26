
import { io } from "socket.io-client";
import { NotificationManager } from "react-notifications";
import {
    BACKEND_URL
} from "./config";

var socket = io(`${BACKEND_URL}`);

socket.on("UpdateStatus", data => {  
    if (data.type === "winners") {
        alert(data.winners);
        NotificationManager.success(data.winners);
    }
});


