"use client"

import { useState } from 'react'
import { CalendarDays, ChevronLeft, ChevronRight, MoreHorizontal, Users } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { format } from 'date-fns'
import Link from 'next/link'

// Mock data aligned with the provided schema
const upcomingCheckIns = [
  { 
    id: 1, 
    clientId: 101,
    clientName: "Alice Johnson", 
    clientEmail: "alice@example.com",
    clientPhone: "+1234567890",
    hotelName: "Sunset Resort", 
    checkIn: "2023-06-22T14:00:00Z", 
    checkOut: "2023-06-27T11:00:00Z",
    amountOfNights: 5, 
    amountOfGuests: 2, 
    plan: "All Inclusive",
    pricesGrid: "$200,$200,$250,$250,$200"
  },
  { 
    id: 2, 
    clientId: 102,
    clientName: "Bob Smith", 
    clientEmail: "bob@example.com",
    clientPhone: "+1987654321",
    hotelName: "Mountain View Lodge", 
    checkIn: "2023-06-23T15:00:00Z", 
    checkOut: "2023-06-26T10:00:00Z",
    amountOfNights: 3, 
    amountOfGuests: 4, 
    plan: "Bed & Breakfast",
    pricesGrid: "$150,$175,$175"
  },
  { 
    id: 3, 
    clientId: 103,
    clientName: "Carol Davis", 
    clientEmail: "carol@example.com",
    clientPhone: "+1122334455",
    hotelName: "Beachfront Hotel", 
    checkIn: "2023-06-24T13:00:00Z", 
    checkOut: "2023-07-01T12:00:00Z",
    amountOfNights: 7, 
    amountOfGuests: 1, 
    plan: "Full Board",
    pricesGrid: "$180,$180,$180,$200,$200,$220,$220"
  },
  { 
    id: 4, 
    clientId: 104,
    clientName: "David Wilson", 
    clientEmail: "david@example.com",
    clientPhone: "+1555666777",
    hotelName: "City Center Inn", 
    checkIn: "2023-06-25T14:00:00Z", 
    checkOut: "2023-06-30T11:00:00Z",
    amountOfNights: 5, 
    amountOfGuests: 2, 
    plan: "Room Only",
    pricesGrid: "$120,$120,$120,$150,$150"
  },
  { 
    id: 5, 
    clientId: 105,
    clientName: "Eva Brown", 
    clientEmail: "eva@example.com",
    clientPhone: "+1777888999",
    hotelName: "Lakeside Resort", 
    checkIn: "2023-06-26T15:00:00Z", 
    checkOut: "2023-06-29T10:00:00Z",
    amountOfNights: 3, 
    amountOfGuests: 3, 
    plan: "Half Board",
    pricesGrid: "$220,$220,$220"
  },
]

const recentReservations = [
  { 
    id: 1, 
    clientId: 106,
    clientName: "Frank Miller", 
    clientEmail: "frank@example.com",
    clientPhone: "+1999000111",
    hotelName: "Mountain Retreat", 
    reservationDate: "2023-06-21T16:45:00Z", 
    checkIn: "2023-07-10T13:00:00Z",
    checkOut: "2023-07-11T11:00:00Z",
    amountOfNights: 1,
    amountOfGuests: 1, 
    plan: "All Inclusive",
    pricesGrid: "$300"
  },
  { 
    id: 2, 
    clientId: 107,
    clientName: "Grace Lee", 
    clientEmail: "grace@example.com",
    clientPhone: "+1222333444",
    hotelName: "Seaside Inn", 
    reservationDate: "2023-06-21T14:30:00Z", 
    checkIn: "2023-07-20T15:00:00Z",
    checkOut: "2023-07-25T10:00:00Z",
    amountOfNights: 5,
    amountOfGuests: 2, 
    plan: "Bed & Breakfast",
    pricesGrid: "$180,$180,$180,$200,$200"
  },
  { 
    id: 3, 
    clientId: 108,
    clientName: "Henry Taylor", 
    clientEmail: "henry@example.com",
    clientPhone: "+1444555666",
    hotelName: "Urban Oasis Hotel", 
    reservationDate: "2023-06-21T12:15:00Z", 
    checkIn: "2023-08-05T14:00:00Z",
    checkOut: "2023-08-07T11:00:00Z",
    amountOfNights: 2,
    amountOfGuests: 3, 
    plan: "Full Board",
    pricesGrid: "$250,$250"
  },
  { 
    id: 4, 
    clientId: 109,
    clientName: "Ivy Chen", 
    clientEmail: "ivy@example.com",
    clientPhone: "+1666777888",
    hotelName: "Riverside Lodge", 
    reservationDate: "2023-06-21T10:00:00Z", 
    checkIn: "2023-07-30T15:00:00Z",
    checkOut: "2023-08-02T10:00:00Z",
    amountOfNights: 3,
    amountOfGuests: 4, 
    plan: "Half Board",
    pricesGrid: "$220,$220,$220"
  },
  { 
    id: 5, 
    clientId: 110,
    clientName: "Jack Brown", 
    clientEmail: "jack@example.com",
    clientPhone: "+1888999000",
    hotelName: "Mountain View Resort", 
    reservationDate: "2023-06-20T18:30:00Z", 
    checkIn: "2023-09-01T13:00:00Z",
    checkOut: "2023-09-05T11:00:00Z",
    amountOfNights: 4,
    amountOfGuests: 2, 
    plan: "All Inclusive",
    pricesGrid: "$300,$300,$300,$300"
  },
]

