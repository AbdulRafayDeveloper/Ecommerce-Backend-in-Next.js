import { pool } from "@/app/config/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const role = "User";
    const result = await pool.query(
      "SELECT `id`, `name`, `email`, `role` FROM `users` WHERE `role` = ?",
      [role]
    );
    console.log("Database response:", result);
    return NextResponse.json({ status: 200, result: result });
  } catch (error) {
    console.log("Error in GET:", error);
    return NextResponse.json({ status: 500, message: error.message });
  }
}
