"use client";

export default function Home() {
  const handleSetCookieButton = async () => {
    const response = await fetch("http://localhost:3001/set-cookie", {
      method: "POST",
      credentials: "include",
    });
    console.log(response);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button onClick={handleSetCookieButton}>Set Cookie</button>
    </main>
  );
}
