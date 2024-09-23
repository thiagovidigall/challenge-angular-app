export interface Page {
  count: number
  pages: number
  next: string
  prev: string | null
}

export interface Character {
  id: number
  name: string
  status: string
  species: string
  type: string
  gender: string
  origin: object
  location: object
  image: string
  episode: string[]
  url: string
  created: string
  isFavorite: boolean
}

export interface CharacterSchema {
  info: Page
  results: Character[]
}
