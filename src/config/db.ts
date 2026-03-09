import mongoose from "mongoose";
import colors from 'colors'
import { exit } from 'node:process';
// Source - https://stackoverflow.com/a/79892633
// Posted by Xoosk
// Retrieved 2026-02-28, License - CC BY-SA 4.0
import { setServers } from "node:dns/promises";
setServers(["1.1.1.1", "8.8.8.8"]);


export const connectDB = async () => {
    try {
        const {connection} = await mongoose.connect(process.env.DATABASE_URL)
        const url = `${connection.host}:${connection.port}`
        console.log(colors.magenta.bold(`MongoDB Conectado en: ${url}`))
    } catch (error) {
        
        console.log(colors.red.bold('Error al conectar a MongoDB'))
        console.log(error.message)
        exit(1)
    }
}