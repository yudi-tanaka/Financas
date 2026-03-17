const API_URL = '/api'

export async function api<T>(
  endpoint: string,
  method: string,
  body: any = null
): Promise<T> {

  const url = `${API_URL}/${endpoint}`

  console.log("API REQUEST")
  console.log("URL:", url)
  console.log("METHOD:", method)
  console.log("BODY:", body)

  
  
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: body ? JSON.stringify(body) : null
  })
  
  console.log("API RESPONSE STATUS:", response.status)
  
  if (!response.ok) {
    const text = await response.text()
    console.error("API ERROR:", text)
    throw new Error(`API error: ${response.statusText}`)
  }

  const text = await response.text()

  if (!text) {
    return {} as T
  }
  
  return await JSON.parse(text)
}