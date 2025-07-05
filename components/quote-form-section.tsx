"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Mail, User } from "lucide-react"
import { useState } from "react"

export function QuoteFormSection() {
  const [filterValue, setFilterValue] = useState([20])

  return (
    <section id="contact" className="py-16 md:py-24 bg-gray-50">
      <div className="container px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="grid gap-6">
          <p className="text-blue-600 font-semibold text-sm uppercase tracking-wider">--- Request A Free Quote</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">Steps to getting A free quote</h2>
          <div className="grid gap-8 mt-6">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white font-bold text-lg">
                01
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-1">Enter Your Product Details</h3>
                <p className="text-gray-600">
                  Book your urgent deliveries for less with our unique and fast delivery services.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white font-bold text-lg">
                02
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-1">Pay Your Service Tag</h3>
                <p className="text-gray-600">
                  Service tag is a unique QR-based identification system that makes each luminaire uniquely identifiable
                  and provides maintenance.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white font-bold text-lg">
                03
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-1">Ready To Go with Your Goods.</h3>
                <p className="text-gray-600">
                  We provide innovative parcel tools that convey your products on time to the right destination.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">We Are here</h3>
          <p className="text-lg text-gray-600 mb-6">Get A Free Quote</p>
          <form className="grid gap-6">
            <div>
              <Label htmlFor="name" className="sr-only">
                Enter your name
              </Label>
              <div className="relative">
                <Input id="name" type="text" placeholder="Enter your name" className="pl-10 py-6" />
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>
            <div>
              <Label htmlFor="email" className="sr-only">
                Enter your email
              </Label>
              <div className="relative">
                <Input id="email" type="email" placeholder="Enter your email" className="pl-10 py-6" />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="filter-by">Filter By</Label>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-blue-600">${filterValue[0]}</span>
                  <span className="text-gray-500">Tn</span>
                </div>
              </div>
              <Slider
                id="filter-by"
                min={0}
                max={100}
                step={1}
                value={filterValue}
                onValueChange={setFilterValue}
                className="[&_[data-radix-slider-track]]:bg-gray-300 [&_[data-radix-slider-range]]:bg-blue-600"
              />
            </div>
            <Button type="submit" className="w-full py-6 text-lg bg-blue-600 hover:bg-blue-700 text-white">
              Submit Now
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
