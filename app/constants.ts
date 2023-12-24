export const DatabaseFields = {
  PART_CODE: "part_code",
  SATELLITE_CODE: "satellite_code",
  COUNTRY: "country",
  MPN: "mpn",
  NOTES: "notes",
}

/**
 * The database collection should probably be updated to set even empty fields as nullish.
 * The order here is important.
 */
export const DB_FIELDS_SORTED: string[] = [
  DatabaseFields.PART_CODE,
  DatabaseFields.SATELLITE_CODE,
  DatabaseFields.COUNTRY,
  DatabaseFields.MPN,
  DatabaseFields.NOTES,
]
