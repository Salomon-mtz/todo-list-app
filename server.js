const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const next = require("next");

dotenv.config();

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Middleware
  server.use(cors());
  server.use(express.json());

  // Conectar a MongoDB
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true, // Habilita el nuevo parser de URL
      useUnifiedTopology: true, // Habilita el nuevo motor de monitoreo y descubrimiento
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

  // Rutas
  server.use("/api/auth", require("./routes/Auth"));
  server.use("/api/tasks", require("./routes/tasks"));

  // Manejar todas las otras rutas con Next.js
  server.get("*", (req, res) => {
    return handle(req, res);
  });

  const PORT = process.env.PORT || 5001;
  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Server running on port ${PORT}`);
  });
});
