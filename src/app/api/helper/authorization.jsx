import { pool } from "@/app/config/db";
import { jwtVerify } from "jose";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET_KEY;

async function authorization(request, requiredRole) {
  const token = request.headers.get("authorization")?.split(" ")[1];
  if (!token) {
    return {
      status: 401,
      message: "Token not found!",
      data: null,
    };
  }

  //   String to cryptogrphic functions(Uint8Array) => [new TextEncoder().encode(JWT_SECRET)]
  try {
    const decoded = jwt.verify(token, new TextEncoder().encode(JWT_SECRET));
    console.log("Decoded Token : ", decoded);
    const [rows] = await pool.query("SELECT role FROM users WHERE id = ?", [
      decoded.id,
    ]);

    if (rows.length === 0) {
      return {
        status: 403,
        message: "User not found!",
        data: null,
      };
    }

    const userRole = rows[0].role;
    if (requiredRole && userRole !== requiredRole) {
      return {
        status: 403,
        message: "Access Denied!",
        data: null,
      };
    }

    return {
      status: 200,
      message: "Authorization successful!",
      data: {
        user: payload,
        role: userRole,
      },
    };
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return {
        status: 401,
        message: "Token expired!",
        data: null,
      };
    } else {
      return {
        status: 403,
        message: "Invalid Token!",
        data: null,
      };
    }
  }
}

export default authorization;
