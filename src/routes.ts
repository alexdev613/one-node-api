import { Router, Request, Response } from "express"

const router = Router();

// Exemplo: http://localhost:3333/tarefas

// Query Params ?nome=Comprar Pao
// router.get("/tarefas", (req: Request, res: Response) => {
//   const nome = req.query.nome;

//   res.json({ tarefa: nome });
// })


// Route Params /tarefas/2
router.get("/tarefas/:id", (req: Request, res: Response) => {
  const id = req.params.id;

  res.json({ tarefa: `Tarefa com id: ${id}` });
})



// Request Body { nome: "Comprar Pao", "usuario": 123 }


export { router };
