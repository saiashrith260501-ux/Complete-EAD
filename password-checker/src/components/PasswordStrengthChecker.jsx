import React, { useState } from "react";

const PasswordStrengthChecker = () => {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState("");

  // Function to check password strength
  const checkStrength = (pass) => {
    let score = 0;

    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    switch (score) {
      case 0:
        return "";
      case 1:
        return "Weak";
      case 2:
        return "Medium";
      case 3:
        return "Strong";
      case 4:
        return "Very Strong";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const newPass = e.target.value;
    setPassword(newPass);
    setStrength(checkStrength(newPass));
  };

  // Color based on strength
  const getColor = () => {
    switch (strength) {
      case "Weak":
        return "red";
      case "Medium":
        return "orange";
      case "Strong":
        return "#28a745";
      case "Very Strong":
        return "green";
      default:
        return "#777";
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Password Strength Checker</h2>
      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={handleChange}
        style={styles.input}
      />
      {strength && (
        <p style={{ ...styles.strengthText, color: getColor() }}>
          Strength: {strength}
        </p>
      )}
    </div>
  );
};

// Inline CSS styles
const styles = {
  container: {
    width: "100%",
    maxWidth: "400px",
    margin: "50px auto",
    padding: "30px",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
    textAlign: "center",
    fontFamily: "Poppins, sans-serif",
  },
  title: {
    marginBottom: "20px",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    outline: "none",
  },
  strengthText: {
    marginTop: "15px",
    fontWeight: "600",
    fontSize: "16px",
  },
};

export default PasswordStrengthChecker;
