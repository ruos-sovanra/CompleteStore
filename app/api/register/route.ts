import {NextRequest, NextResponse} from "next/server";


export async function POST(req: NextRequest){
    const body = await req.json();
    console.log(body);
    const {email, password1,password2,first_name,last_name} = body;

    const response = await fetch(`${process.env.BASE_URL}user/register/`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, password1,password2,first_name,last_name})
    })

    if (!response.ok){
        return NextResponse.json({
            message: "Fail to register"
        },
            {
                status: response.status
        })
    }

    return NextResponse.json({
        message: "Register success"
    },
        {
            status: 200
        })

}