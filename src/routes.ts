import { Router, Request, Response, NextFunction } from "express"

const router = Router();

// Exemplo: http://localhost:3333/tarefas

const tarefas = ["Estudar Node JS", "Estudar JavaScript"];

/* Entendendo Middlewares
  - Está ali no meio, após chamar a requisição e antes de chamar o callback.
  - O use é um middleware
*/

router.use((req: Request, res: Response, next: NextFunction) => {
  console.log("PASSOU PELO MIDDLEWARE GLOBAL");

  return next();
})

// Verifica se a prop nome existe do body
function checkTarefa(req: Request, res: Response, next: NextFunction) {
  if(!req.body.nome) {
    return res.status(400).json({ error: "Nome Inválido / Faltando nome"});
  }

  return next();
}

// Verifica se o index existe:
function checkIndexTarefa(req: Request, res: Response, next: NextFunction) {
  const tarefa = tarefas[Number(req.params.index)];

  if (!tarefa) {
    return res.status(400).json({ error: "Tarefa não encontrada!" });
  }

  return next();

}

//------------------------------------------------------------------------//

// Listar todas tarefas
router.get("/tarefas", (req: Request, res: Response) => {
  res.json(tarefas);
});

// Listar única tarefa
router.get("/tarefa/:index", (req: Request, res: Response) => {
  const index = req.params.index;

  res.json({ tarefa: tarefas[Number(index)]})
})

// Cadastrar nova tarefa com middleware:
// OBS: o middleware é sempre "após a rota e antes do callback"
router.post("/tarefa", checkTarefa, (req: Request, res: Response) => {
  
  const { nome } = req.body;

  tarefas.push(nome)

  res.json(tarefas);
})

// // Cadastrar nova tarefa
/*router.post("/tarefa", (req: Request, res: Response) => {
  
  const { nome } = req.body;

  // Trativa de verificação se estamos recebendo a propriedade nome na requisição 
  if (!nome) {
    res.status(400).json({ message: "Erro ao cadastrar"});
    return
  }
  // Para adicionar o item escrito em nome no array tarefas
  tarefas.push(nome)

  res.json(tarefas);
})
*/

// Cadastrar uma tarefa com middleware:
// OBS: o middleware é sempre "após a rota e antes do callback", e também posso passar mais de um middleware
router.put("/tarefa/:index", checkTarefa, checkIndexTarefa, (req: Request, res: Response) => {
  const { index } = req.params;
  const { nome } = req.body;

  tarefas[Number(index)] = nome;

  res.json(tarefas);
});


// //Atualizar uma única tarefa
/*router.put("/tarefa/:index", (req: Request, res: Response) => {
  const { index } = req.params;
  const { nome } = req.body;

  tarefas[Number(index)] = nome;

  res.json(tarefas);
});
*/

// Deletar alguma tarefa com middleware:
router.delete("/tarefa/:index", checkIndexTarefa, (req: Request, res: Response) => {
  const { index } = req.params;

  tarefas.splice(Number(index), 1);

  res.json({ message: "Tarefa deletada com sucesso!" })
})

// Deletar alguma tarefa
/*router.delete("/tarefa/:index", (req: Request, res: Response) => {
  const { index } = req.params;

  tarefas.splice(Number(index), 1);

  res.json({ message: "Tarefa deletada com sucesso!" })
})
*/

export { router };

// Query Params ?nome=Comprar Pao
// router.get("/tarefas", (req: Request, res: Response) => {
  //   const nome = req.query.nome;
  
  //   res.json({ tarefa: nome });
  // })
  
  
  // Route Params /tarefas/2
  // router.get("/tarefas/:id", (req: Request, res: Response) => {
    //   const id = req.params.id;
    
    //   res.json({ tarefa: `Tarefa com id: ${id}` });
    // })


  // Request Body { nome: "Comprar Pao", "usuario": 123 }