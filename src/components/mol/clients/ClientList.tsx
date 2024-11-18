'use client'

import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pencil, Trash2 } from 'lucide-react'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { NewClient } from '@/drizzle/schema'

export default function ClientList() {
  const [clients, setClients] = useState<NewClient[]>([])
  const [searchPrefix, setSearchPrefix] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [editingClient, setEditingClient] = useState<NewClient | null>(null)

  const pageSize = 10

  useEffect(() => {
    fetchClients()
  }, [searchPrefix, page])

  const fetchClients = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/clients?prefix=${searchPrefix}&page=${page}&pageSize=${pageSize}`)
      if (!response.ok) throw new Error('Failed to fetch clients')
      const fetchedClients = await response.json()
      setClients(fetchedClients)
      setTotalPages(Math.ceil(fetchedClients.length / pageSize))
    } catch (error) {
      console.error('Failed to fetch clients:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      try {
        const response = await fetch(`/api/clients?id=${id}`, { method: 'DELETE' })
        if (!response.ok) throw new Error('Failed to delete client')
        setClients(clients.filter(client => client.id !== id))
      } catch (error) {
        console.error('Failed to delete client:', error)
      }
    }
  }

  const handleEdit = (client: NewClient) => {
    setEditingClient(client)
  }

  const handleUpdate = async () => {
    if (editingClient) {
      try {
        const response = await fetch('/api/clients', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(editingClient)
        })
        if (!response.ok) throw new Error('Failed to update client')
        const updatedClient = await response.json()
        setClients(clients.map(c => c.id === updatedClient.id ? updatedClient : c))
        setEditingClient(null)
      } catch (error) {
        console.error('Failed to update client:', error)
      }
    }
  }

  return (
    <div className="container mx-auto">
      <div className="mb-4">
        <Input
          type="text"
          placeholder="John Doe..."
          value={searchPrefix}
          onChange={(e) => setSearchPrefix(e.target.value)}
          className="w-full"
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={3} className="text-center">Loading...</TableCell>
            </TableRow>
          ) : clients.map(client => (
            <TableRow key={client.id}>
              <TableCell>
                {editingClient?.id === client.id ? (
                  <Input
                    value={editingClient?.name}
                    onChange={(e) => setEditingClient({...editingClient!, name: e.target.value})}
                  />
                ) : client.name}
              </TableCell>
              <TableCell>
                {editingClient?.id === client.id ? (
                  <Input
                    value={editingClient?.email}
                    onChange={(e) => setEditingClient({...editingClient!, email: e.target.value})}
                  />
                ) : client.email}
              </TableCell>
              <TableCell>
                {editingClient?.id === client.id ? (
                  <Button onClick={handleUpdate}>Save</Button>
                ) : (
                  <>
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(client)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(client.id!)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              href="#" 
              onClick={() => setPage(p => Math.max(1, p - 1))}
              className={page === 1 ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>
          {[...Array(totalPages)].map((_, i) => (
            <PaginationItem key={i}>
              <PaginationLink 
                href="#" 
                onClick={() => setPage(i + 1)}
                isActive={page === i + 1}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext 
              href="#" 
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              className={page === totalPages ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}