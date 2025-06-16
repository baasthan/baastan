"use client";
import React, { useState } from "react";

const checkboxStyle = "px-4 py-2 border rounded-full text-sm font-medium cursor-pointer transition-all duration-200";
const selectedStyle = "bg-indigo-600 text-white";
const unselectedStyle = "bg-gray-100 text-gray-800";

// ✅ Add type to state
const QuesPage = () => {
  const [selected, setSelected] = useState<Record<string, string[]>>({});

  // ✅ Add type annotations here
  const toggleOption = (questionKey: string, option: string) => {
    setSelected((prev) => {
      const current = prev[questionKey] || [];
      const isSelected = current.includes(option);
      const updated = isSelected
        ? current.filter((item) => item !== option)
        : [...current, option];
      return { ...prev, [questionKey]: updated };
    });
  };

  const renderCheckboxButtons = (questionKey: string, options: string[]) => (
    <div className="flex flex-wrap gap-3 mt-3">
      {options.map((option, idx) => {
        const isSelected = selected[questionKey]?.includes(option);
        return (
          <button
            type="button"
            key={idx}
            onClick={() => toggleOption(questionKey, option)}
            className={`${checkboxStyle} ${isSelected ? selectedStyle : unselectedStyle}`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold text-center text-indigo-700 mb-4">PG Feedback Form</h1>

      {/* Question 1 */}
      <div className="border p-5 rounded-xl shadow-md">
        <p className="font-medium">1. You are a:</p>
        <div className="space-x-4 mt-2">
          <label><input type="radio" name="userType" /> Working Professional</label>
          <label><input type="radio" name="userType" /> Student</label>
        </div>
      </div>

      {/* Question 2 */}
      <div className="border p-5 rounded-xl shadow-md">
        <p className="font-medium">2. Gender:</p>
        <div className="space-x-4 mt-2">
          <label><input type="radio" name="gender" /> Male</label>
          <label><input type="radio" name="gender" /> Female</label>
        </div>
      </div>

      {/* Question 3 */}
      <div className="border p-5 rounded-xl shadow-md">
        <p className="font-medium">3. Age group:</p>
        <div className="space-x-4 mt-2">
          <label><input type="radio" name="age" /> Below 20</label>
          <label><input type="radio" name="age" /> 21–25</label>
          <label><input type="radio" name="age" /> 26–30</label>
          <label><input type="radio" name="age" /> Above 30</label>
        </div>
      </div>

      {/* Question 4 */}
      <div className="border p-5 rounded-xl shadow-md">
        <p className="font-medium">4. Who manages your current PG?</p>
        <div className="space-y-2 mt-2">
          <label><input type="radio" name="pgManager" /> Company-operated PG</label><br />
          <label><input type="radio" name="pgManager" /> Local individual owner</label><br />
          <label><input type="radio" name="pgManager" /> Managed by college</label><br />
          <label><input type="radio" name="pgManager" /> Other: <input type="text" className="border ml-1 px-1 rounded" /></label>
        </div>
      </div>

      {/* Question 5 */}
      <div className="border p-5 rounded-xl shadow-md">
        <p className="font-medium">5. Type of PG you are currently living in:</p>
        <div className="space-x-4 mt-2">
          <label><input type="radio" name="pgType" /> Only Male</label>
          <label><input type="radio" name="pgType" /> Only Female</label>
          <label><input type="radio" name="pgType" /> Co-ed</label>
        </div>
      </div>

      {/* Question 6 */}
      <div className="border p-5 rounded-xl shadow-md">
        <p className="font-medium">6. Monthly rent you currently pay (including food and utilities):</p>
        <div className="space-y-1 mt-2">
          <label><input type="radio" name="rent" /> Less than ₹5,000</label><br />
          <label><input type="radio" name="rent" /> ₹5,001–₹7,000</label><br />
          <label><input type="radio" name="rent" /> ₹7,001–₹10,000</label><br />
          <label><input type="radio" name="rent" /> ₹10,001–₹15,000</label><br />
          <label><input type="radio" name="rent" /> Above ₹15,000</label>
        </div>
      </div>

      {/* Question 7 */}
      <div className="border p-5 rounded-xl shadow-md">
        <p className="font-medium">7. Which amenities are currently provided in your PG?</p>
        {renderCheckboxButtons("amenities", [
          "Wi-Fi", "Laundry service", "Housekeeping", "Meals",
          "CCTV Security", "AC", "Power backup", "Hot Water",
          "Parking", "Recreation Area", "Gym", "Wardrobe", "Study Table"
        ])}
      </div>

      {/* Question 8 */}
      <div className="border p-5 rounded-xl shadow-md">
        <p className="font-medium">8. Are you satisfied with the amenities?</p>
        <div className="space-x-4 mt-2">
          <label><input type="radio" name="satisfaction" /> Yes</label>
          <label><input type="radio" name="satisfaction" /> No</label>
        </div>
      </div>

      {/* Question 9 */}
      <div className="border p-5 rounded-xl shadow-md">
        <p className="font-medium">9. What problems are you facing in your PG?</p>
        {renderCheckboxButtons("problems", [
          "Poor hygiene", "Water issues", "Bad food", "Wi-Fi issues",
          "Power cuts", "No security", "Bad management", "Overcrowding",
          "Noise issues", "No major problems"
        ])}
      </div>

      {/* Question 10 */}
      <div className="border p-5 rounded-xl shadow-md">
        <p className="font-medium">10. What type of PG would you prefer?</p>
        <div className="space-x-4 mt-2">
          <label><input type="radio" name="pgPreference" /> Only Male</label>
          <label><input type="radio" name="pgPreference" /> Only Female</label>
          <label><input type="radio" name="pgPreference" /> Co-live</label>
          <label><input type="radio" name="pgPreference" /> No preference</label>
        </div>
      </div>

      {/* Question 11 */}
      <div className="border p-5 rounded-xl shadow-md">
        <p className="font-medium">11. How much would you be willing to pay for a good PG?</p>
        <div className="space-y-1 mt-2">
          {["< ₹5,000", "₹5,001–₹7,000", "₹7,001–₹10,000", "₹10,001–₹15,000", "₹15,001–₹20,000", "> ₹20,000"]
            .map((opt, idx) => (
              <div key={idx}><label><input type="radio" name="willingRent" /> {opt}</label></div>
            ))}
        </div>
      </div>

      {/* Question 12 */}
      <div className="border p-5 rounded-xl shadow-md">
        <p className="font-medium">12. Which extra facilities would you pay more for?</p>
        {renderCheckboxButtons("extras", [
          "Gym", "24/7 Security", "AC", "Single Room", "Weekend Events",
          "Fast Wi-Fi", "Library", "Personal Fridge", "TV"
        ])}
      </div>

      {/* Question 13 */}
      <div className="border p-5 rounded-xl shadow-md">
        <p className="font-medium">13. How much extra would you pay for premium facilities?</p>
        <div className="space-y-1 mt-2">
          {["₹500–₹1,000", "₹1,001–₹2,000", "₹2,001–₹3,000", "> ₹3,000", "Not willing to pay"]
            .map((opt, idx) => (
              <div key={idx}><label><input type="radio" name="extraPayment" /> {opt}</label></div>
            ))}
        </div>
      </div>

      {/* Question 14 */}
      <div className="border p-5 rounded-xl shadow-md">
        <p className="font-medium">14. Would you recommend your PG to others?</p>
        <div className="space-x-4 mt-2">
          <label><input type="radio" name="recommend" /> Yes</label>
          <label><input type="radio" name="recommend" /> No</label>
          <label><input type="radio" name="recommend" /> Maybe</label>
        </div>
      </div>
    </div>
  );
};

export default QuesPage;
