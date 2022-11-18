export interface Game {
  name: string
  grade: string
  variant?: string
  grader: string
}

export interface Platform {
  platform: string
  games: Game[]
}

export interface PlatformFilter {
  value: string
  selected: boolean
}
