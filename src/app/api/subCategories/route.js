import { pool } from "@/app/config/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { subcategory_name, description, id } = await request.json();

    if (!subcategory_name || !description || !id) {
      return NextResponse.json({
        status: 400,
        message: "Fields are required!",
        data: null,
      });
    }

    const [alreadyAdded] = await pool.query(
      "SELECT COUNT(*) as count FROM subcategories where subcategory_name = ?",
      subcategory_name
    );

    if (alreadyAdded.count > 0) {
      console.log("This data Already Exists");
      return NextResponse.json({
        status: 409,
        message: "This Subcategory Already Exists",
        data: null,
      });
    }

    // Insert into the database
    const addCategory = await pool.query(
      "INSERT INTO subcategories (subcategory_name, description, category_id) VALUES (?, ?, ?)",
      [subcategory_name, description, id]
    );

    return NextResponse.json({
      status: 200,
      message: "SubCategory inserted successfully!",
      data: addCategory,
    });
  } catch (e) {
    console.log("Error in insertion!", e);
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error!",
      data: null,
    });
  }
}

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT subcategories.subcategory_id, 
             subcategories.subcategory_name,
             subcategories.description, 
             categories.category_name 
      FROM subcategories 
      JOIN categories 
      ON subcategories.category_id = categories.category_id;
    `);

    return NextResponse.json({ status: 200, data: result, message: "" });
  } catch (error) {
    console.log("Error in GET:", error);
    return NextResponse.json({
      status: 500,
      message: error.message,
      data: null,
    });
  }
}
