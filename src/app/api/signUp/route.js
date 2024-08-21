import { pool } from "../../config/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request) {
  try {
    const { username, email, password } = await request.json();

    if (!username || !email || !password) {
      console.log("Fields are required!");
      return NextResponse.json({
        status: 400,
        message: "Fields are required!",
        data: null,
      });
    }

    // Check if the account already exists
    const [userAlreadyExists] = await pool.query(
      "SELECT COUNT(*) as count FROM users WHERE email = ?",
      email
    );
    if (userAlreadyExists.count > 0) {
      console.log("This Account Already Exists");
      return NextResponse.json({
        status: 409,
        message: "This Account Already Exists",
        data: null,
      });
    }

    // Hash the password before saving it
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const role = "User";

    let insertData = await pool.query(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [username, email, hashedPassword, role]
    );

    if (insertData.affectedRows > 0) {
      console.log("Your Account has been created");
      return NextResponse.json({
        status: 200,
        message: "Your Account has been created",
        data: insertData,
      });
    } else {
      console.log("Your request cannot be submitted. Try Again Later!");
      return NextResponse.json({
        status: 400,
        message: "Your request cannot be submitted. Try Again Later!",
        data: null,
      });
    }
  } catch (e) {
    console.log("Error in Insert operation", e);
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error",
      data: null,
    });
  }
}
