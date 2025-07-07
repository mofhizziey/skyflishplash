"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Menu, Package, Settings } from "lucide-react" // Changed User to Settings for Order Management
import Image from "next/image"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Image src="/placeholder.svg?height=32&width=32" alt="Logo" width={32} height={32} className="h-8 w-8" />
          <span className="text-lg">SKY FLIP SPLASH</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="text-gray-600 hover:text-gray-900">
            Home
          </Link>
          <Link href="#about" className="text-gray-600 hover:text-gray-900">
            About
          </Link>
          <Link href="#services" className="text-gray-600 hover:text-gray-900">
            Services
          </Link>
          <Link href="#news" className="text-gray-600 hover:text-gray-900">
            News
          </Link>
          <Link href="#contact" className="text-gray-600 hover:text-gray-900">
            Contact
          </Link>
      
        </nav>
        <Button asChild className="hidden md:flex bg-blue-600 hover:bg-blue-700 text-white">
          <Link href="/track">
            <Package className="mr-2 h-4 w-4" />
            Track Your Order
          </Link>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href="/">Home</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="#about">About</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="#services">Services</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="#news">News</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="#contact">Contact</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/track">Track Your Order</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/order-management">Order Management</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
