import * as authService from "./events.service.js";

export async function create(req, res) {
  try {
    const events = await authService.create(req.body);
    res.status(201).json(events);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
export async function findAll(req, res) {
  try {
    const events = await authService.findAll(req.body);
    res.status(201).json(events);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function findById(req, res) {
    try {
        const events = await authService.findById(parseInt(req.params.id));  
        res.status(201).json(events);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}


export async function update(req, res) {
    try {
        const updatedeEvents = await authService.update(parseInt(req.params.id), req.body);  
        res.status(201).json(updatedeEvents);
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