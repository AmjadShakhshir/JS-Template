import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  try {
    // Use modern Clerk auth protection
    await auth.protect();
    
    return NextResponse.json({ 
      isAdmin: true,
      message: "Admin access granted"
    });
  } catch {
    return NextResponse.json(
      { isAdmin: false, message: "Authentication required" },
      { status: 401 }
    );
  }
}
