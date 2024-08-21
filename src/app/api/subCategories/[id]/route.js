import { pool } from "@/app/config/db";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    if (!params) {
      return NextResponse.json({
        status: 400,
        message: "Fields are required!",
        data: null,
      });
    }
    const deleteCategory = await pool.query(
      "DELETE FROM subcategories WHERE subcategory_id = ?",
      [id]
    );

    if (deleteCategory.affectedRows === 0) {
      return NextResponse.json({
        status: 404,
        data: null,
        message: "Category not found",
      });
    } else {
      return NextResponse.json({
        status: 200, // Set the success status code
        data: null,
        message: "Deleted successfully",
      });
    }
  } catch (error) {
    return NextResponse.json({
      status: 500,
      data: null,
      message: error.message,
    });
  }
}

export async function GET(request, { params }) {
  try {
    const data = await pool.query(
      "Select * from subcategories where subcategory_id=?",
      [params.id]
    );
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: error.message,
      data: null,
    });
  }
}

export async function PUT(request, { params }) {
  try {
    const { subcategory_name, description, category_id } = await request.json();
    const { id } = params;

    if (!subcategory_name || !description || !category_id) {
      return NextResponse.json({
        status: 400,
        message: "Fields are required!",
        data: null,
      });
    }

    const result = await pool.query(
      "UPDATE subcategories SET subcategory_name = ?, description = ?, category_id = ? WHERE subcategory_id = ?",
      [subcategory_name, description, category_id, id]
    );
    if (result.affectedRows > 0) {
      return NextResponse.json({
        status: 200,
        message: "Updated successfully!",
        data: { id, subcategory_name, description },
      });
    } else {
      return NextResponse.json({
        status: 404,
        message: "Category not found or no changes made.",
        data: null,
      });
    }
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: error.message,
      data: null,
    });
  }
}
