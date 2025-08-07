import { NextResponse } from "next/server";
import { checkIsAdmin } from "@/lib/auth";

export async function GET() {
  try {
    const isAdmin = await checkIsAdmin();
    
    return NextResponse.json({ 
      isAdmin,
      message: isAdmin ? "Admin access granted" : "Admin access denied"
    });
  } catch {
    return NextResponse.json(
      { isAdmin: false, message: "Authentication check failed" },
      { status: 500 }
    );
  }
}
