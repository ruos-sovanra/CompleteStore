// 'use client'
import {useRouter} from "next/navigation";


export async function registerUser(email: string, password: string) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();
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

    router.push('/activate-confirm-email');
    return response.json();
}




