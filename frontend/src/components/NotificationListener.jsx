import { useEffect } from "react";
import socket from "../socket/socket";


const NotificationListener = () => {

  useEffect(() => {

    console.log("Notification Listener Mounted");


    socket.on("connect", () => {
      console.log("Socket Connected:", socket.id);
    });


    socket.on("low_stock_alert", (data) => {

      console.log("🔥 LOW STOCK EVENT RECEIVED");
      console.log(data);

      alert(data.message);

    });


    return () => {

      socket.off("low_stock_alert");
      socket.off("connect");

    };

  }, []);


  return null;
};


export default NotificationListener;