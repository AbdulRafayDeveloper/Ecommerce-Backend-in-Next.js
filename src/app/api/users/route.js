import { pool } from "@/app/config/db";
import { NextResponse } from "next/server";
import authorization from "@/app/api/helper/authorization";

export async function GET(request) {
  try {
    const authResponse = await authorization(request, "admin");
    if (authResponse.status !== 200) {
      return NextResponse.json(authResponse);
    }
    const role = "User";
    const rows = await pool.query(
      "SELECT `id`, `name`, `email` FROM `users` WHERE `role` = ?",
      [role]
    );

    return NextResponse.json({ status: 200, message: "", data: rows });
  } catch (error) {
    console.log("Error in GET:", error);
    return NextResponse.json({ status: 500, message: error.message });
  }
}
