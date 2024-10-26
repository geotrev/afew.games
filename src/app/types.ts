export type Essay = {
  date?: string
  title?: string
  description?: string
  urlPath?: string
  slug?: string
}

export interface FilterItem {
  value: string
  selected: boolean
}

export type DatabaseFieldKey =
  | "product_code"
  | "satellite_code"
  | "country"
  | "mpn"
  | "notes"

export type DatabaseVariant = Record<
  "product_code" | "satellite_code" | "country" | "mpn" | "notes",
  string
>

export interface DatabaseGame {
  name: string
  variants?: DatabaseVariant[]
}

export interface DatabasePlatform {
  platform: string
  games: DatabaseGame[]
}
