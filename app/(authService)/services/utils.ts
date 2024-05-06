// 'use client'
export const loginUser = async (email: string, password: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_LOCALHOST}login/`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, password})
    })
    if (!response.ok){
        throw new Error('Failed to login user');
    }
    const data = await response.json();

    return data;
}