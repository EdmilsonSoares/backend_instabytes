import express from "express"; // Importa o framework Express.js para construir aplicações web
import multer from "multer"; // Importa o middleware Multer para manipular uploads de arquivos
import cors from "cors";
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js"; // Importa funções (provavelmente) do arquivo postsController.js para lidar com a lógica de posts e upload de imagens

const corsOptions = {
    origin: "http://localhost:8000",
    optionSuccessStatus: 200
};
// Esse trecho é necessário no windows devido ao multer funcionar de forma diferente nesse ambiente
// Sem esse trecho o multer pode renomear as imagens com ramdom names
// Em linux ou mac não necessita desse trecho, basta usar const upload = multer({ dest: "./uploads"});
const storage = multer.diskStorage({
    // Define a pasta de destino para uploads como "uploads/"
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    // Define o nome do arquivo como o nome original
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
// Cria uma instância do upload Multer usando o armazenamento configurado
const upload = multer({ dest: "./uploads", storage});
// Define as rotas usando o objeto Express app
const routes = (app) => {
    // Permite que o servidor interprete corpos de requisições no formato JSON
    app.use(express.json());
    
    app.use(cors(corsOptions));
    // Rota para procurar todos os posts
    app.get("/posts", listarPosts); // Chama a função controladora apropriada
    // Rota para criar um novo post
    app.post("/posts", postarNovoPost); // Chama a função controladora para a criação de posts
    // Rota para upload de imagens (assumindo uma única imagem chamada "imagem")
    app.post("/upload", upload.single("imagem"), uploadImagem); // Chama a função controladora para processamento da imagem 

    app.put("/upload/:id", atualizarNovoPost);
};

export default routes; // Exporta a função routes como padrão