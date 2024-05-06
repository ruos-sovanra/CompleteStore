import type { NextRequest} from "next/server";
import  { NextResponse} from "next/server";
import { serialize } from "cookie";
export async function POST(req:NextRequest)
{
    const body = await req.json();

    const {email , password} = body;

    console.log("Data from login:",body)


    const response = await fetch(
        `${process.env.BASE_URL}user/login/`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password})
        }

    );

    if(!response.ok)
    {
        return NextResponse.json(
            {
                message : "failed to login"
            },
            {
                status:response.status,
            }
        );
    }



    const data= await response.json();
    const refreshToken= data?.refresh_token || null;
    const accessToken= data?.access_token || null;
    const user= data?.user || null;

    console.log("Data from login:",data)

    const cookieName = process.env?.COOKIE_REFRESH_TOKEN_NAME || "refresh_token"
    const serialized = serialize  (cookieName,refreshToken,{
        httpOnly:true,
        secure:process.env.NODE_ENV==="production",
        sameSite:'lax',
        path:"/",
    })

    return NextResponse.json({
            user:user,
            accessToken:accessToken,
            refreshToken:refreshToken
        },
        {
            status:response.status,
            headers:{
                "Set-Cookie":serialized,
            }
        }
    )
}
