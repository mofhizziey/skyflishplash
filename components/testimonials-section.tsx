import { Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container px-4 md:px-6 text-center">
        <div className="mb-12">
          <p className="text-blue-600 font-semibold text-sm uppercase tracking-wider mb-2 animate-fade-in-up">
            --- Testimonials ---
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 animate-fade-in-up delay-100">
            WHAT OUR CLIENTS SAY
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4 animate-fade-in-up delay-200">
            Hear directly from those who trust us with their logistics needs.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="p-6 text-left shadow-md hover:shadow-lg transition-shadow duration-300 animate-fade-in-up delay-300">
            <CardContent className="p-0">
              <Quote className="h-8 w-8 text-blue-600 mb-4" />
              <p className="text-gray-700 italic mb-4">
                &quot;Sky Flip Splash has transformed our supply chain. Their efficiency and global reach are unmatched.
                Highly recommended!&quot;
              </p>
              <p className="font-semibold text-gray-800">- Sarah Chen</p>
              <p className="text-sm text-gray-500">Logistics Manager, GlobalTech</p>
            </CardContent>
          </Card>
          <Card className="p-6 text-left shadow-md hover:shadow-lg transition-shadow duration-300 animate-fade-in-up delay-400">
            <CardContent className="p-0">
              <Quote className="h-8 w-8 text-blue-600 mb-4" />
              <p className="text-gray-700 italic mb-4">
                &quot;Their attention to detail and proactive communication made our complex international shipments a
                breeze. A true partner.&quot;
              </p>
              <p className="font-semibold text-gray-800">- David Miller</p>
              <p className="text-sm text-gray-500">Operations Director, Apex Manufacturing</p>
            </CardContent>
          </Card>
          <Card className="p-6 text-left shadow-md hover:shadow-lg transition-shadow duration-300 animate-fade-in-up delay-500">
            <CardContent className="p-0">
              <Quote className="h-8 w-8 text-blue-600 mb-4" />
              <p className="text-gray-700 italic mb-4">
                &quot;The tracking system is incredibly accurate, and their customer service team is always responsive.
                Fantastic experience overall.&quot;
              </p>
              <p className="font-semibold text-gray-800">- Emily White</p>
              <p className="text-sm text-gray-500">E-commerce Founder, QuickShip Goods</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
