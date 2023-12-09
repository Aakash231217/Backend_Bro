const task = {
    name: 'Test Task',
    description: 'This is a test task',
    dueDate: new Date(Date.now() + 60 * 1000) // 10 minutes from now
  };
  
  const req = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(task)
  };
  
  const res = {
    status: 201,
    json: (data) => {
      console.log(data);
    }
  };
  
  authMiddleware(req, res, () => {
    // Should pass without any errors
  });
  