const QuesPage = () => {
  return (
    <div className="min-h-screen bg-white py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-indigo-700 mb-10">
          🏠 PG Feedback Form
        </h1>

        <form className="space-y-8">
          {questions.map((question, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
            >
              <p className="font-semibold text-lg text-gray-800 mb-4">
                {index + 1}. {question.title}
              </p>

              {/* Responsive layout: for questions with grid layout, show 3 columns on desktop and 1 column on mobile */}
              <div
                className={
                  question.layout.includes("grid")
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                    : "space-y-2"
                }
              >
                {question.options.map((option, i) => (
                  <label
                    key={i}
                    className="flex items-start space-x-2 text-gray-700"
                  >
                    <input
                      type={question.multiple ? "checkbox" : "radio"}
                      name={question.name}
                      className="mt-1 accent-indigo-600"
                    />
                    <span className="break-words">{option}</span>
                  </label>
                ))}

                {question.includeTextInput && (
                  <input
                    type="text"
                    placeholder="Please specify..."
                    className="border mt-3 px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                )}
              </div>
            </div>
          ))}

          <div className="text-center">
            <button
              type="submit"
              className="mt-4 px-6 py-3 bg-indigo-600 text-white text-lg rounded-full shadow hover:bg-indigo-700 transition-all duration-300"
            >
              Submit Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const questions = [
  {
    title: "You are a:",
    name: "userType",
    multiple: false,
    layout: "space-y-2",
    options: ["Working Professional", "Student"]
  },
  {
    title: "Gender:",
    name: "gender",
    multiple: false,
    layout: "space-y-2",
    options: ["Male", "Female"]
  },
  {
    title: "Age group:",
    name: "age",
    multiple: false,
    layout: "space-y-2",
    options: ["Below 20", "21–25", "26–30", "Above 30"]
  },
  {
    title: "Who manages your current PG?",
    name: "pgManager",
    multiple: false,
    layout: "space-y-2",
    options: [
      "Company-operated PG (e.g., Stanza, Zolo)",
      "Local individual owner",
      "Managed by a college/university",
      "Other:"
    ],
    includeTextInput: true
  },
  {
    title: "Type of PG you are currently living in:",
    name: "pgType",
    multiple: false,
    layout: "space-y-2",
    options: ["Only Male", "Only Female", "Co-ed (Both genders)"]
  },
  {
    title: "Monthly rent you currently pay (including food and utilities):",
    name: "rent",
    multiple: false,
    layout: "space-y-2",
    options: [
      "Less than ₹5,000",
      "₹5,001–₹7,000",
      "₹7,001–₹10,000",
      "₹10,001–₹15,000",
      "Above ₹15,000"
    ]
  },
  {
    title: "Which amenities are currently provided in your PG? (Select all that apply)",
    name: "amenities",
    multiple: true,
    layout: "grid grid-cols-2 gap-2",
    options: [
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
      "Study Table"
    ]
  },
  {
    title: "Are you satisfied with the amenities provided?",
    name: "satisfaction",
    multiple: false,
    layout: "space-y-2",
    options: ["Yes", "No"]
  },
  {
    title: "What problems are you currently facing in your PG? (Select all that apply)",
    name: "problems",
    multiple: true,
    layout: "grid grid-cols-2 gap-2",
    options: [
      "Poor hygiene/cleanliness",
      "Water issues",
      "Irregular food quality/timing",
      "Wi-Fi not working properly",
      "Power cuts",
      "Lack of security",
      "Unresponsive PG management",
      "Overcrowding",
      "Noise issues",
      "No major problems"
    ]
  },
  {
    title: "What type of PG would you prefer to stay in?",
    name: "pgPreference",
    multiple: false,
    layout: "space-y-2",
    options: ["Only Male", "Only Female", "Co-live (Both genders)", "No preference"]
  },
  {
    title: "How much would you be willing to pay monthly for a well-maintained PG with all necessary amenities?",
    name: "willingRent",
    multiple: false,
    layout: "space-y-2",
    options: [
      "Less than ₹5,000",
      "₹5,001–₹7,000",
      "₹7,001–₹10,000",
      "₹10,001–₹15,000",
      "₹15,001–₹20,000",
      "More than ₹20,000"
    ]
  },
  {
    title: "Which additional facilities would you be willing to pay extra for?",
    name: "extras",
    multiple: true,
    layout: "grid grid-cols-2 gap-2",
    options: [
      "Gym",
      "24/7 Security Guard",
      "Air Conditioning",
      "Single Occupancy Room",
      "Weekend Recreation/Events",
      "High-speed Wi-Fi",
      "Study Lounge/Library Area",
      "Personal Refrigerator",
      "In-room TV"
    ]
  },
  {
    title: "How much extra would you be willing to pay for these premium facilities?",
    name: "extraPayment",
    multiple: false,
    layout: "space-y-2",
    options: [
      "₹500–₹1,000",
      "₹1,001–₹2,000",
      "₹2,001–₹3,000",
      "More than ₹3,000",
      "Not willing to pay extra"
    ]
  },
  {
    title: "Would you recommend your current PG to others?",
    name: "recommend",
    multiple: false,
    layout: "space-y-2",
    options: ["Yes", "No", "Maybe"]
  }
];

export default QuesPage;
