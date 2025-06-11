import express from "express"
import { Server as SocketServer } from "socket.io"
import cors from "cors"
import http from "http"
import dotenv from "dotenv"

dotenv.config()

const app = express()
const server = http.createServer(app)

app.use(cors())

const io = new SocketServer(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`)

    socket.on("video-chunks", (data) => {
        console.log({ video_chunk: data })

    })

    socket.on("process-video", (data) => {
        console.log(data)
    })

    socket.on("disconnect", (data) => {
        console.log("client got disconnected")
    })

})

server.listen(5001, () => {
    console.log("server is running on port 5001")
})