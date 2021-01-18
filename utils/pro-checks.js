/* eslint import/prefer-default-export: 0 */
export const isProAuthenticated = async () => {
  const response = await fetch('/help/api/pro');
  const res = await response.json();
  return res;
};
