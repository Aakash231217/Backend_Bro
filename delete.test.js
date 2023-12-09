const request = {
    method: 'DELETE',
    headers: {
      'Authorization': 'Bearer ' + TOKEN
    }
  };
  
  const response = await request.json();
  console.log(response);
  