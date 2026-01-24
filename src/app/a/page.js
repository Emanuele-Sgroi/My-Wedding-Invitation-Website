/**
 * @file page.js
 * @description Short URL redirect to admin panel
 * @date 2026-01-23
 */

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ShortAdminRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to admin panel
    router.push("/admin");
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Đang chuyển hướng đến Admin Panel...
        </h1>
        <p className="text-gray-600">Vui lòng chờ...</p>
      </div>
    </div>
  );
}
