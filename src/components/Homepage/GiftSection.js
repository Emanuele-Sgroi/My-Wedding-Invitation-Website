/**
 * @file GiftSection.js
 * @description This component handles the Gift section of the wedding website, allowing guests to unlock payment details via a password-protected dialog. It supports copying payment details to the clipboard.
 *              Admin can use a different password that redirect to the admin panel when entered.
 * @author Emanuele Sgroi
 * @date 19 October 2024
 */

import React, { useState, useRef, useEffect } from "react";
import images from "@/utils/imagesImport";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import translations from "@/utils/translations";

const GiftSection = ({ language }) => {
  // Destructure translation strings
  const {
    title,
    description_1,
    description_2,
    description_3,
    description_4,
    button,
    thanks,
    error_from_api,
  } = translations[language].registry_section;

  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState(""); // Error message text
  const [paymentInfo, setPaymentInfo] = useState(null); // Stores payment info
  const [dialogOpen, setDialogOpen] = useState(false); // Track dialog open state
  const dialogRef = useRef(null); // Reference to adjust the dialog position

  // Variants for the framer motion animation
  const primaryVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  const secondaryVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, delay: 0.1 } },
  };

  // Function to adjust dialog position when the keyboard is visible
  const handleInputFocus = () => {
    if (dialogRef.current) {
      dialogRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Render a custom dashed line on screen
  const dashedLine = Array(3)
    .fill()
    .map((_, index) => (
      <div key={index} className="w-[2px] h-[5px] my-[3px] bg-gold" />
    ));

  // Load QR code from public folder (no Firebase Storage needed)
  const loadPaymentInfo = async () => {
    setLoading(true);
    setErrorText("");
    try {
      // QR code is stored in public/images folder - completely free!
      // Just set paymentInfo to indicate QR code is available
      setPaymentInfo({ qrCode: "/images/qr-code.png" });
      setErrorText("");
    } catch (error) {
      setErrorText(error_from_api);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Handle dialog open - load payment info every time dialog opens
  const handleDialogOpenChange = (open) => {
    setDialogOpen(open);
    if (open) {
      loadPaymentInfo();
    }
  };


  // Effect to handle scrolling when inputs are focused (mobile)
  useEffect(() => {
    const inputElements = document.querySelectorAll("input");
    inputElements.forEach((input) => {
      input.addEventListener("focus", handleInputFocus);
    });

    return () => {
      inputElements.forEach((input) => {
        input.removeEventListener("focus", handleInputFocus);
      });
    };
  }, []);

  return (
    <section
      id="gift-section"
      className="relative bg-blue px-4 sm:px-12 py-12 flex items-center flex-col overflow-hidden"
    >
      {/* Title */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={primaryVariants}
        viewport={{ once: true, amount: 0.2 }}
        className="w-full flex flex-col items-center px-4 z-10 mb-8 md:mb-12"
      >
        <Image
          src={images.glass}
          alt="glass"
          width={95}
          height={95}
          quality={100}
          className="mb-4 w-[90px] h-auto brightness-95"
        />
        <div className="flex flex-col justify-center items-center">
          <h3 translate="no" className="text-white font-bold z-20 ">
            {title.main}
          </h3>
          <h3
            translate="no"
            className="text-gold text-6xl sm:text-8xl alex-brush z-10 transform font-light -mt-8 md:-mt-10"
          >
            {title.sub}
          </h3>
        </div>
      </motion.div>

      <div className="relative w-full max-w-[700px] text-white text-center flex flex-col items-center z-10">
        <motion.p
          initial="hidden"
          whileInView="visible"
          variants={secondaryVariants}
          viewport={{ once: true, amount: 0.2 }}
          translate="no"
          className=" text-center mb-4"
        >
          {description_1}
        </motion.p>
        {dashedLine}
        <motion.p
          initial="hidden"
          whileInView="visible"
          variants={secondaryVariants}
          viewport={{ once: true, amount: 0.2 }}
          translate="no"
          className=" text-center my-4"
        >
          {description_2}
        </motion.p>
        {dashedLine}
        <motion.p
          initial="hidden"
          whileInView="visible"
          variants={secondaryVariants}
          viewport={{ once: true, amount: 0.2 }}
          translate="no"
          className=" text-center my-4"
        >
          {description_3}
        </motion.p>
        {dashedLine}
        <motion.p
          initial="hidden"
          whileInView="visible"
          variants={secondaryVariants}
          viewport={{ once: true, amount: 0.2 }}
          translate="no"
          className=" text-center my-4"
        >
          {description_4}
        </motion.p>
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={secondaryVariants}
          viewport={{ once: true, amount: 0.2 }}
        >
          <Dialog open={dialogOpen} onOpenChange={handleDialogOpenChange}>
            <DialogTrigger
              translate="no"
              className="bg-transparent text-gold border border-gold px-3 py-2 rounded-full mt-6  transition-all duration-300 hover:bg-gold hover:text-white"
            >
              {button}
            </DialogTrigger>
            <DialogContent
              ref={dialogRef}
              className="max-h-[90vh] sm:max-w-[580px] max-sm:w-[95%] max-sm:p-2 max-sm:rounded-md"
            >
              <DialogHeader>
                <DialogTitle
                  translate="no"
                  className="text-[22px] md:text-3xl font-bold"
                >
                  {loading ? "Đang tải..." : paymentInfo ? "QR Code Chuyển Khoản" : "Thông tin ngân hàng"}
                </DialogTitle>
                <DialogDescription className="flex flex-col items-center">
                  {loading && (
                    <div className="w-full flex justify-center items-center py-8">
                      <p translate="no">Đang tải QR code...</p>
                    </div>
                  )}
                  {!loading && errorText.length > 0 && (
                    <span
                      translate="no"
                      className="text-red-500 mt-2 text-lg"
                    >
                      {errorText}
                    </span>
                  )}
                </DialogDescription>
              </DialogHeader>
              {paymentInfo && !loading && (
                <div className="w-full h-full max-h-[75svh] relative overflow-auto flex flex-col justify-center items-center px-4 py-6 gap-6">
                  {/* QR Code Display - Loaded from public/images folder (FREE!) */}
                  <div className="w-full flex flex-col items-center justify-center">
                    <Image
                      src="/images/qr-code.png"
                      alt="QR Code for Bank Transfer"
                      width={300}
                      height={300}
                      quality={100}
                      className="w-[280px] h-[280px] md:w-[300px] md:h-[300px] object-contain bg-white p-4 rounded-lg shadow-lg"
                      onError={(e) => {
                        // If QR code image doesn't exist, show helpful message
                        e.target.style.display = 'none';
                        const errorDiv = e.target.nextElementSibling;
                        if (!errorDiv || !errorDiv.classList.contains('qr-error')) {
                          const errorMsg = document.createElement('div');
                          errorMsg.className = 'qr-error text-center text-gray-600';
                          errorMsg.innerHTML = `
                            <p>QR code chưa được thêm vào.</p>
                            <p class="text-sm mt-2">Vui lòng đặt file QR code tại: <code class="bg-gray-200 px-2 py-1 rounded">public/images/qr-code.png</code></p>
                            <p class="text-xs mt-2 text-gray-500">QR code not added. Please place QR code file at: <code class="bg-gray-200 px-2 py-1 rounded">public/images/qr-code.png</code></p>
                          `;
                          e.target.parentElement.appendChild(errorMsg);
                        }
                      }}
                    />
                    <p translate="no" className="text-center text-sm text-gray-600 mt-4">
                      Võ Như Quỳnh / ViettinBank: 107879751877
                    </p>
                    <p translate="no" className="text-center text-sm text-gray-600 mt-4">
                      Quét mã QR để chuyển khoản / Scan QR code to transfer
                    </p>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </motion.div>

        <Image
          src={images.divider}
          alt={`divider`}
          width={650}
          height={0}
          quality={100}
          className={`w-[160px] h-auto mt-12 mb-8 `}
        />

        <motion.h3
          initial="hidden"
          whileInView="visible"
          variants={primaryVariants}
          viewport={{ once: true, amount: 0.2 }}
          translate="no"
          className="font-bold text-center text-gold"
        >
          {thanks}
        </motion.h3>
      </div>
      <Image
        src={images.la2}
        alt={`Line art 1`}
        width={650}
        height={0}
        quality={100}
        className={`max-md:hidden absolute w-[250px] md:w-[350px] lg:w-[450px] top-24 xl:top-72 right-0 xl:right-16 z-0 opacity-30 transform rotate-[45deg]`}
      />
      <Image
        src={images.la3}
        alt={`Line art 2`}
        width={650}
        height={0}
        quality={100}
        className={`max-md:hidden w-[250px] md:w-[350px] lg:w-[450px] absolute bottom-20 xl:bottom-32 left-0 z-0 opacity-30 transform scale-x-[-1] rotate-[45deg]`}
      />
    </section>
  );
};

export default GiftSection;
