'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { CirclePlus, PlusCircle, MinusCircle } from 'lucide-react'
import { DateRange } from 'react-day-picker'

// Mock guest data
const mockGuests = [
  { id: 1, name: 'John Doe', lastName: 'Doe', email: 'john@example.com', phoneNumber: '1234567890' },
  { id: 2, name: 'Jane Smith', lastName: 'Smith', email: 'jane@example.com', phoneNumber: '0987654321' },
]

export default function ReservationForm() {
  const [isOpen, setIsOpen] = useState(false)
  const [isRoomDialogOpen, setIsRoomDialogOpen] = useState(false)
  const [guestSearch, setGuestSearch] = useState('')
  const [guestData, setGuestData] = useState<any>(null)
  const [hotelName, setHotelName] = useState('')
  const [plan, setPlan] = useState('')
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [rooms, setRooms] = useState([{ adults: 1, childrenAges: [] }])
  const [dateRanges, setDateRanges] = useState<DateRange[]>([{ from: new Date(), to: new Date() }])

  const handleGuestSearch = () => {
    const guest = mockGuests.find(g => g.name.toLowerCase().includes(guestSearch.toLowerCase()))
    if (guest) {
      setGuestData(guest)
    } else {
      setGuestData({ name: '', lastName: '', email: '', phoneNumber: '' })
    }
  }

  const handleRoomChange = (index: number, field: 'adults' | 'childrenAges', value: number | number[]) => {
    setRooms(prev => {
      const newRooms = [...prev]
      newRooms[index] = { ...newRooms[index], [field]: value }
      return newRooms
    })
  }

  const addRoom = () => {
    setRooms(prev => [...prev, { adults: 1, childrenAges: [] }])
  }

  const removeRoom = (index: number) => {
    setRooms(prev => prev.filter((_, i) => i !== index))
  }

  const addDateRange = () => {
    setDateRanges(prev => [...prev, { from: new Date(), to: new Date() }])
  }

  const removeDateRange = (index: number) => {
    setDateRanges(prev => prev.filter((_, i) => i !== index))
  }

  const getTotalGuests = () => {
    const adults = rooms.reduce((sum, room) => sum + room.adults, 0)
    const children = rooms.reduce((sum, room) => sum + room.childrenAges.length, 0)
    return `${rooms.length} ${rooms.length === 1 ? 'Room' : 'Rooms'}, ${adults} Adults, ${children} Children`
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <CirclePlus size={32}/>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-[540px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-4xl font-normal">Nueva reservación</SheetTitle>
        </SheetHeader>
        <div className="grid gap-6 py-4 mt-4">
          <div className="space-y-4">
            <h3 className="text-2xl font-normal">Datos del huesped</h3>
            <div className="space-y-2">
              <Label htmlFor="guestSearch">Buscar huesped</Label>
              <div className="flex space-x-2">
                <Input
                  id="guestSearch"
                  value={guestSearch}
                  onChange={(e) => setGuestSearch(e.target.value)}
                  className="flex-grow"
                />
                <Button onClick={handleGuestSearch}>Buscar</Button>
              </div>
            </div>
            {guestData && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre</Label>
                  <Input
                    id="name"
                    value={guestData.name}
                    onChange={(e) => setGuestData({ ...guestData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Apellidos</Label>
                  <Input
                    id="lastName"
                    value={guestData.lastName}
                    onChange={(e) => setGuestData({ ...guestData, lastName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={guestData.email}
                    onChange={(e) => setGuestData({ ...guestData, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Teléfono</Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    value={guestData.phoneNumber}
                    onChange={(e) => setGuestData({ ...guestData, phoneNumber: e.target.value })}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-medium">Datos de la reservación</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="hotelName">Hotel</Label>
                <Input
                  id="hotelName"
                  value={hotelName}
                  onChange={(e) => setHotelName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="plan">Plan</Label>
                <Select onValueChange={setPlan} value={plan}>
                  <SelectTrigger id="plan">
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="european">Europeo</SelectItem>
                    <SelectItem value="breakfast">Desayuno</SelectItem>
                    <SelectItem value="all-inclusive">Todo Incluido</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Check-in → Check-out</Label>
              <DatePickerWithRange date={dateRange} setDate={setDateRange} placeholder='Escoge un rango de fechas' className='w-full'/>
            </div>
            <div className="space-y-2">
              <Label>Rooms</Label>
              <Dialog open={isRoomDialogOpen} onOpenChange={setIsRoomDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    {getTotalGuests()}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Room Selection</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4 overflow-y-auto h-64">
                  {rooms.map((room, index) => (
                      <div key={index} className="grid gap-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold">Room {index + 1}</h4>
                          {rooms.length > 1 && (
                            <Button variant="ghost" size="sm" onClick={() => removeRoom(index)}>
                              <MinusCircle className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`adults-${index}`}>Adults</Label>
                            <Input
                              id={`adults-${index}`}
                              type="number"
                              min="1"
                              value={room.adults}
                              onChange={(e) => handleRoomChange(index, 'adults', parseInt(e.target.value))}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`children-${index}`}>Children Ages</Label>
                            <Input
                              id={`children-${index}`}
                              placeholder="e.g. 5, 7, 12"
                              value={room.childrenAges.join(', ')}
                              onChange={(e) => handleRoomChange(index, 'childrenAges', e.target.value.split(',').map(age => parseInt(age.trim())).filter(age => !isNaN(age)))}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button onClick={addRoom} className="w-full">
                      <PlusCircle className="mr-2 h-4 w-4" /> Add Room
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-medium">Tarifas</h3>
            {dateRanges.map((range, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Date Range {index + 1}</Label>
                  <div className="space-x-2">
                    {index === dateRanges.length - 1 && (
                      <Button variant="outline" size="icon" onClick={addDateRange}>
                        <PlusCircle className="h-4 w-4" />
                      </Button>
                    )}
                    {dateRanges.length > 1 && (
                      <Button variant="outline" size="icon" onClick={() => removeDateRange(index)}>
                        <MinusCircle className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
                <DatePickerWithRange
                  date={{ from: range.from, to: range.to }}
                  setDate={(newRange) => {
                    if (newRange) {
                      const newRanges = [...dateRanges]
                      newRanges[index] = newRange
                      setDateRanges(newRanges)
                    }
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        <SheetFooter>
          <Button className="w-full mt-4">Create Reservation</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}