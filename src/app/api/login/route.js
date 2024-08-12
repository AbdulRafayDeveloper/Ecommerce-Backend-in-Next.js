import { pool } from "@/app/config/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET_KEY;

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      console.log("Fields are required!");
      return NextResponse.json({
        status: 400,
        message: "Fields are required!",
      });
    }

    // Check if the account already exists
    const [registered] = await pool.query(
      "SELECT * FROM users WHERE name = ?",
      [username]
    );

    if (!registered) {
      console.log("Account doesn't exist!");
      return NextResponse.json({
        status: 400,
        message: "Account doesn't exist!",
      });
    }

    const checkPassword = await bcrypt.compare(password, registered.password);
    if (!checkPassword) {
      console.log("Invalid password!");
      return NextResponse.json({
        status: 408,
        message: "Invalid password!",
      });
    }

    // Keep logged in
    const token = jwt.sign(
      {
        id: registered.id,
        Email: registered.userEmail,
        role: registered.role,
      },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    return NextResponse.json({
      status: 200,
      message: "Logged in successfully!",
      data: token,
    });
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json({
      message: "Failed to login. Try again...",
      status: 500,
    });
  }
}

export async function GET() {
  try {
    const result = await pool.query(
      "SELECT * FROM `users` WHERE `role` = 'User'"
    );
    return NextResponse.json({
      status: 200,
      message: "Data fetched successfully!",
      data: result,
    });
  } catch (e) {
    console.log("Error in get: ", e);
    return NextResponse.json({ status: 500, message: e.message });
  }
}
