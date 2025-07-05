import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Warehouse, Plane, Ship, Truck } from "lucide-react"

export function ServicesSection() {
  return (
    <section id="services" className="py-16 md:py-24 bg-gray-50">
      <div className="container px-4 md:px-6 text-center">
        <div className="mb-12">
          <p className="text-blue-600 font-semibold text-sm uppercase tracking-wider mb-2">--- Services ---</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">WHAT WE DO</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="p-6 text-left shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-blue-600">
            <CardHeader className="p-0 mb-4">
              <Warehouse className="h-10 w-10 text-blue-600 mb-2" />
              <CardTitle className="text-xl font-bold text-gray-800">WARE HOUSING SERVICE</CardTitle>
            </CardHeader>
            <CardContent className="p-0 text-gray-600">
              We understand the importance of having the right product, at the right place, at the right time. We
              provide customized warehouse services.
            </CardContent>
          </Card>
          <Card className="p-6 text-left shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-blue-600">
            <CardHeader className="p-0 mb-4">
              <Plane className="h-10 w-10 text-blue-600 mb-2" />
              <CardTitle className="text-xl font-bold text-gray-800">AIR FREIGHTING SERVICE</CardTitle>
            </CardHeader>
            <CardContent className="p-0 text-gray-600">
              We provide comprehensive service in the sphere of urgent, valuable, fragile or any cargoes conscientious
              accelerated delivery by air.
            </CardContent>
          </Card>
          <Card className="p-6 text-left shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-blue-600">
            <CardHeader className="p-0 mb-4">
              <Ship className="h-10 w-10 text-blue-600 mb-2" />
              <CardTitle className="text-xl font-bold text-gray-800">OCEAN FREIGHTING SERVICE</CardTitle>
            </CardHeader>
            <CardContent className="p-0 text-gray-600">
              We provide International sea transportation, implemented by our partner vessels.
            </CardContent>
          </Card>
          <Card className="p-6 text-left shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-blue-600">
            <CardHeader className="p-0 mb-4">
              <Truck className="h-10 w-10 text-blue-600 mb-2" />
              <CardTitle className="text-xl font-bold text-gray-800">ROAD FREIGHTING SERVICE</CardTitle>
            </CardHeader>
            <CardContent className="p-0 text-gray-600">
              We provides a wide range of transportation services for cargoes & goods arriving from the ports all over
              the world.
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
