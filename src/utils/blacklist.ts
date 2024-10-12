export async function removeBlacklist(number: string) {
    const res = await fetch("http://localhost:3008/blacklist", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ number, intent: "remove" })
    })
    const data = await res.json()
    return data
}

export async function addBlacklist(number: string) {
    const res = await fetch("http://localhost:3008/blacklist", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ number, intent: "add" })
    })
    const data = await res.json()
    return data
}