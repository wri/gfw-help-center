export const proAuthenticated = async () => {
  const response = await fetch('http://localhost:3000/help/api/pro');
  const res = await response.json();

  return res;
}
