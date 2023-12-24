export interface Game {
  name: string
  grade?: string
  variant?: string
  grader?: string
}

export interface Platform {
  platform: string
  games: Game[]
}

export interface FilterItem {
  value: string
  selected: boolean
}

export interface DatabaseGame {
  name: string
  variants?: DatabaseVariant[]
}

export interface DatabaseVariant {
  part_code?: string
  satellite_code?: string
  country?: string
  mpn?: string
  notes?: string
}

export interface DatabasePlatform {
  platform: string
  games: DatabaseGame[]
}

export type GameRecord = Game | DatabaseGame

export type PlatformRecord = Platform | DatabasePlatform
