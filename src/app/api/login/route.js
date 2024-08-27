import { pool } from "@/app/config/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET_KEY;

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({
        status: 400,
        message: "Fields are required!",
        data: null,
      });
    }

    // Check if the account exists
    const [registered] = await pool.query(
      "SELECT * FROM users WHERE name = ?",
      [username]
    );

    if (!registered) {
      return NextResponse.json({
        status: 400,
        message: "Account doesn't exist!",
        data: null,
      });
    }

    const checkPassword = await bcrypt.compare(password, registered.password);
    if (!checkPassword) {
      return NextResponse.json({
        status: 401,
        message: "Invalid password!",
        data: null,
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: registered.id,
        password: registered.password,
        role: registered.role,
      },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    console.log(token);
    return NextResponse.json({
      status: 200,
      message: "Logged in successfully!",
      token: token,
      data: null,
    });
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json({
      status: 500,
      message: "Failed to login. Try again...",
      data: null,
    });
  }
}

export async function GET() {
  try {
    const [result] = await pool.query(
      "SELECT * FROM users WHERE role = 'user'"
    );

    return NextResponse.json({
      status: 200,
      message: "Data fetched successfully!",
      data: result,
    });
  } catch (error) {
    console.error("Error in get:", error);
    return NextResponse.json({
      status: 500,
      message: "Error fetching data",
      data: null,
    });
  }
}
