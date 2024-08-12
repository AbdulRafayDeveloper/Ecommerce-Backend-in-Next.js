import { pool } from "@/app/config/db";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  try {
    const deleteCategory = await pool.query(
      "DELETE FROM categories where category_id=?",
      [params.id]
    );
    if (deleteCategory.affectedRows === 0) {
      return NextResponse.json({ status: 404, message: "Category not found" });
    } else {
      return NextResponse.json({ message: "Deleted Successfully" });
    }
  } catch (error) {
    return NextResponse.json({ status: 500, message: error.message });
  }
}

export async function GET(request, { params }) {
  try {
    const data = await pool.query(
      "Select * from categories where category_id=?",
      [params.id]
    );
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ status: 500, message: error.message });
  }
}

export async function PUT(request, { params }) {
  try {
    const { category_name, description } = await request.json();
    const { id } = params;

    const result = await pool.query(
      "UPDATE categories SET category_name = ?, description = ? WHERE category_id = ?",
      [category_name, description, id]
    );

    // Depending on your database, result may have different properties
    if (result.affectedRows > 0) {
      return NextResponse.json({
        status: 200,
        message: "Updated successfully!",
        data: { id, category_name, description },
      });
    } else {
      return NextResponse.json({
        status: 404,
        message: "Category not found or no changes made.",
      });
    }
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: error.message,
    });
  }
}
