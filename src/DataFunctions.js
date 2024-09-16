export async function approveSignOff(token, id) {
  console.log(id + " code runs to fetch function");
  let callUrl = `https://unhingedemailsignoffwebapi.azurewebsites.net/api/signoffs/${id}/Approve`;
  const response = await fetch(callUrl, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response);
  return response;
}

export async function deleteSignOff(token, id) {
  let callUrl = `https://unhingedemailsignoffwebapi.azurewebsites.net/api/signoffs/${id}`;
  const response = await fetch(callUrl, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
}
