import { NextApiRequest, NextApiResponse } from 'next'
import { getPaginatedClients, deleteClient, updateClient } from '@/drizzle/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { prefix = '', page = '1', pageSize = '10' } = req.query
    try {
      const clients = await getPaginatedClients(
        prefix as string,
        parseInt(page as string),
        parseInt(pageSize as string)
      )
      res.status(200).json(clients)
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch clients' })
    }
  } else if (req.method === 'DELETE') {
    const { id } = req.query
    try {
      await deleteClient(parseInt(id as string))
      res.status(200).json({ message: 'Client deleted successfully' })
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete client' })
    }
  } else if (req.method === 'PUT') {
    const { id, name, email, phone } = req.body
    try {
      const updatedClient = await updateClient(id, name, email, phone)
      res.status(200).json(updatedClient[0])
    } catch (error) {
      res.status(500).json({ error: 'Failed to update client' })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}