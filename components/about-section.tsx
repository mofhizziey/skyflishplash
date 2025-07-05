import Image from "next/image"
import { Lock, Truck, Globe, Clock, Shield, Package } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24 bg-white">
      <div className="container px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative group">
          <Image
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
            alt="Logistics warehouse with workers and cargo containers"
            width={700}
            height={500}
            className="rounded-lg shadow-lg object-cover w-full h-auto transition-all duration-500 group-hover:shadow-2xl group-hover:scale-[1.02]"
          />
          <div className="absolute bottom-4 right-4 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md text-lg font-bold transition-all duration-300 hover:bg-blue-700 hover:scale-105">
            30+ Years Experience
          </div>
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-lg shadow-md text-sm font-semibold transition-all duration-300 hover:bg-white">
            Trusted Worldwide
          </div>
        </div>
        <div className="grid gap-6">
          <p className="text-blue-600 font-semibold text-sm uppercase tracking-wider transition-all duration-300 hover:text-blue-700">
            --- About Us
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight transition-all duration-300 hover:text-blue-600">
            LOGISTICS & TRANSPORT SOLUTIONS
          </h2>
          <p className="text-lg text-gray-600 font-medium">Providing Full Range Of Transportation Worldwide.</p>
          <p className="text-gray-700 leading-relaxed">
            Sky Flip Splash is a representative logistics operator providing full range of service in the sphere of
            customs clearance transportation worldwide for any cargo. We pride ourselves on providing the best transport
            and shipping services available all over the world. Our skilled personnel, utilizing communications,
            tracking and processing software, combined with decades of experience! Through integrated supply chain
            solutions, Sky Flip Splash drives sustainable competitive advantages to some of UK&apos;s largest companies.
          </p>

          {/* Statistics */}
          <div className="grid grid-cols-3 gap-4 my-6 p-6 bg-gray-50 rounded-lg">
            <div className="text-center transition-all duration-300 hover:scale-105">
              <div className="text-2xl font-bold text-blue-600">500+</div>
              <div className="text-sm text-gray-600">Happy Clients</div>
            </div>
            <div className="text-center transition-all duration-300 hover:scale-105">
              <div className="text-2xl font-bold text-orange-500">50+</div>
              <div className="text-sm text-gray-600">Countries</div>
            </div>
            <div className="text-center transition-all duration-300 hover:scale-105">
              <div className="text-2xl font-bold text-green-600">99.9%</div>
              <div className="text-sm text-gray-600">On-Time Delivery</div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
            <Card className="p-6 border-l-4 border-orange-500 shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-105 hover:border-orange-600 group">
              <CardHeader className="p-0 mb-3">
                <Lock className="h-8 w-8 text-orange-500 transition-all duration-300 group-hover:scale-110" />
                <CardTitle className="text-xl font-semibold text-gray-800 transition-colors duration-300 group-hover:text-orange-600">
                  RISK MANAGEMENT
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 text-gray-600 text-sm">
                The All Risks coverage is based on ICC (A) conditions, the best known and most comprehensive cover in
                the world, and provides worldwide protection.
              </CardContent>
            </Card>

            <Card className="p-6 border-l-4 border-blue-500 shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-105 hover:border-blue-600 group">
              <CardHeader className="p-0 mb-3">
                <Truck className="h-8 w-8 text-blue-500 transition-all duration-300 group-hover:scale-110" />
                <CardTitle className="text-xl font-semibold text-gray-800 transition-colors duration-300 group-hover:text-blue-600">
                  ONLINE TRACKING
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 text-gray-600 text-sm">
                Monitor the progress and current location in real time of your consignments with our advanced tracking
                system.
              </CardContent>
            </Card>

            <Card className="p-6 border-l-4 border-green-500 shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-105 hover:border-green-600 group">
              <CardHeader className="p-0 mb-3">
                <Globe className="h-8 w-8 text-green-500 transition-all duration-300 group-hover:scale-110" />
                <CardTitle className="text-xl font-semibold text-gray-800 transition-colors duration-300 group-hover:text-green-600">
                  GLOBAL NETWORK
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 text-gray-600 text-sm">
                Extensive worldwide network ensuring seamless logistics solutions across all major trade routes.
              </CardContent>
            </Card>

            <Card className="p-6 border-l-4 border-purple-500 shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-105 hover:border-purple-600 group">
              <CardHeader className="p-0 mb-3">
                <Clock className="h-8 w-8 text-purple-500 transition-all duration-300 group-hover:scale-110" />
                <CardTitle className="text-xl font-semibold text-gray-800 transition-colors duration-300 group-hover:text-purple-600">
                  24/7 SUPPORT
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 text-gray-600 text-sm">
                Round-the-clock customer support to assist you with any logistics challenges or inquiries.
              </CardContent>
            </Card>

            <Card className="p-6 border-l-4 border-red-500 shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-105 hover:border-red-600 group">
              <CardHeader className="p-0 mb-3">
                <Shield className="h-8 w-8 text-red-500 transition-all duration-300 group-hover:scale-110" />
                <CardTitle className="text-xl font-semibold text-gray-800 transition-colors duration-300 group-hover:text-red-600">
                  SECURE HANDLING
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 text-gray-600 text-sm">
                Advanced security protocols and handling procedures to ensure your cargo arrives safely and intact.
              </CardContent>
            </Card>

            <Card className="p-6 border-l-4 border-yellow-500 shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-105 hover:border-yellow-600 group">
              <CardHeader className="p-0 mb-3">
                <Package className="h-8 w-8 text-yellow-500 transition-all duration-300 group-hover:scale-110" />
                <CardTitle className="text-xl font-semibold text-gray-800 transition-colors duration-300 group-hover:text-yellow-600">
                  CUSTOM SOLUTIONS
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 text-gray-600 text-sm">
                Tailored logistics solutions designed to meet your specific business requirements and industry needs.
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg">
              Get Quote Now
            </Button>
            <Button
              variant="outline"
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 bg-transparent"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
