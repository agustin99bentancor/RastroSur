import * as authService from "./lote.service.js";

export async function create(req, res) {
  try {
    const user = await authService.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
export async function findAll(req, res) {
  try {
    const allLotes = await authService.findAll(req.body);
    res.status(201).json(allLotes);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function findById(req, res) {
    try {
        const lote = await authService.findById(parseInt(req.params.id));  
        res.status(201).json(lote);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}


export async function update(req, res) {
    try {
        const updatedLote = await authService.update(parseInt(req.params.id), req.body);  
        res.status(201).json(updatedLote);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export async function remove(req, res) {
    try {
        await authService.remove(parseInt(req.params.id));  
        res.status(204).send();
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}