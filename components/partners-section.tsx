import Image from "next/image"

export function PartnersSection() {
  const partners = [
    "/placeholder.svg?height=80&width=160",
    "/placeholder.svg?height=80&width=160",
    "/placeholder.svg?height=80&width=160",
    "/placeholder.svg?height=80&width=160",
    "/placeholder.svg?height=80&width=160",
  ]
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container px-4 md:px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 animate-fade-in-up">OUR TRUSTED PARTNERS</h2>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {partners.map((src, index) => (
            <Image
              key={index}
              src={src || "/placeholder.svg"}
              alt={`Partner Logo ${index + 1}`}
              width={160}
              height={80}
              className="h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 100 + 100}ms` }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
