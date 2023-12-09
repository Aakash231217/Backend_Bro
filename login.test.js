const request = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: 'testUser',
      password: 'testPassword'
    })
  };
  
  const response = await request.json();
  console.log(response);
  