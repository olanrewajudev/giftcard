import React, { useState, useEffect } from "react";

export default function Table() {
  const [cards, setCards] = useState([]);

  const fetchCards = async () => {
    try {
      const response = await fetch(
        "https://www.server.finesseoasis.com.ng/api/cards"
      );
      const data = await response.json();
      setCards(data);
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <div className="bg-gray-200 text-black max-w-4xl w-full p-6 rounded-md mb-10">
      <h2 className="text-xl text-blue-600 mb-4">Saved Cards</h2>

      {cards.length === 0 ? (
        <p>No cards saved yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-400">
            <thead>
              <tr className="bg-gray-300 text-left">
                <th className="border border-gray-400 px-4 py-2">ID</th>
                <th className="border border-gray-400 px-4 py-2">Card Number</th>
                <th className="border border-gray-400 px-4 py-2">Created At</th>
              </tr>
            </thead>

            <tbody>
              {cards.map((card) => (
                <tr key={card.id} className="hover:bg-gray-100">
                  <td className="border border-gray-400 px-4 py-2">
                    {card.id}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {card.cardNumber}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {new Date(card.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
