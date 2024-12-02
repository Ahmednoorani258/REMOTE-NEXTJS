import { NextResponse ,NextRequest} from "next/server";

export function GET (req:NextRequest){
    const url = req.nextUrl
    const name = url.searchParams.get('name')
    const age = url.searchParams.get('age')
    const query = url.searchParams.has('age')
    
    return  NextResponse.json({url:url,name:name,age,query})    
}

export async function POST (req:NextRequest){

    const {name,age,id} =await req.json()
    

    return new NextResponse(`User ${name} Created`)
}

export async function PUT (req:NextRequest){

    const {name,age,id} =await req.json()
    

    return new NextResponse(`User ${name} Updated`)
}

export async function DELETE (req:NextRequest){

    const {id} =await req.json()
    

    return new NextResponse(`User Deleted`)
}