/**
 * @file page.js
 * @description Admin panel for managing wedding guest list, bank payment details, and dashboard.
 * @date 2026-01-23
 */

"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading/Loading";
import {
  AdminLogin,
  Dashboard,
  GuestManagement,
  PaymentDetails,
} from "@/components/Admin/adminIndex";
import { MdDashboard } from "react-icons/md";
import { IoIosPeople } from "react-icons/io";
import { GiTakeMyMoney } from "react-icons/gi";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/config";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [guests, setGuests] = useState([]);

  // Kiểm tra phiên đăng nhập khi tải trang
  useEffect(() => {
    const checkAuth = () => {
      const authData = localStorage.getItem("adminAuth");
      if (authData) {
        const { authenticated, timestamp } = JSON.parse(authData);
        // Kiểm tra phiên hết hạn (24 giờ)
        const isExpired = Date.now() - timestamp > 24 * 60 * 60 * 1000;
        if (authenticated && !isExpired) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem("adminAuth");
          setIsAuthenticated(false);
        }
      }
    };

    checkAuth();
  }, []);

  // Function to log out
  const handleLogout = () => {
    setLoading(true);
    localStorage.removeItem("adminAuth");
    setIsAuthenticated(false);
    setLoading(false);
  };

  // Auto-logout on window close
  useEffect(() => {
    const handleBeforeUnload = () => {
      handleLogout();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // Real-time fetch Guests List using onSnapshot
  useEffect(() => {
    if (isAuthenticated) {
      // Get a reference to the "guests" collection
      const guestsCollectionRef = collection(db, "guests");

      // Set up real-time listener
      const unsubscribe = onSnapshot(
        guestsCollectionRef,
        (querySnapshot) => {
          try {
            const guestsArray = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setGuests(guestsArray);
            setLoading(false);
          } catch (error) {
            console.error("Error processing guests:", error);
            setLoading(false);
          }
        },
        (error) => {
          console.error("Error listening to guests:", error);
          setLoading(false);
        }
      );

      // Clean up listener on unmount or when isAuthenticated changes
      return () => unsubscribe();
    }
  }, [isAuthenticated]);

  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard guests={guests} />;
      case "guest-management":
        return <GuestManagement guests={guests} setGuests={setGuests} />;
      case "payment-details":
        return <PaymentDetails />;
      default:
        return <Dashboard guests={guests} />;
    }
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <div
      className={`relative min-h-screen flex flex-col items-center max-sm:pb-[80px] ${
        isAuthenticated ? "justify-start" : "justify-center"
      } justify-start bg-[#fffdfc] py-4 sm:px-4`}
    >
      {isAuthenticated ? (
        <>
          <h3 className="text-3xl font-bold mb-6 px-1 text-[#d72660] alex-brush">
            Admin Panel
          </h3>
          <div className="w-full flex flex-col items-center">
            <div className="w-full flex justify-center gap-4 border-b-2 border-[#dcb46d] pb-4 max-sm:px-2">
              {/* Button to go back to the home page */}
              <button
                onClick={() => router.push("/")}
                className="bg-[#f1efe8] hover:bg-[#d72660] hover:text-[#fffdfc] text-[#d72660] font-semibold py-2 px-4 rounded-lg transition duration-300 border-2 border-[#dcb46d]"
              >
                Quay lại trang chủ
              </button>
              {/* Log out button */}
              <button
                onClick={handleLogout}
                className="bg-[#d72660] hover:bg-[#c02055] text-[#fffdfc] font-semibold py-2 px-4 rounded-lg transition duration-300"
              >
                Đăng xuất
              </button>
            </div>
            {/* Button to switch between tabs for different sections */}
            <div className="max-sm:hidden w-full flex flex-wrap justify-center bg-[#f1efe8] py-2 gap-4">
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`w-full sm:w-auto py-2 px-4 text-sm sm:text-base rounded-lg font-semibold transition duration-300
      ${
        activeTab === "dashboard"
          ? "bg-[#d72660] text-[#fffdfc]"
          : "bg-transparent border-2 border-[#dcb46d] text-[#d72660] hover:bg-[#dcb46d] hover:text-[#fffdfc]"
      }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab("guest-management")}
                className={`w-full sm:w-auto py-2 px-4 text-sm sm:text-base rounded-lg font-semibold transition duration-300
      ${
        activeTab === "guest-management"
          ? "bg-[#d72660] text-[#fffdfc]"
          : "bg-transparent border-2 border-[#dcb46d] text-[#d72660] hover:bg-[#dcb46d] hover:text-[#fffdfc]"
      }`}
              >
                Guest Management
              </button>
              <button
                onClick={() => setActiveTab("payment-details")}
                className={`w-full sm:w-auto py-2 px-4 text-sm sm:text-base rounded-lg font-semibold transition duration-300
      ${
        activeTab === "payment-details"
          ? "bg-[#d72660] text-[#fffdfc]"
          : "bg-transparent border-2 border-[#dcb46d] text-[#d72660] hover:bg-[#dcb46d] hover:text-[#fffdfc]"
      }`}
              >
                Payment Details
              </button>
            </div>

            {/* MOBILE - Switch tab */}
            <div className="sm:hidden fixed bottom-0 w-full flex bg-[#f1efe8] z-[999] ">
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`text-sm flex flex-1 justify-center items-center flex-col py-3 px-2 transition duration-300
      ${
        activeTab === "dashboard"
          ? "bg-[#d72660] text-[#fffdfc]"
          : "bg-transparent text-[#d72660]"
      }`}
              >
                <MdDashboard
                  size={30}
                  className={`${
                    activeTab === "dashboard" ? "text-[#fffdfc]" : "text-[#d72660]"
                  }`}
                />
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab("guest-management")}
                className={`text-sm flex flex-1 justify-center items-center flex-col py-3 px-2 transition duration-300
      ${
        activeTab === "guest-management"
          ? "bg-[#d72660] text-[#fffdfc]"
          : "bg-transparent text-[#d72660]"
      }`}
              >
                <IoIosPeople
                  size={30}
                  className={`${
                    activeTab === "guest-management" ? "text-[#fffdfc]" : "text-[#d72660]"
                  }`}
                />
                Guests
              </button>
              <button
                onClick={() => setActiveTab("payment-details")}
                className={`text-sm flex flex-1 justify-center items-center flex-col py-3 px-2 transition duration-300
      ${
        activeTab === "payment-details"
          ? "bg-[#d72660] text-[#fffdfc]"
          : "bg-transparent text-[#d72660]"
      }`}
              >
                <GiTakeMyMoney
                  size={30}
                  className={`${
                    activeTab === "payment-details" ? "text-[#fffdfc]" : "text-[#d72660]"
                  }`}
                />
                Bank
              </button>
            </div>

            {/* Render Tab Content */}
            <div className="w-full max-w-[1500px] bg-[#fffdfc] p-4 md:p-6 shadow-xl mt-4 border-2 border-[#dcb46d] rounded-lg">
              {renderTabContent()}
            </div>
          </div>
        </>
      ) : (
        <AdminLogin onLoginSuccess={handleLoginSuccess} />
      )}
      {loading && <Loading />}
    </div>
  );
}
