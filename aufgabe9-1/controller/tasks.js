import { tasks } from '../data/defaults.js';

function validate(body) {
  const title = body?.title;
  const description = body?.description;

  if (!title || !description) {
    return 'title and description are required';
  }
  return null;
}

export function getAllTasks(req, res) {
  res.status(200).json(tasks);
}

export function getTasksById(req, res) {
  try {
    const id = req.params?.id;

    const task = tasks.find((t) => t.id === id);

    if (!task) {
      return res.status(404).json({ message: 'task not found' });
    }

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: 'internal server error' });
  }
}

// dueDate is optional right?
// implement some sort of time validation for dueDate you you cnat send everything
export function postTask(req, res) {
  try {
    const error = validate(req.body);

    if (error) {
      return res.status(422).json({ message: error });
    }

    const task = {
      id: crypto.randomUUID(),
      title: req.body.title,
      description: req.body.description,
      createdAt: new Date().toISOString(),
      dueDate: req.body.dueDate || '',
      completedAt: '',
    };

    tasks.push(task);
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: 'internal server error' });
  }
}

export function postTaskDone(req, res) {
  try {
    const id = req.params?.id;
    const task = tasks.find((t) => t.id === id);

    if (!task) {
      return res.status(404).json({ message: 'task not found' });
    }

    task.completedAt = new Date().toISOString();
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: 'internal server error' });
  }
}

export function putTaskById(req, res) {
  try {
    const id = req.params?.id;
    const task = tasks.find((t) => t.id === id);

    if (!task) {
      return res.status(404).json({ message: 'task not found' });
    }

    const error = validate(req.body);
    if (error) {
      return res.status(422).json({ message: error });
    }

    task.title = req.body.title;
    task.description = req.body.description;
    task.dueDate = req.body.dueDate || task.dueDate;
    task.completedAt = req.body.completedAt || task.completedAt;

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: 'internal server error' });
  }
}

export function deleteTaskById(req, res) {
  try {
    const id = req.params?.id;
    const index = tasks.findIndex((t) => t.id === id);

    if (index === -1) {
      return res.status(404).json({ message: 'task not found' });
    }

    tasks.splice(index, 1);
    res.status(204).json({ message: 'its deleted' });
  } catch (err) {
    res.status(500).json({ message: 'internal server error' });
  }
}
