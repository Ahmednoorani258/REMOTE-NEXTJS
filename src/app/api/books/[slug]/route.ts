import { NextResponse,NextRequest } from "next/server";

type Params = Promise<{slug:string}>

export async function GET (req:NextRequest,{params}:{params:Params}){
    const {slug} = await params
    console.log(slug)
    return new NextResponse('Dynamic ROute')
}