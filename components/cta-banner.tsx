import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTABanner() {
  return (
    <section className="relative py-20 md:py-32 bg-blue-700 text-white overflow-hidden">
      <div className="container px-4 md:px-6 text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-6 animate-fade-in-up">
          READY TO OPTIMIZE YOUR LOGISTICS?
        </h2>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-10 animate-fade-in-up delay-200">
          Get a free quote today and let our experts handle your shipping needs with precision and care.
        </p>
        <Button
          asChild
          className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-7 text-lg rounded-full shadow-lg animate-fade-in-up delay-300"
        >
          <Link href="#contact">
            Request a Free Quote
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
      {/* Background blobs for modern look */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob-one" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob-two animation-delay-2000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-600 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob-three animation-delay-4000" />
    </section>
  )
}
