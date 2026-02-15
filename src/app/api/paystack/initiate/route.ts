import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  const { name, email, amount } = await req.json();

  const reference = crypto.randomUUID();

  return NextResponse.json({
    name,
    email,
    amount: Number(amount) * 100, // Paystack uses kobo
    reference,
  });
}
