import { Item } from "../../types/ItemsTypes"

export const createItem = (overrides: Partial<Item>): Item => ({
  id: 1,
  name: 'Test Title',
  description: 'Test Description',
  status: 'pending',
  ...overrides,
})
