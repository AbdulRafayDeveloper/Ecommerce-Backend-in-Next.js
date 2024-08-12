import { pool } from "@/app/config/db";
import { data } from "@/app/data/data";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { category_name, description } = await request.json();
    if (!category_name || !description) {
      console.log("Fields are required!");
      return NextResponse.json({
        status: 400,
        message: "Fields are required!",
      });
    }

    const [alreadyAdded] = await pool.query(
      "SELECT COUNT(*) as count FROM categories where category_name = ?",
      category_name
    );

    if (alreadyAdded.count > 0) {
      console.log("This Category Already Exists");
      return NextResponse.json({
        status: 409,
        message: "This Category Already Exists",
      });
    }
    const addCategory = await pool.query(
      "INSERT into categories (category_name, description) VALUES(?, ?)",
      [category_name, description]
    );
    return NextResponse.json({
      status: 200,
      message: "Category inserted successfully!",
      addCategory,
    });
  } catch (e) {
    console.log("Error in insertion!", e);
    return NextResponse.json({ status: 500, message: "Internal Sever Error!" });
  }
}

export async function GET() {
  try {
    const role = "User";
    const result = await pool.query("SELECT * from categories");
    // console.log("Database response:", result);
    return NextResponse.json({ status: 200, result: result });
  } catch (error) {
    console.log("Error in GET:", error);
    return NextResponse.json({ status: 500, message: error.message });
  }
}
