"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Star, Award, Globe } from "lucide-react"

export function PartnersSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const partners = [
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/DHL_Logo.svg/2560px-DHL_Logo.svg.png",
      alt: "DHL Express",
      name: "DHL",
      category: "Express Delivery",
      partnership: "5 Years",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/FedEx_Express.svg/2560px-FedEx_Express.svg.png",
      alt: "FedEx Corporation",
      name: "FedEx",
      category: "Global Shipping",
      partnership: "8 Years",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/UPS_logo_2014.svg/2560px-UPS_logo_2014.svg.png",
      alt: "United Parcel Service",
      name: "UPS",
      category: "Logistics",
      partnership: "6 Years",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Maersk_Group_Logo.svg/2560px-Maersk_Group_Logo.svg.png",
      alt: "Maersk Line",
      name: "Maersk",
      category: "Container Shipping",
      partnership: "10 Years",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Amazon_icon.svg/2048px-Amazon_icon.svg.png",
      alt: "Amazon Logistics",
      name: "Amazon",
      category: "E-commerce",
      partnership: "3 Years",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/TNT_Express_Logo.svg/2560px-TNT_Express_Logo.svg.png",
      alt: "TNT Express",
      name: "TNT",
      category: "Express Services",
      partnership: "4 Years",
    },
  ]

  const testimonials = [
    {
      quote: "Sky Flip Splash has been an exceptional partner in our global logistics operations.",
      author: "Sarah Johnson",
      company: "DHL Express",
      rating: 5,
    },
    {
      quote: "Their reliability and innovative solutions have transformed our supply chain efficiency.",
      author: "Michael Chen",
      company: "FedEx Corporation",
      rating: 5,
    },
    {
      quote: "Outstanding service quality and commitment to excellence in every shipment.",
      author: "Emma Rodriguez",
      company: "UPS Logistics",
      rating: 5,
    },
  ]

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % testimonials.length)
      }, 4000)
      return () => clearInterval(interval)
    }
  }, [isAutoPlaying, testimonials.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-12 md:py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Award className="h-4 w-4" />
            Trusted By Industry Leaders
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">OUR TRUSTED PARTNERS</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            We collaborate with the world's leading logistics and shipping companies to provide you with comprehensive
            global solutions and unmatched service quality.
          </p>
        </div>

        {/* Partner Logos Grid */}
        <div className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="group relative p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-500 hover:scale-105 border border-gray-100 hover:border-blue-200"
                style={{
                  animationDelay: `${index * 150}ms`,
                  animation: "fadeInUp 0.6s ease-out forwards",
                }}
              >
                <div className="relative overflow-hidden rounded-lg">
                  <Image
                    src={partner.src || "/placeholder.svg"}
                    alt={partner.alt}
                    width={160}
                    height={80}
                    className="h-16 w-full object-contain mx-auto grayscale group-hover:grayscale-0 transition-all duration-500 filter brightness-75 group-hover:brightness-100 group-hover:scale-110"
                  />
                </div>
                <div className="mt-4 text-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="text-sm font-semibold text-gray-800">{partner.name}</div>
                  <div className="text-xs text-blue-600">{partner.category}</div>
                  <div className="text-xs text-gray-500 mt-1">{partner.partnership} Partnership</div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="mb-16 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 border border-gray-100">
            <Globe className="h-8 w-8 text-blue-600 mx-auto mb-4" />
            <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
            <div className="text-gray-600 font-medium">Global Partners</div>
            <div className="text-sm text-gray-500 mt-1">Worldwide Network</div>
          </div>
          <div className="text-center p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 border border-gray-100">
            <Award className="h-8 w-8 text-orange-500 mx-auto mb-4" />
            <div className="text-3xl font-bold text-orange-500 mb-2">200+</div>
            <div className="text-gray-600 font-medium">Countries Covered</div>
            <div className="text-sm text-gray-500 mt-1">Global Reach</div>
          </div>
          <div className="text-center p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 border border-gray-100">
            <Star className="h-8 w-8 text-green-600 mx-auto mb-4" />
            <div className="text-3xl font-bold text-green-600 mb-2">99.8%</div>
            <div className="text-gray-600 font-medium">Success Rate</div>
            <div className="text-sm text-gray-500 mt-1">Delivery Excellence</div>
          </div>
          <div className="text-center p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 border border-gray-100">
            <div className="text-2xl mb-4">🏆</div>
            <div className="text-3xl font-bold text-purple-600 mb-2">15+</div>
            <div className="text-gray-600 font-medium">Industry Awards</div>
            <div className="text-sm text-gray-500 mt-1">Recognition</div>
          </div>
        </div>

        {/* Partner Testimonials Carousel */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>

          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">What Our Partners Say</h3>
            <p className="text-gray-600">Hear from industry leaders about their experience working with us</p>
          </div>

          <div className="relative">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 text-center px-4">
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-xl md:text-2xl text-gray-700 font-medium mb-6 italic">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="text-gray-600">
                    <div className="font-semibold text-gray-800">{testimonial.author}</div>
                    <div className="text-sm">{testimonial.company}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors duration-200"
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors duration-200"
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              <ChevronRight className="h-6 w-6 text-gray-600" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentSlide ? "bg-blue-600 scale-125" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">Interested in Becoming a Partner?</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Join our network of trusted partners and expand your global reach with our comprehensive logistics
            solutions.
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg">
            Contact Partnership Team
          </button>
        </div>
      </div>

      <style jsx>{`
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
