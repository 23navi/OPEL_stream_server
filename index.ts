import express from "express"
import { Server as SocketServer } from "socket.io"
import cors from "cors"
import http from "http"
import dotenv from "dotenv"
import path from "path"
import fs from "fs"
import { Readable } from "stream"


dotenv.config()

const app = express()
const server = http.createServer(app)

app.use(cors())


// Ensure temp_upload directory exists
const uploadDir = path.join(__dirname, 'temp_upload');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const io = new SocketServer(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

let recordedChunks = []

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`)

    socket.on("video-chunks", async (data) => {
        const writeStream = fs.createWriteStream(`${uploadDir}/${data.filename}`)
        recordedChunks.push(data.chunk)

        // Note: Blob is not native to node, it is a browser api but node18+ started supporting it
        const videoBlob = new Blob(recordedChunks, { type: 'video/webm; codecs=vp9' })
        const buffer = Buffer.from(await videoBlob.arrayBuffer())
        const readStream = Readable.from(buffer)
        readStream.pipe(writeStream).on("finish", () => {
            console.log("video saved")
        })
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