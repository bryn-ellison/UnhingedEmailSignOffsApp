export async function approveSignOff(token, id) {
  let callUrl = `https://unhingedemailsignoffwebapi.azurewebsites.net/api/signoffs/${id}/Approve`;
  const response = await fetch(callUrl, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
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
