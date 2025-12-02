"use client";
import { useState } from "react";
import PaystackPop from "@paystack/inline-js";

export default function DonateForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();

    // 💬 Send donor info to the backend to create transaction reference
    const res = await fetch("/api/paystack/initiate", {
      method: "POST",
      body: JSON.stringify({ name, email, amount }),
    });

    const data = await res.json();

    const paystack = new PaystackPop();
    paystack.newTransaction({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
      email: data.email,
      amount: data.amount,
      reference: data.reference,
      onSuccess: () => {
        window.location.href = `/payment/processing?ref=${data.reference}`;
      },
      onCancel: () => alert("Donation cancelled"),
    });
  };

  return (
    <form onSubmit={handleDonate} className="flex flex-col gap-x-4 gap-y-5 w-full max-w-[650px]">
      <input
        type="text"
        required
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 outline-none rounded-xl h-12"
      />
      <input
        type="email"
        required
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 outline-none rounded-xl h-12"
      />
      <input
        type="text"
        required
        placeholder="Amount (NGN)"
        value={amount}
        onChange={(e) => setAmount(e.target.value.replace(/[^0-9]/g, ''))}
        className="border p-2 outline-none rounded-xl h-12"
      />

      <button type="submit" className="bg-[#CC2630] text-white p-2 rounded-lg h-12">
        Donate
      </button>
    </form>
  );
}
