"use client";

import { PageButtonLoader } from "@/components/Button/buttonload";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProcessingPage() {
  const params = useSearchParams();
  const reference = params.get("ref");
  const [status, setStatus] = useState("Verifying...");

  useEffect(() => {
    const verify = async () => {
      const res = await fetch("/api/paystack/verify", {
        method: "POST",
        body: JSON.stringify({ reference }),
      });
      const data = await res.json();

      if (data.status && data.data.status === "success") {
        setStatus("Donation successful!");
      } else {
        setStatus("Verification failed or pending.");
      }
    };

    verify();
  }, [reference]);

  return <div className="flex justify-center items-center w-full min-h-screen" >
    {status === "Verifying..." ? 
    <div className='h-screen w-screen flex justify-center items-center' >
        <div>
            <div className='h-[60px] w-[60px]' >
                <PageButtonLoader />
            </div>
            <p className="mt-4 text-center text-lg">{status}</p>
        </div>
    </div> : 
    <div>
        <h1 className=" text-xl">{status}</h1>
        <button className="bg-[#CC2630] text-white p-2 rounded-lg h-12 mt-7 mx-auto w-full" onClick={() => window.location.href = '/'} >
            Go to Home
        </button>
    </div>
    }
  </div>;
}
