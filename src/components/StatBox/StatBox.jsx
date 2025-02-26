// eslint-disable-next-line no-unused-vars
import React from "react";

export default function StatBox({ label, icon, value, unit }) {
  return (
    <div className="stat-box">
      <div className={`stat-box__icon stat-box__icon--${label?.toLowerCase()}`}>
        <img src={icon} alt={label} />
      </div>
      <div>
        <p className="info-gramme">{value}{unit}</p>
        <p className="info-type">{label}</p>
      </div>
    </div>
  );
}
