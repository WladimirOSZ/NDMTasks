
export type Item = {
  id: number
  name: string
  description: string
  status: ItemStatusType
}

export type ItemStatusType = 'pending' | 'completed'

export type FilterType = ItemStatusType | 'all'
