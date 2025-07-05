import Image from "next/image"
import { Lock, Truck } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24 bg-white">
      <div className="container px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <Image
            src="/placeholder.svg?height=500&width=700"
            alt="Logistics Workers"
            width={700}
            height={500}
            className="rounded-lg shadow-lg object-cover w-full h-auto"
          />
          <div className="absolute bottom-4 right-4 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md text-lg font-bold">
            30 Years Experience
          </div>
        </div>
        <div className="grid gap-6">
          <p className="text-blue-600 font-semibold text-sm uppercase tracking-wider">--- About Us</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
            LOGISTICS & TRANSPORT SOLUTIONS
          </h2>
          <p className="text-lg text-gray-600">Providing Full Range Of Transportation Worldwide.</p>
          <p className="text-gray-700 leading-relaxed">
            Sky Flip Splash is a representative logistics operator providing full range of service in the sphere of
            customs clearance transportation worldwide for any cargo. We pride ourselves on providing the best transport
            and shipping services available all over the world. Our skilled personnel, utilizing communications,
            tracking and processing software, combined with decades of experience! Through integrated supply chain
            solutions, Sky Flip Splash drives sustainable competitive advantages to some of UK&apos;s largest companies.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
            <Card className="p-6 border-l-4 border-orange-500 shadow-sm">
              <CardHeader className="p-0 mb-3">
                <Lock className="h-8 w-8 text-orange-500" />
                <CardTitle className="text-xl font-semibold text-gray-800">RISK MANAGEMENT</CardTitle>
              </CardHeader>
              <CardContent className="p-0 text-gray-600 text-sm">
                The All Risks coverage is based on ICC (A) conditions, the best know and most comprehensive cover in the
                world, and provides worldwide.
              </CardContent>
            </Card>
            <Card className="p-6 border-l-4 border-blue-500 shadow-sm">
              <CardHeader className="p-0 mb-3">
                <Truck className="h-8 w-8 text-blue-500" />
                <CardTitle className="text-xl font-semibold text-gray-800">ONLINE TRACKING</CardTitle>
              </CardHeader>
              <CardContent className="p-0 text-gray-600 text-sm">
                Monitor the progress and current location in real time of your consignments.
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
