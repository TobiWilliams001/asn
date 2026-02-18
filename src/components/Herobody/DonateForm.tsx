"use client";
import React, { useState } from "react";
import { lato_font, manual } from "@/styles/font";
import GlassCard from "../shared/GlassCard"; 

const DonateForm = () => {
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const PaystackPop = (await import("@paystack/inline-js")).default;

     
      const res = await fetch("/api/paystack/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, amount }),
      });

      const data = await res.json();

      
      if (!data.reference && !data.status) {
        alert("Payment initialization failed. Please check server logs.");
        setLoading(false);
        return;
      }

      const paystack = new PaystackPop();
      paystack.newTransaction({
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY as string, 
        email: email,
        amount: parseFloat(amount) * 100, 
        reference: data.reference, 
        onSuccess: (transaction: any) => {
          alert("Payment Successful! Reference: " + transaction.reference);
          setLoading(false);
        },
        onCancel: () => {
          alert("Transaction was closed.");
          setLoading(false);
        },
      });

    } catch (error) {
      console.error("Payment Error:", error);
      alert("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto relative z-10">
      <GlassCard className="!p-8 !bg-[#1a0f0f]/80 !border-white/10 shadow-2xl">
        <h3 className={`${manual.className} text-3xl text-white mb-2`}>
          Make a Donation
        </h3>
        <p className={`${lato_font.className} text-white/60 mb-8`}>
          Support African Students with a secure donation.
        </p>

        <form onSubmit={handlePayment} className="space-y-5">
          {/* Full Name Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#CC2630] uppercase tracking-wider">
              Full Name
            </label>
            <input
              type="text"
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#CC2630] transition-colors"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#CC2630] uppercase tracking-wider">
              Email Address
            </label>
            <input
              type="email"
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#CC2630] transition-colors"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Amount Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#CC2630] uppercase tracking-wider">
              Amount (₦)
            </label>
            <input
              type="number"
              required
              min="100"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#CC2630] transition-colors"
              placeholder="5000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#CC2630] to-[#ea2a33] text-white font-bold py-4 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed mt-4 shadow-lg shadow-[#CC2630]/20"
          >
            {loading ? "Processing..." : `Donate ${amount ? '₦' + Number(amount).toLocaleString() : ''}`}
          </button>
          
          <div className="text-center">
             <p className="text-[10px] text-white/30 uppercase tracking-widest">Secured by Paystack</p>
          </div>
        </form>
      </GlassCard>
    </div>
  );
};

export default DonateForm;