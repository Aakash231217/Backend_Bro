app.delete('/tasks/:id', authMiddleware, async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
      if (!task) {
        return res.status(404).send('Task not found');
      }
      if (!task.owner.equals(req.user._id)) {
        return res.status(403).send("You don't have permission to delete this task");
      }
      await task.remove();
      res.send('Task deleted');
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  