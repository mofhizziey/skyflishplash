import Link from "next/link"
import { Facebook, Twitter, Dribbble, Mail, Phone } from "lucide-react"
import Image from "next/image"

export function SiteFooter() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 md:py-16">
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-8 px-4 md:px-6">
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2 font-semibold text-white">
            <Image src="/placeholder.svg?height=32&width=32" alt="Logo" width={32} height={32} className="h-8 w-8" />
            <span className="text-lg">SKY FLIP SPLASH</span>
          </Link>
          <p className="text-sm leading-relaxed">
            Sky Flip Splash is organized into three divisions offering the complete range of services to support our
            customers&apos; entire supply chain: Air &amp; Sea - transportation by air and sea, Road -.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-gray-400 hover:text-white">
              <Facebook className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white">
              <Twitter className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white">
              <Dribbble className="h-5 w-5" />
            </Link>
          </div>
        </div>
        <div className="grid gap-2">
          <h3 className="text-lg font-semibold text-white mb-2">Quick Links</h3>
          <Link href="/" className="text-sm hover:text-white">
            Home
          </Link>
          <Link href="#about" className="text-sm hover:text-white">
            About
          </Link>
          <Link href="#services" className="text-sm hover:text-white">
            Services
          </Link>
          <Link href="#news" className="text-sm hover:text-white">
            News
          </Link>
          <Link href="#contact" className="text-sm hover:text-white">
            Contact
          </Link>
        </div>
        <div className="grid gap-2">
          <h3 className="text-lg font-semibold text-white mb-2">Contact & Hours</h3>
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4" />
            <Link href="mailto:info@skyflipsplash.com" className="hover:text-white">
              info@skyflipsplash.com
            </Link>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4" />
            <Link href="tel:+1-444-xxx" className="hover:text-white">
              +1-444-XXX-XXX
            </Link>
          </div>
          <div className="mt-4 space-y-1">
            <p className="text-sm">Monday - Friday: 7:00 - 17:00</p>
            <p className="text-sm">Saturday: 7:00 - 12:00</p>
            <p className="text-sm">Holidays: 8:00 - 10:00</p>
          </div>
          <p className="text-sm mt-4">
            For more than 30 years, Sky Flip Splash has been a reliable partner in the field of logistics.
          </p>
        </div>
        <div className="grid gap-4">
          <h3 className="text-lg font-semibold text-white mb-2">Recent Post</h3>
          <div className="flex items-start gap-4">
            <Image
              src="/placeholder.svg?height=64&width=64"
              alt="News Image"
              width={64}
              height={64}
              className="rounded-md object-cover"
            />
            <div>
              <Link href="#" className="text-sm font-medium hover:text-white">
                Texas A&amp;M Students Transforms Shipping Containers
              </Link>
              <p className="text-xs text-gray-500">November 23, 2021</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Image
              src="/placeholder.svg?height=64&width=64"
              alt="News Image"
              width={64}
              height={64}
              className="rounded-md object-cover"
            />
            <div>
              <Link href="#" className="text-sm font-medium hover:text-white">
                Shipping Reacts To Energy Rankings News
              </Link>
              <p className="text-xs text-gray-500">January 1, 2022</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Image
              src="/placeholder.svg?height=64&width=64"
              alt="News Image"
              width={64}
              height={64}
              className="rounded-md object-cover"
            />
            <div>
              <Link href="#" className="text-sm font-medium hover:text-white">
                LNG Shipping Rates Just Hit $125,000 Per Day
              </Link>
              <p className="text-xs text-gray-500">January 19, 2022</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container text-center text-xs text-gray-500 mt-8 border-t border-gray-800 pt-8">
        Copyright © {new Date().getFullYear()}, Sky Flip Splash.
      </div>
    </footer>
  )
}
