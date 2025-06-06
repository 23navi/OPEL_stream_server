// Simple socket server for testing.

// Identified issue, when using bun as runtime, the socket clinet is getting disconnected, but when using node runtime, it is working fine.

import express from "express"
import { createServer } from "node:http";
import { Server } from "socket.io";

const port = process.env.PORT || 3005;

const app = express();
const httpServer = createServer(app);


app.get("/", (req, res) => {
    res.sendFile(new URL("./index.html", import.meta.url).pathname);
});


const io = new Server(httpServer);

httpServer.listen(port, () => {
    console.log(`application is running at: http://localhost:${port}`);
});