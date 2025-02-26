// eslint-disable-next-line no-unused-vars
import React from "react";
import StatBox from "../StatBox/StatBox";
import calorieIcon from "../../assets/calorie.png";
import glucideIcon from "../../assets/glucide.png";
import proteineIcon from "../../assets/proteine.png";
import lipideIcon from "../../assets/lipide.png";

const nutrientMapping = {
  calorieCount: { label: "Calories", icon: calorieIcon, unit: "kCal" },
  proteinCount: { label: "Proteines", icon: proteineIcon, unit: "g" },
  carbohydrateCount: { label: "Glucides", icon: glucideIcon, unit: "g" },
  lipidCount: { label: "Lipides", icon: lipideIcon, unit: "g" },
};

export default function NutrientCards({ infoGen }) {
  return (
    <>
      {infoGen && infoGen.keyData && Object.entries(infoGen.keyData).map(([key, value]) => {
        const { label, icon, unit } = nutrientMapping[key] || { label: "", icon: null, unit: "" };
        return (
          <StatBox
            key={key}
            label={label}
            value={value}
            unit={unit}
            icon={icon}
          />
        );
      })}
    </>
  );
}
