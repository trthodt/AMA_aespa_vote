import React, { useState } from "react";
import handleVote from "../content/handlevote/handlevote";

export default function PopupVote() {
  const [status, setStatus] = useState("Idle");

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>AMA Vote Tool</h3>

      <button
        style={{ ...styles.button, background: "#ec4899" }}
        onClick={() => handleVote("aespa")}
      >
        Vote AESPA
      </button>

      <button
        style={{ ...styles.button, background: "#3b82f6" }}
        onClick={() => handleVote("ateez")}
      >
        Vote ATEEZ
      </button>

      <p style={styles.status}>{status}</p>
    </div>
  );
}

const styles = {
  container: {
    position: "fixed",
    top: 20,
    right: 20,
    background: "#fff",
    padding: 12,
    borderRadius: 10,
    boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
    zIndex: 999999,
    width: 180,
  },
  title: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: "bold",
  },
  button: {
    width: "100%",
    color: "#fff",
    border: "none",
    padding: "6px",
    marginTop: 6,
    borderRadius: 6,
    cursor: "pointer",
  },
  status: {
    marginTop: 8,
    fontSize: 12,
    color: "#555",
  },
};