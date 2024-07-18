import {NextResponse} from "next/server";

export async function GET(req){
    return NextResponse.json({msg:'GETがちゃんと実行された'});
}

export async function POST(req){
    const body = await req.json();
    return NextResponse.json({msg:'POSTがちゃんと実行された', data:body});
}