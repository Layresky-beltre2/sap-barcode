export async function loginSAP({ url, companyDB, username, password }) {
  const res = await fetch(`${url}/Login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      CompanyDB: companyDB,
      UserName: username,
      Password: password,
    }),
  })

  if (!res.ok) throw new Error("Login error")

  return await res.json()
}

export async function getItems(url, sessionId) {
  const res = await fetch(`${url}/Items`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: `B1SESSION=${sessionId}`,
    },
  })

  if (!res.ok) throw new Error("Error items")

  return await res.json()
}