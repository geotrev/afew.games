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
