const request = {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer invalidToken'
    }
  };
  
  const response = await request.json();
  console.log(response);
 
  