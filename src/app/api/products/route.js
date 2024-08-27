import { pool } from "@/app/config/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { name, description, price, stock, category_id, subcategory_id } =
      await request.json();

    if (
      !name ||
      !description ||
      !price ||
      !stock ||
      !category_id ||
      !subcategory_id
    ) {
      return NextResponse.json({
        status: 400,
        message: "Fields are required!",
        data: null,
      });
    }

    const [alreadyAdded] = await pool.query(
      "SELECT COUNT(*) as count FROM products where name = ?",
      name
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
      "INSERT INTO products (name, description, price, stock_quantity	, category_id, subcategory_id) VALUES (?, ?, ?, ?, ?, ?)",
      [name, description, price, stock, category_id, subcategory_id]
    );

    return NextResponse.json({
      status: 200,
      message: "Product inserted successfully!",
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
  SELECT products.name,
         products.price,
         products.description, 
         products.stock_quantity,
         categories.category_name,
         subcategories.subcategory_name
  FROM products 
  JOIN categories 
  ON products.category_id = categories.category_id
  JOIN subcategories
  ON products.subcategory_id = subcategories.subcategory_id;
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
