export async function request(url: string, method: string, token: string | null, body: any) {
    let header: Record<string, any> = {
        'Content-Type': 'application/json'
    }

    if (token != null) {
        header['Authorization'] = "Bearer " + token;
    }

    const result = await fetch(url, {
        method: method,
        headers: header,
        body: body == null ? null : body,
        redirect: "follow"
    });

    return result;
}

export async function graphqlRequest(token: string | null, body: string) {
    return await request('/graphql', 'POST', token, JSON.stringify({
        query: body
    }));
}


