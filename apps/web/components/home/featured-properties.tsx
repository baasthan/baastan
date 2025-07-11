const FeaturedProperties = () => {
  const featuredProperties = [
    {
      id: 1,
      name: "Elite Residency",
      location: "Koramangala, Bangalore",
      price: "₹12,000",
      rating: 4.8,
      reviews: 124,
      image: "/pg-images/elite.png?height=200&width=300",
      amenities: ["WiFi", "AC", "Parking", "Food"],
      type: "Single Room",
      verified: true,
      liked: false,
    },
    {
      id: 2,
      name: "Urban Nest",
      location: "Gurgaon, Delhi NCR",
      price: "₹15,000",
      rating: 4.6,
      reviews: 89,
      image: "/pg-images/urban.png?height=200&width=300",
      amenities: ["WiFi", "Gym", "Food", "Laundry"],
      type: "Shared Room",
      verified: true,
      liked: true,
    },
    {
      id: 3,
      name: "Comfort Zone",
      location: "Bandra, Mumbai",
      price: "₹18,000",
      rating: 4.9,
      reviews: 156,
      image: "/pg-images/comfort.png",
      amenities: ["WiFi", "AC", "Food", "Security"],
      type: "Single Room",
      verified: true,
      liked: false,
    },
    {
      id: 4,
      name: "Student Hub",
      location: "Anna Nagar, Chennai",
      price: "₹10,000",
      rating: 4.5,
      reviews: 67,
      image: "/pg-images/sikkim.png",
      amenities: ["WiFi", "Study Room", "Food", "AC"],
      type: "Shared Room",
      verified: true,
      liked: false,
    },
  ];
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Properties
            </h2>
            <p className="text-gray-600 text-lg">
              Handpicked premium PG accommodations
            </p>
          </div>
          <button className="border border-primary text-primary hover:bg-primary/10 bg-transparent px-4 py-2 rounded-md font-medium transition-colors flex items-center">
            View All
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProperties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-lg shadow-md border-0 hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group"
            >
              <div className="relative">
                <img
                  src={property.image || "/placeholder.svg"}
                  alt={property.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  {property.verified && (
                    <span className="bg-green-500 text-white px-2 py-1 rounded-md text-xs font-medium flex items-center">
                      <svg
                        className="w-3 h-3 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Verified
                    </span>
                  )}
                </div>
                <div className="absolute top-3 right-3 flex space-x-2">
                  <button
                    className={`w-8 h-8 p-0 rounded-full bg-white/80 hover:bg-white transition-colors ${
                      property.liked ? "text-red-500" : "text-gray-600"
                    }`}
                  >
                    <svg
                      className="w-4 h-4 mx-auto"
                      fill={property.liked ? "currentColor" : "none"}
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>
                  <button className="w-8 h-8 p-0 rounded-full bg-white/80 hover:bg-white text-gray-600 transition-colors">
                    <svg
                      className="w-4 h-4 mx-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                      />
                    </svg>
                  </button>
                </div>
                <div className="absolute bottom-3 left-3">
                  <span className="bg-white/90 text-gray-900 px-2 py-1 rounded-md text-xs font-medium">
                    {property.type}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                    {property.name}
                  </h3>
                  <div className="text-right">
                    <div className="text-lg font-bold text-primary">
                      {property.price}
                    </div>
                    <div className="text-xs text-gray-500">per month</div>
                  </div>
                </div>

                <div className="flex items-center text-gray-600 mb-3">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm">{property.location}</span>
                </div>

                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-sm font-medium ml-1">
                      {property.rating}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500 ml-2">
                    ({property.reviews} reviews)
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {property.amenities.slice(0, 3).map((amenity, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-xs font-medium"
                    >
                      {amenity}
                    </span>
                  ))}
                  {property.amenities.length > 3 && (
                    <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-xs font-medium">
                      +{property.amenities.length - 3} more
                    </span>
                  )}
                </div>

                <button className="w-full bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-md font-medium transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
