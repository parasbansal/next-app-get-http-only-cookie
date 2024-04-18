"use client";

import { api } from "@/util/api.util";

export default function Home() {
  const handleSetCookieButton1 = async (num: number) => {
    try {
      const response = await api.get(`/delayed-response-1`, {
        params: { delay: num },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSetCookieButton2 = async () => {
    const response = await api.get("/delayed-response-2?delay=6");
    console.log(response);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-24">
      <button onClick={() => handleSetCookieButton1(5)}>
        Delayed response 1
      </button>
      <button onClick={handleSetCookieButton2}>Delayed response 2</button>
      <button onClick={() => handleSetCookieButton1(2)}>
        Delayed response 1
      </button>
    </main>
  );
}
