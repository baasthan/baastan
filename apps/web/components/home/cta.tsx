const Cta = () => {
  return (
    <section className="py-16 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Ready to Find Your Perfect PG?
        </h2>
        <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
          Join thousands of students and professionals who found their ideal
          accommodation through our platform
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-primary hover:bg-gray-100 px-6 py-3 rounded-md font-semibold transition-colors">
            Start Searching
          </button>
          <button className="border border-white text-white hover:bg-white hover:text-primary bg-transparent px-6 py-3 rounded-md font-semibold transition-colors">
            List Your Property
          </button>
        </div>
      </div>
    </section>
  );
};

export default Cta;
