
export async function registerUser(email: string, password: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}user/register/`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, password1: password, password2: password, first_name: 'Google', last_name: 'User'})
    })

    if (!response.ok){
        const data = await response.json();
        if (data.email && data.email[0] === "A user is already registered with this e-mail address.") {
            // User already exists
            return false;
        }
        throw new Error('Failed to register user');
    }


    return response.json();
}

export async function loginUser(email: string, password: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_LOCALHOST}login/`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, password})
    })

    if (!response.ok){
        throw new Error('Failed to login user');
    }
    const data = await response.json();
    console.log('Data from login with Google:', data);

    return data;
}

