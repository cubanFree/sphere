import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");

    const supabase = createRouteHandlerClient({ cookies });
    
    // If a code is provided, exchange it for a session and redirect to Identify with the user ID
    if (code) {
        try {
            
            await supabase.auth.exchangeCodeForSession(code);
            const { data: { user } } = await supabase.auth.getUser();
            if (user.app_metadata.provider === "github") {
                return NextResponse.redirect(new URL("/home", request.url));
            } else {
                return NextResponse.redirect(new URL(`/auth/identify?id=${user.id}`, request.url));
            }
        } catch (error) {
            console.error("Error al intercambiar código por sesión:", error.message);
            return NextResponse.redirect(new URL("/auth", request.url));
        }
    }

    // If no code is provided, redirect to the login page
    console.error("No se proporcionó un código de intercambio");
    return NextResponse.redirect(new URL("/auth", request.url));
}
