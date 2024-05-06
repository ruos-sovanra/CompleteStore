import {NextRequest, NextResponse} from "next/server";
import {BASE_URL} from "@/libs/difinition";

export async function POST(req:NextRequest){
    const key = await req.json();
    const response = await fetch(`${BASE_URL}/account-confirm-email/${key}/`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({key})
    })

    if (!response.ok){
        return NextResponse.json({
                message: "Fail to Verify Email"
            },
            {
                status: response.status
            })
    }

    return NextResponse.json({
            message: "Email Verified"
        },
        {
            status: 200
        })
}