"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function VoucherForm() {
  const [formData, setFormData] = useState({
    reservationId: "",
    hotelName: "",
    customerId: "",
    startDate: "",
    endDate: "",
    amountOfNights: "",
    amountPax: "",
    plan: "",
    description: "",
    priceTable: "",
    createdAt: ""
  })

  const placeholders = {
    reservationId: "RES12345",
    hotelName: "Hotel Emporio",
    customerId: "CUST98765",
    startDate: "YYYY-MM-DD",
    endDate: "YYYY-MM-DD",
    amountOfNights: "2",
    amountPax: "2",
    plan: "Full Board",
    description: "Luxury beach resort with full amenities",
    priceTable: "$500 for 2 nights",
    createdAt: "YYYY-MM-DD"
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const url = "http://localhost:8080/generate-voucher" // Replace with your actual Crow app URL

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const htmlContent = await response.text() // Get the HTML content as text

      // Open a new tab and write the HTML content into it
      const newWindow = window.open()
      newWindow?.document.write(htmlContent)
      newWindow?.document.close() // Close the document to render the content

    } catch (error) {
      console.error('Error sending request:', error)
    }
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Generate Voucher</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="grid gap-4">
          {Object.entries(formData).map(([key, value]) => (
            <div key={key} className="grid gap-2">
              <Label htmlFor={key} className="capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </Label>
              <Input
                id={key}
                name={key}
                value={value}
                onChange={handleInputChange}
                placeholder={placeholders[key as keyof typeof placeholders]}
                required
                className="w-full"
                aria-describedby={`${key}-description`}
              />
              <p id={`${key}-description`} className="sr-only">
                Enter the {key.replace(/([A-Z])/g, ' $1').trim().toLowerCase()} for the voucher
              </p>
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">Generate Voucher</Button>
        </CardFooter>
      </form>
    </Card>
  )
}