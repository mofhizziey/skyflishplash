import { type NextRequest, NextResponse } from "next/server"
import { writeFile, readFile } from "fs/promises"
import { join } from "path"

export async function POST(request: NextRequest) {
  try {
    const { newPassword } = await request.json()

    if (!newPassword) {
      return NextResponse.json({ error: "New password is required" }, { status: 400 })
    }

    const envPath = join(process.cwd(), ".env")

    // Read current .env file
    let envContent = ""
    try {
      envContent = await readFile(envPath, "utf-8")
    } catch (error) {
      // If .env doesn't exist, create new content
      envContent = "EMAIL=info@skyshipsplash.com\nPASSWORD=Skyshipsplash10#"
    }

    // Update the PASSWORD line
    const lines = envContent.split("\n")
    let passwordLineFound = false

    const updatedLines = lines.map((line) => {
      if (line.startsWith("PASSWORD=")) {
        passwordLineFound = true
        return `PASSWORD=${newPassword}`
      }
      return line
    })

    // If PASSWORD line wasn't found, add it
    if (!passwordLineFound) {
      updatedLines.push(`PASSWORD=${newPassword}`)
    }

    // Write back to .env file
    const newEnvContent = updatedLines.join("\n")
    await writeFile(envPath, newEnvContent)

    console.log("✅ .env file updated successfully")
    console.log("New .env content:", newEnvContent)

    return NextResponse.json({
      success: true,
      message: ".env file updated successfully",
      newContent: newEnvContent,
    })
  } catch (error) {
    console.error("❌ Error updating .env file:", error)
    return NextResponse.json({ error: "Failed to update .env file" }, { status: 500 })
  }
}
