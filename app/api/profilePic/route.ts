import { NextResponse } from "next/server";




export async function POST(request: Request){
    const body = await request.body;
    
    return NextResponse.json({id:'19928'});
}