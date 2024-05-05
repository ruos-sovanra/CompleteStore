import {cookies} from "next/headers";
import {NextResponse} from "next/server";
import {serialize} from "cookie";
import {useSession} from "next-auth/react";

export async function POST(){
    const cookieStore = cookies();
    const cookieName = process.env.COOKIE_REFRESH_TOKEN_NAME || "refresh";
    const credential = cookieStore.get(cookieName);
    const session = useSession()

    if(!credential){
        return NextResponse.json({
            message: "Token not found"
        },{
            status: 404
        })
    }

    const refreshToken = credential.value;

    const response = await fetch(`${process.env.BASE_URL}token/refresh/`,{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({refresh: refreshToken})
    })

    if (!response.ok){
        return NextResponse.json({
            message: "Failed to refresh access token"
        },{
            status: response.status
        })
    }

    const data = await response.json();
    const refresh = data?.refresh || null;
    const access = data?.access || null;
    console.log('log form session in refresh',session)
    console.log("Log from Refresh Route",data)

    const serialized = serialize(cookieName, refresh, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax"
    });

    return NextResponse.json({
        accessToken: access
    },{
        headers: {
            "Set-Cookie": serialized
        }
    })
}