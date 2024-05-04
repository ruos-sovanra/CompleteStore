import {NextRequest, NextResponse} from "next/server";
import {serialize} from "cookie";





export async function POST(req: NextRequest) {
    const body = await req.json();
    console.log("Log from login",body)
    const {email, password} = body;

    const response = await fetch(`${process.env.BASE_URL}user/login/`,{
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({email, password})
    })



    if(!response.ok){
        return NextResponse.json({
            message: "Fail to login"
        },
            {
                status: response.status
            })
    }

    const data = await response.json();
    const user = data?.user || null;
    const accessToken = data?.access_token || null;
    const refreshToken = data?.refresh_token || null;

    const cookieName = process.env.COOKIE_REFRESH_TOKEN_NAME || 'refresh'
    const serialized = serialize(cookieName, refreshToken,{
        httpOnly:true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax"
    })

    return NextResponse.json({
        user: user,
        accessToken: accessToken
    },{
        status: response.status,
        headers: {"Set-Cookie": serialized}
    })
}