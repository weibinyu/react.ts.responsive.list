export default async function getCategory<T>(): Promise<T> {
  const response = await fetch("api/games/lists.json", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  });
  return await response.json();
}
