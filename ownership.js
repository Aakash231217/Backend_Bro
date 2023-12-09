app.post('/tasks', authMiddleware, async (req, res) => {
    try {
      const task = new Task({ ...req.body, owner: req.user._id });
      await task.save();
      res.status(201).json(task);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });
  