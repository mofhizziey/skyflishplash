import Image from "next/image"

export function PartnersSection() {
  const partners = [
    {
      src: "https://logos-world.net/wp-content/uploads/2020/03/DHL-Logo.png",
      alt: "DHL Express",
      name: "DHL",
    },
    {
      src: "https://logos-world.net/wp-content/uploads/2020/03/FedEx-Logo.png",
      alt: "FedEx Corporation",
      name: "FedEx",
    },
    {
      src: "https://logos-world.net/wp-content/uploads/2020/03/UPS-Logo.png",
      alt: "United Parcel Service",
      name: "UPS",
    },
    {
      src: "https://logos-world.net/wp-content/uploads/2021/02/Maersk-Logo.png",
      alt: "Maersk Line",
      name: "Maersk",
    },
    {
      src: "https://logos-world.net/wp-content/uploads/2021/08/Amazon-Logo.png",
      alt: "Amazon Logistics",
      name: "Amazon",
    },
  ]

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container px-4 md:px-6 text-center">
        <div className="mb-4">
          <p className="text-blue-600 font-semibold text-sm uppercase tracking-wider mb-2">
            --- Trusted By Industry Leaders
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">OUR TRUSTED PARTNERS</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We collaborate with the world's leading logistics and shipping companies to provide you with comprehensive
            global solutions.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-items-center">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="group relative p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 w-full max-w-[200px]"
              style={{ animationDelay: `${index * 100 + 100}ms` }}
            >
              <Image
                src={partner.src || "/placeholder.svg"}
                alt={partner.alt}
                width={160}
                height={80}
                className="h-12 w-auto object-contain mx-auto grayscale group-hover:grayscale-0 transition-all duration-300 filter brightness-75 group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
            </div>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-6 bg-white rounded-lg shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105">
            <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
            <div className="text-gray-600 font-medium">Global Partners</div>
            <div className="text-sm text-gray-500 mt-1">Worldwide Network</div>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105">
            <div className="text-3xl font-bold text-orange-500 mb-2">200+</div>
            <div className="text-gray-600 font-medium">Countries Covered</div>
            <div className="text-sm text-gray-500 mt-1">Global Reach</div>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105">
            <div className="text-3xl font-bold text-green-600 mb-2">24/7</div>
            <div className="text-gray-600 font-medium">Support Available</div>
            <div className="text-sm text-gray-500 mt-1">Always Connected</div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm">
            Interested in becoming a partner?
            <span className="text-blue-600 hover:text-blue-700 cursor-pointer font-medium ml-1 transition-colors duration-300">
              Contact us today
            </span>
          </p>
        </div>
      </div>
    </section>
  )
}
