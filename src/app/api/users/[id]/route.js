import { pool } from "@/app/config/db";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  try {
    const deleteUser = await pool.query("DELETE FROM users where id=?", [
      params.id,
    ]);
    if (deleteUser.affectedRows === 0) {
      return NextResponse.json({ status: 404, message: "User not found" });
    } else {
      return NextResponse.json({ message: "Deleted Successfully" });
    }
  } catch (error) {
    return NextResponse.json({ status: 500, message: error.message });
  }
}
