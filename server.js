const express = require("express");

const cors = require("cors");

const app = express();

// Allows any origin (for development only)
app.use(cors());

// or, to allow only its front:
/*
app.use(cors({
    origin: 'http://127.0.0.1:5500',
    methods: ['GET','POST','PUT','DELETE'],
    allowedHeaders: ['Content-Type','x-api-key']
}));
*/

app.use(express.json({ limit: "10mb" }));

// import routes 
const dvpRoutes = require("./routes/dvpRoutes");

// use routes
app.use("/api", dvpRoutes);

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));