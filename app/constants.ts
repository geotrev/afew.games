export const DatabaseFields = {
  PART_CODE: "part_code",
  SATELLITE_CODE: "satellite_code",
  MANUFACTURED: "manufactured",
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
  DatabaseFields.MANUFACTURED,
  DatabaseFields.MPN,
  DatabaseFields.NOTES,
]