export function PMSDashboard() {
  const [checkInPage, setCheckInPage] = useState(1)
  const [reservationPage, setReservationPage] = useState(1)
  const itemsPerPage = 3

  const paginatedCheckIns = upcomingCheckIns.slice(
    (checkInPage - 1) * itemsPerPage,
    checkInPage * itemsPerPage
  )

  const paginatedReservations = recentReservations.slice(
    (reservationPage - 1) * itemsPerPage,
    reservationPage * itemsPerPage
  )

  return (
    <div className="flex-1">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-medium">Próximos Check-ins</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingCheckIns.length}</div>
            <p className="text-xs text-muted-foreground">Próxima semana</p>
            <div className="mt-4 space-y-2 h-[300px]">
              {paginatedCheckIns.map((checkIn) => (
                <div key={checkIn.id} className="flex items-center justify-between text-sm">
                  <div className="flex flex-col">
                    <span className="font-medium">{checkIn.clientName}</span>
                    <span className="text-xs text-muted-foreground">{checkIn.hotelName}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span>{format(new Date(checkIn.checkIn), 'MMM dd, yyyy')}</span>
                    <span className="text-xs text-muted-foreground">{checkIn.amountOfNights} nights, {checkIn.amountOfGuests} guests</span>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>View details</DropdownMenuItem>
                      <DropdownMenuItem>Edit reservation</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Contact guest</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCheckInPage(page => Math.max(1, page - 1))}
                disabled={checkInPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {checkInPage} of {Math.ceil(upcomingCheckIns.length / itemsPerPage)}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCheckInPage(page => Math.min(Math.ceil(upcomingCheckIns.length / itemsPerPage), page + 1))}
                disabled={checkInPage === Math.ceil(upcomingCheckIns.length / itemsPerPage)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-medium">Reservaciones Recientes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recentReservations.length}</div>
            <p className="text-xs text-muted-foreground">Últimos 3 días</p>
            <div className="mt-4 space-y-2 h-[300px]">
              {paginatedReservations.map((reservation) => (
                <div key={reservation.id} className="flex items-center justify-between text-sm">
                  <div className="flex flex-col">
                    <span className="font-medium">{reservation.clientName}</span>
                    <span className="text-xs text-muted-foreground">{reservation.hotelName}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span>{format(new Date(reservation.reservationDate), 'MMM dd, yyyy HH:mm')}</span>
                    <span className="text-xs text-muted-foreground">{reservation.plan}</span>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>View details</DropdownMenuItem>
                      <DropdownMenuItem>Modify reservation</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Send confirmation</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setReservationPage(page => Math.max(1, page - 1))}
                disabled={reservationPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {reservationPage} of {Math.ceil(recentReservations.length / itemsPerPage)}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setReservationPage(page => Math.min(Math.ceil(recentReservations.length / itemsPerPage), page + 1))}
                disabled={reservationPage === Math.ceil(recentReservations.length / itemsPerPage)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}