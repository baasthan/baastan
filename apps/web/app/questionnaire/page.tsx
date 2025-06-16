import React from "react";
import MultipleSelectQuestion from "../../components/multiple-select-question";

export default function QuestionnairePage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-primary">Questionnaire</h1>

      <MultipleSelectQuestion
        question="Which amenities are currently provided in your PG? (Select all that apply)"
        options={[
          "Wi-Fi",
          "Laundry service",
          "Housekeeping",
          "Meals (Breakfast/Lunch/Dinner)",
          "CCTV Security",
          "Air Conditioning",
          "Power backup",
          "Geyser/Hot Water",
          "Parking",
          "Recreational/Common Area",
          "Gym/Fitness Facilities",
          "Personal Wardrobe",
          "Study Table",
        ]}
      />

      <MultipleSelectQuestion
        question="What problems are you currently facing in your PG? (Select all that apply)"
        options={[
          "Poor hygiene/cleanliness",
          "Water issues",
          "Irregular food quality/timing",
          "Wi-Fi not working properly",
          "Power cuts",
          "Lack of security",
          "Unresponsive PG management",
          "Overcrowding",
          "Noise issues",
          "No major problems",
        ]}
      />

      <MultipleSelectQuestion
        question="Which additional facilities would you be willing to pay extra for? (Select all that apply)"
        options={[
          "Gym",
          "24/7 Security Guard",
          "Air Conditioning",
          "Single Occupancy Room",
          "Weekend Recreation/Events",
          "High-speed Wi-Fi",
          "Study Lounge/Library Area",
          "Personal Refrigerator",
          "In-room TV",
        ]}
      />
    </div>
  );
}
