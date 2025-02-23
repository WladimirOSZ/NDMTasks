
export type Item = {
  id: number
  name: string
  description: string
  status: 'pending' | 'completed'
}

export type GetItems = {
  getItems: Item[]
}
