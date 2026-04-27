import React, { useState } from "react";
import handleVote from "../content/handlevote/handlevote";

export default function PopupVote() {
  const [status, setStatus] = useState("Idle");

  return (
    <div className="fixed top-5 right-5 w-48 bg-white p-4 rounded-xl shadow-lg z-[999999]">
      <h3 className="text-sm font-bold mb-2 text-gray-800">
        AMA Vote Tool
      </h3>

      <button className="w-full hover:opacity-80 py-1 rounded-md mb-2 border border-black" onClick={() => handleVote("aespa")}>
        Vote AESPA
      </button>

      <button className="w-full hover:opacity-80 py-1 rounded-md border border-black" onClick={() => handleVote("ateez")}>
        Vote ATEEZ
      </button>
    </div>
  );
}
