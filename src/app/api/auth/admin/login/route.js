/**
 * @file route.js
 * @description API endpoint for admin password authentication
 * @date 2026-01-23
 */

import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { password } = await request.json();

    // Kiểm tra mật khẩu từ environment variables
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_ACCESS_PASSWORD;

    if (!adminPassword) {
      return NextResponse.json(
        { error: "Cấu hình mật khẩu admin không tồn tại" },
        { status: 500 }
      );
    }

    // So sánh mật khẩu (sử dụng equals cho đơn giản, có thể cải tiến với hash)
    if (password === adminPassword) {
      return NextResponse.json(
        { success: true, message: "Đăng nhập thành công" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: "Mật khẩu không đúng" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json(
      { error: "Có lỗi xảy ra khi xử lý đăng nhập" },
      { status: 500 }
    );
  }
}
