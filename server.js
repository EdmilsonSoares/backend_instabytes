import express from "express";
import routes from "./scr/routes/postsRoutes.js";

const app = express();
app.use(express.static("uploads"));
routes(app);

// Inicia o serviço na porta 3000 e exibe uma mensagem no console
app.listen(3000, () => {
    console.log("servidor escutando...");
});

