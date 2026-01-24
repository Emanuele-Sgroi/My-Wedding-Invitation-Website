/**
 * @file PaymentDetails.js
 * @description This component fetches and displays payment details (like IBAN, bank name, etc.) for different currencies from Firebase Firestore.
 * The admin can edit and save updates to these details, and the updates will be reflected in Firestore.
 * @author Emanuele Sgroi
 * @date 19 October 2024
 */

import React, { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { Input } from "@/components/ui/input";

const PaymentDetails = () => {
  const [paymentData, setPaymentData] = useState(null); // State to store payment data
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage errors
  // Define labels name
  const fieldLabels = {
    accountHolder: "Account Holder",
    bankName: "Bank Name",
    bic: "BIC",
    iban: "IBAN",
    sortCode: "Sort Code",
    accountNumber: "Account Number",
  };

  // Fetch payment data on component mount
  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        const docRef = doc(db, "payment_data", "currencies");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setPaymentData(docSnap.data()); // Set fetched data to state
        } else {
          console.log("No such document!");
          setError("No payment data found.");
        }
      } catch (err) {
        console.error("Error fetching payment data:", err);
        setError("Failed to fetch payment data.");
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentData();
  }, []);

  // Handle input change for payment details
  const handleInputChange = (currency, field, value) => {
    setPaymentData((prevData) => ({
      ...prevData,
      [currency]: {
        ...prevData[currency],
        [field]: value,
      },
    }));
  };

  // Save updated payment details for a currency
  const handleSave = async (currency) => {
    try {
      const docRef = doc(db, "payment_data", "currencies");

      // Update only the specific currency
      await updateDoc(docRef, {
        [currency]: paymentData[currency],
      });

      alert(`${currency} payment details updated successfully.`);
    } catch (err) {
      console.error("Error updating payment data:", err);
      alert(`Failed to update ${currency} payment details.`);
    }
  };

  if (loading) {
    return <div className="text-lg text-[#d72660]">Đang tải thông tin thanh toán...</div>;
  }

  if (error) {
    return <div className="text-lg text-[#d72660]">{error}</div>;
  }

  return (
    <div className="w-full flex flex-col jusify-start items-start">
      <h4 className="text-2xl font-bold mb-6 text-left text-[#d72660]">
        Thông tin thanh toán
      </h4>

      {/* Iterate through payment data and display editable form */}
      {Object.entries(paymentData).map(([currency, details]) => (
        <div
          key={currency}
          className="w-full border-2 border-[#dcb46d] mb-4 p-4 flex flex-col justify-start items-start rounded-lg"
        >
          <h5 className="text-xl font-bold text-[#d72660] mb-4">{currency}</h5>
          {Object.entries(details).map(([field, value]) => (
            <div key={field} className="mb-4 w-full max-w-[500px]">
              <label className="text-[#d72660] font-semibold mb-1 block">
                {fieldLabels[field] || field}
              </label>
              <Input
                type="text"
                value={value}
                onChange={(e) =>
                  handleInputChange(currency, field, e.target.value)
                }
                className="border-2 border-[#dcb46d] w-full focus:outline-none focus:ring-2 focus:ring-[#d72660] bg-[#fffdfc] text-[#d72660]"
              />
            </div>
          ))}
          <button
            className="p-3 rounded-lg bg-[#dcb46d] hover:bg-[#d72660] text-[#fffdfc] font-bold transition duration-300"
            onClick={() => handleSave(currency)}
          >
            Lưu thông tin {currency}
          </button>
        </div>
      ))}
    </div>
  );
};

export default PaymentDetails;
