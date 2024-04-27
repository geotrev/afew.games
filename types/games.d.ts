export type DatabaseVariant = Record<
  product_code | satellite_code | country | mpn | notes,
  string
>

export interface FilterItem {
  value: string
  selected: boolean
}

export interface DatabaseGame {
  name: string
  variants?: DatabaseVariant[]
}

export interface DatabasePlatform {
  platform: string
  games: DatabaseGame[]
}
