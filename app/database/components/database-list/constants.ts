import { DB_FIELDS_SORTED, DatabaseFields } from "app/constants"

export const COLUMN_WIDTHS: Record<string, string> = DB_FIELDS_SORTED.reduce(
  (acc, field) => {
    switch (field) {
      case DatabaseFields.NOTES:
        return { ...acc, [field]: "35%" }
      case DatabaseFields.MPN:
        return { ...acc, [field]: "20%" }
      default:
        return { ...acc, [field]: "15%" }
    }
  },
  {}
)

export const COLUMN_LABELS: Record<string, string> = DB_FIELDS_SORTED.reduce(
  (acc, field) => {
    switch (field) {
      case DatabaseFields.MPN:
        return { ...acc, [field]: DatabaseFields.MPN.toUpperCase() }
      default:
        return {
          ...acc,
          [field]: field
            .split("_")
            .map((part) => part.slice(0, 1).toUpperCase() + part.slice(1))
            .join(" "),
        }
    }
  },
  {}
)
