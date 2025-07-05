import { ShieldCheck, Globe, Users, Headset } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function WhyChooseUsSection() {
  return (
    <section id="why-choose-us" className="py-16 md:py-24 bg-white">
      <div className="container px-4 md:px-6 text-center">
        <div className="mb-12">
          <p className="text-blue-600 font-semibold text-sm uppercase tracking-wider mb-2 animate-fade-in-up">
            --- Why Choose Us ---
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 animate-fade-in-up delay-100">
            DELIVERING EXCELLENCE, GLOBALLY
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4 animate-fade-in-up delay-200">
            We are dedicated to providing seamless, reliable, and innovative logistics solutions tailored to your needs.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="p-6 text-left shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up delay-300">
            <CardHeader className="p-0 mb-4">
              <ShieldCheck className="h-10 w-10 text-green-600 mb-2" />
              <CardTitle className="text-xl font-bold text-gray-800">Reliable & Secure</CardTitle>
            </CardHeader>
            <CardContent className="p-0 text-gray-600">
              Your cargo&apos;s safety is our top priority. We ensure secure handling and timely delivery.
            </CardContent>
          </Card>
          <Card className="p-6 text-left shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up delay-400">
            <CardHeader className="p-0 mb-4">
              <Globe className="h-10 w-10 text-purple-600 mb-2" />
              <CardTitle className="text-xl font-bold text-gray-800">Global Network</CardTitle>
            </CardHeader>
            <CardContent className="p-0 text-gray-600">
              Extensive network spanning continents, connecting you to every major trade route.
            </CardContent>
          </Card>
          <Card className="p-6 text-left shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up delay-500">
            <CardHeader className="p-0 mb-4">
              <Users className="h-10 w-10 text-orange-600 mb-2" />
              <CardTitle className="text-xl font-bold text-gray-800">Experienced Team</CardTitle>
            </CardHeader>
            <CardContent className="p-0 text-gray-600">
              Our team of logistics experts brings decades of experience to every challenge.
            </CardContent>
          </Card>
          <Card className="p-6 text-left shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up delay-600">
            <CardHeader className="p-0 mb-4">
              <Headset className="h-10 w-10 text-red-600 mb-2" />
              <CardTitle className="text-xl font-bold text-gray-800">24/7 Support</CardTitle>
            </CardHeader>
            <CardContent className="p-0 text-gray-600">
              Dedicated customer support available around the clock to assist you.
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
