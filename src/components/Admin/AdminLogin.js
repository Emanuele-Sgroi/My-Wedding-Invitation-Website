/**
 * @file AdminLogin.js
 * @description Component for admin login with password authentication
 * @date 2026-01-23
 */

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaLock } from "react-icons/fa";
import Loading from "@/components/Loading/Loading";

export default function AdminLogin({ onLoginSuccess }) {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/auth/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Lưu thông tin đăng nhập vào localStorage
        localStorage.setItem("adminAuth", JSON.stringify({
          authenticated: true,
          timestamp: Date.now()
        }));
        onLoginSuccess();
      } else {
        setErrorMessage(data.error || "Đăng nhập thất bại");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Có lỗi xảy ra khi đăng nhập");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#fffdfc] p-4">
      <div className="bg-[#fffdfc] p-8 rounded-lg shadow-xl w-full max-w-md border-2 border-[#dcb46d]">
        <h2 className="text-3xl font-bold text-center mb-6 text-[#d72660] alex-brush">
          Admin Panel
        </h2>
        
        {errorMessage && (
          <div className="bg-[#ffe3ec] border border-[#d72660] text-[#d72660] px-4 py-3 rounded mb-4 text-center">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#d72660] mb-2">
              Mật khẩu
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaLock className="text-[#dcb46d]" />
              </span>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-[#dcb46d] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d72660] focus:border-transparent bg-[#fffdfc] text-[#d72660] placeholder-[#dcb46d]"
                placeholder="Nhập mật khẩu"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#dcb46d] hover:bg-[#d72660] text-[#fffdfc] font-semibold py-3 px-4 rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>

        <button
          onClick={() => router.push("/")}
          className="w-full mt-4 bg-[#f1efe8] hover:bg-[#d72660] hover:text-[#fffdfc] text-[#d72660] font-semibold py-3 px-4 rounded-lg transition duration-300 border-2 border-[#dcb46d]"
        >
          Quay lại trang chủ
        </button>
      </div>

      {loading && <Loading />}
    </div>
  );
}
