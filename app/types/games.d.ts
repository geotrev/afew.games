export interface Game {
  name: string
  grade: string
  variant?: string
  grader: string
}

export interface DatabaseGame {
  name: string
  variants: DatabaseVariant[]
}

export interface DatabaseVariant {
  part_code?: string
  satellite_code?: string
  manufactured?: string
  mpn?: string
  notes?: string
}

export interface Platform {
  platform: string
  games: Game[]
}

export interface PlatformFilter {
  value: string
  selected: boolean
}
