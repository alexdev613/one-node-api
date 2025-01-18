import { Router, Request, Response } from "express"

const router = Router();

// Exemplo: http://localhost:3333/tarefas
router.get("/tarefas", (req: Request, res: Response) => {
  // res.send("Minha primeira API");
  res.json({ message: "Minha primeira api!", aluno: "Alex Nascimento" });
})

export { router };
