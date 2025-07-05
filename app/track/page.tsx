import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { TrackPackageSection } from "@/components/track-package-section"

export default function TrackPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <TrackPackageSection />
      </main>
      <SiteFooter />
    </div>
  )
}
