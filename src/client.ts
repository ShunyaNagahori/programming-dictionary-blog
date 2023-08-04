export async function getAllData() {
  const res = await fetch('https://blog-next-shunya.microcms.io/api/v1/programming-dictionary', { headers: { "x-api-key": "7RPXSTv5fYWH4DnDy6b0VXLuYXPvE4yeC2nx" }, cache: 'no-cache'})
  return res.json();
}


export async function getData(id: string) {
  const res = await fetch(`https://blog-next-shunya.microcms.io/api/v1/programming-dictionary/${id}`, { headers: { "x-api-key": process.env.API_KEY! }, cache: 'no-cache'})
  return res.json();
}
