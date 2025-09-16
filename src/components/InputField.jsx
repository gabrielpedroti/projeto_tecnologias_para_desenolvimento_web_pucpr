import React from "react";

export default function InputField({ label, type = "text", name, value, onChange, placeholder }) {
  return (
    <div className="field">
      <label>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
      />
    </div>
  );
}
