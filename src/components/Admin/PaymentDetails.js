import React, { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { Input } from "@/components/ui/input";

const PaymentDetails = () => {
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fieldLabels = {
    accountHolder: "Account Holder",
    bankName: "Bank Name",
    bic: "BIC",
    iban: "IBAN",
    sortCode: "Sort Code",
    accountNumber: "Account Number",
  };

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        const docRef = doc(db, "payment_data", "currencies");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setPaymentData(docSnap.data());
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

  const handleInputChange = (currency, field, value) => {
    setPaymentData((prevData) => ({
      ...prevData,
      [currency]: {
        ...prevData[currency],
        [field]: value,
      },
    }));
  };

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
    return <div>Loading payment details...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="w-full flex flex-col jusify-start items-start">
      <h4 className="font-sans text-neutral-600 font-bold mb-4 text-left">
        Payment Details
      </h4>

      {Object.entries(paymentData).map(([currency, details]) => (
        <div
          key={currency}
          className="w-full border mb-4 p-4 flex flex-col justify-start items-start"
        >
          <h5 className="font-sans">{currency}</h5>
          {Object.entries(details).map(([field, value]) => (
            <div key={field} className="mb-4 w-full max-w-[500px]">
              <label> {fieldLabels[field] || field}</label>
              <Input
                type="text"
                value={value}
                onChange={(e) =>
                  handleInputChange(currency, field, e.target.value)
                }
                className=" border w-full focus:outline-none focus:ring-0"
              />
            </div>
          ))}
          <button
            className="p-2 rounded-sm bg-green-900 text-white font-bold"
            onClick={() => handleSave(currency)}
          >
            Save {currency} Details
          </button>
        </div>
      ))}
    </div>
  );
};

export default PaymentDetails;
