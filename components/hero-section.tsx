import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Package, ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section
      className="relative h-[600px] md:h-[700px] flex items-center justify-center text-white bg-cover bg-center"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1568386332289-d51221111111?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-800/70 to-purple-800/70" />
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4 animate-fade-in-up">Shipping Made Easy</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 animate-fade-in-up delay-200">
          At Sky Flip Splash we offer the best logistic solutions, For Air freight, land freight and sea freight at a
          very affordable rate.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up delay-400">
          <Button asChild className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg rounded-full">
            <Link href="/track">
              <Package className="mr-2 h-5 w-5" />
              Track Order
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-full border-2 border-blue-600 hover:border-blue-700"
          >
            <Link href="#about">
              Learn More
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
