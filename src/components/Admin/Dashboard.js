/**
 * @file Dashboard.js
 * @description Displays the dashboard summary of guest data, including total guests and attending status, for both his side (Emanuele in this case) and
 *              her side (Karolina in this case).
 * @note Admin Panel is doen in English only.
 * @author Emanuele Sgroi
 * @date 19 October 2024
 */

"use client";

import React from "react";

const Dashboard = ({ guests }) => {
  // Calculations for each section
  const totalGuests = guests?.length;

  // Status totals for all guests
  const attendingYes = guests.filter(
    (guest) => guest.attending === "Yes"
  ).length;
  const attendingNo = guests.filter((guest) => guest.attending === "No").length;
  const attendingUnknown = guests.filter(
    (guest) => guest.attending === "Unknown"
  ).length;

  return (
    <div className="w-full flex flex-col jusify-start items-start">
      <h4 className="text-2xl font-bold mb-6 text-left text-[#d72660]">
        Dashboard
      </h4>

      {guests.length === 0 ? (
        <p className="text-lg text-[#d72660]">Đang tải dữ liệu...</p>
      ) : (
        <>
          {/* Section 1: Total number of guests */}
          <div className="mb-6 flex flex-col items-start border-b-2 border-[#dcb46d] pb-4 w-full">
            <h6 className="text-xl font-bold text-left text-[#d72660] mb-2">
              Tổng số khách mời
            </h6>
            <p className="text-lg text-left text-[#d72660]">
              Tổng khách: <span className="font-bold">{totalGuests}</span>
            </p>
          </div>

          {/* Section 2: Total guests by attending status */}
          <div className="mb-6 flex flex-col items-start w-full">
            <h6 className="text-xl font-bold text-left text-[#d72660] mb-2">
              Trạng thái tham dự
            </h6>
            <p className="text-lg text-left text-[#d72660]">
              Đến: <span className="font-bold">{attendingYes}</span>
            </p>
            <p className="text-lg text-left text-[#d72660]">
              Không đến: <span className="font-bold">{attendingNo}</span>
            </p>
            <p className="text-lg text-left text-[#d72660]">
              Chưa xác định: <span className="font-bold">{attendingUnknown}</span>
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
