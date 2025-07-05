export function StatsSection() {
  return (
    <section className="py-16 md:py-24 bg-blue-600 text-white">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div className="animate-fade-in-up delay-100">
            <h3 className="text-5xl font-bold mb-2">
              350<span className="text-orange-300">+</span>
            </h3>
            <p className="text-lg">Projects Completed</p>
          </div>
          <div className="animate-fade-in-up delay-200">
            <h3 className="text-5xl font-bold mb-2">
              99<span className="text-orange-300">%</span>
            </h3>
            <p className="text-lg">Client Satisfaction</p>
          </div>
          <div className="animate-fade-in-up delay-300">
            <h3 className="text-5xl font-bold mb-2">
              20<span className="text-orange-300">+</span>
            </h3>
            <p className="text-lg">Years Experience</p>
          </div>
          <div className="animate-fade-in-up delay-400">
            <h3 className="text-5xl font-bold mb-2">
              150<span className="text-orange-300">+</span>
            </h3>
            <p className="text-lg">Countries Covered</p>
          </div>
        </div>
      </div>
    </section>
  )
}
