import e from "express";
import * as authService from "./ganado.service.js";

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
export async function events(req, res) {
  try {
      const lote = await authService.events(parseInt(req.params.id));  
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

export async function findByCaravana(req, res) {
  try {
      const vaca = await authService.findByCaravana(req.params.caravanaId);
      res.status(201).json(vaca);
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

export async function move(req, res) {
  const vacaId = parseInt(req.params.id); 
  const datosDelBody = req.body;
  try {
      await authService.move(vacaId, datosDelBody);  
      res.status(204).send();
  } catch (err) {
      res.status(400).json({ error: err.message });
  }
}