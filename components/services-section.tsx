"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Warehouse, Plane, Ship, Truck, Clock, Shield, Globe, ArrowRight, CheckCircle, Star } from "lucide-react"
import { useState } from "react"

export function ServicesSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const services = [
    {
      icon: Warehouse,
      title: "WAREHOUSE SERVICES",
      description:
        "We understand the importance of having the right product, at the right place, at the right time. We provide customized warehouse services.",
      features: ["Climate Controlled", "24/7 Security", "Inventory Management", "Real-time Tracking"],
      stats: { capacity: "50,000 sq ft", locations: "15+ Locations" },
      color: "blue",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      icon: Plane,
      title: "AIR FREIGHT SERVICES",
      description:
        "We provide comprehensive service in the sphere of urgent, valuable, fragile or any cargoes conscientious accelerated delivery by air.",
      features: ["Express Delivery", "Temperature Control", "Fragile Handling", "Global Network"],
      stats: { speed: "24-48 Hours", coverage: "200+ Countries" },
      color: "orange",
      gradient: "from-orange-500 to-orange-600",
    },
    {
      icon: Ship,
      title: "OCEAN FREIGHT SERVICES",
      description:
        "We provide International sea transportation, implemented by our partner vessels with comprehensive tracking and insurance.",
      features: ["Container Shipping", "Bulk Cargo", "Port-to-Port", "Door-to-Door"],
      stats: { capacity: "10,000+ TEU", routes: "Major Ports" },
      color: "teal",
      gradient: "from-teal-500 to-teal-600",
    },
    {
      icon: Truck,
      title: "ROAD FREIGHT SERVICES",
      description:
        "We provide a wide range of transportation services for cargoes & goods arriving from the ports all over the world.",
      features: ["Last Mile Delivery", "Cross Border", "Heavy Cargo", "Express Service"],
      stats: { fleet: "500+ Vehicles", coverage: "Pan-European" },
      color: "green",
      gradient: "from-green-500 to-green-600",
    },
  ]

  const additionalServices = [
    { icon: Clock, title: "24/7 Support", description: "Round-the-clock customer service" },
    { icon: Shield, title: "Insurance Coverage", description: "Comprehensive cargo protection" },
    { icon: Globe, title: "Global Network", description: "Worldwide logistics solutions" },
  ]

  return (
    <section
      id="services"
      className="py-16 md:py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-teal-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-6 py-3 rounded-full text-sm font-semibold mb-6 hover:bg-blue-200 transition-colors duration-300">
            <Star className="h-4 w-4" />
            Premium Services
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-gray-800 to-blue-600 bg-clip-text text-transparent">
            WHAT WE DO
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive logistics solutions tailored to meet your business needs with cutting-edge technology and
            unmatched expertise.
          </p>
        </div>

        {/* Main Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <Card
                key={index}
                className={`group relative p-0 text-left shadow-lg hover:shadow-2xl transition-all duration-500 border-0 overflow-hidden cursor-pointer transform hover:scale-105 ${
                  hoveredCard === index ? "ring-2 ring-blue-400 ring-opacity-50" : ""
                }`}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  animationDelay: `${index * 150}ms`,
                  animation: "slideInUp 0.6s ease-out forwards",
                }}
              >
                {/* Gradient Header */}
                <div
                  className={`h-2 bg-gradient-to-r ${service.gradient} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}
                ></div>

                {/* Card Content */}
                <div className="p-8">
                  <CardHeader className="p-0 mb-6">
                    <div
                      className={`relative inline-flex items-center justify-center w-16 h-16 bg-${service.color}-100 rounded-xl mb-4 group-hover:bg-${service.color}-200 transition-colors duration-300`}
                    >
                      <IconComponent
                        className={`h-8 w-8 text-${service.color}-600 group-hover:scale-110 transition-transform duration-300`}
                      />
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300`}
                      ></div>
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                      {service.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="p-0">
                    <p className="text-gray-600 mb-6 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                      {service.description}
                    </p>

                    {/* Features List */}
                    <div
                      className={`space-y-2 mb-6 transform transition-all duration-500 ${
                        hoveredCard === index ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                      }`}
                    >
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2 text-sm">
                          <CheckCircle className={`h-4 w-4 text-${service.color}-500`} />
                          <span className="text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Stats */}
                    <div
                      className={`grid grid-cols-2 gap-4 mb-6 transform transition-all duration-500 delay-100 ${
                        hoveredCard === index ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                      }`}
                    >
                      {Object.entries(service.stats).map(([key, value], statIndex) => (
                        <div key={statIndex} className="text-center">
                          <div className={`text-lg font-bold text-${service.color}-600`}>{value}</div>
                          <div className="text-xs text-gray-500 capitalize">{key}</div>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <Button
                      className={`w-full bg-gradient-to-r ${service.gradient} hover:shadow-lg transform transition-all duration-300 hover:scale-105 text-white border-0 ${
                        hoveredCard === index ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                      }`}
                      style={{ transitionDelay: "200ms" }}
                    >
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </CardContent>
                </div>

                {/* Hover Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`}
                ></div>
              </Card>
            )
          })}
        </div>

        {/* Additional Services */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-16 border border-gray-100">
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Additional Services</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive support services to ensure your logistics operations run smoothly and efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {additionalServices.map((service, index) => {
              const IconComponent = service.icon
              return (
                <div
                  key={index}
                  className="text-center group hover:bg-gray-50 p-6 rounded-xl transition-all duration-300 hover:scale-105"
                  style={{
                    animationDelay: `${(index + 4) * 150}ms`,
                    animation: "fadeInUp 0.6s ease-out forwards",
                  }}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4 group-hover:bg-blue-200 transition-colors duration-300">
                    <IconComponent className="h-8 w-8 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    {service.title}
                  </h4>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Process Steps */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white">
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Our Process</h3>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Simple, efficient, and transparent logistics process designed for your success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {["Quote Request", "Planning & Booking", "Transportation", "Delivery & Tracking"].map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-4">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-opacity-30 transition-all duration-300 group-hover:scale-110">
                    <span className="text-xl font-bold">{index + 1}</span>
                  </div>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-6 left-full w-full h-0.5 bg-white bg-opacity-30"></div>
                  )}
                </div>
                <h4 className="font-semibold mb-2 group-hover:text-blue-200 transition-colors duration-300">{step}</h4>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Ready to Get Started?</h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Contact our logistics experts today and discover how we can optimize your supply chain operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg">
              Get Free Quote
            </Button>
            <Button
              variant="outline"
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 bg-transparent"
            >
              Schedule Consultation
            </Button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}
