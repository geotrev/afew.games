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

/**
 * Database field descriptions. Used in tooltips & contribution form.
 */
export const DB_FIELD_DESCRIPTIONS: Record<string, string> = {
  [DatabaseFields.PART_CODE]:
    "A code used to identify the unique print run of a product.",
  [DatabaseFields.SATELLITE_CODE]:
    "A secondary UPC code, often right next to the primary UPC, with fewer numerical digits.",
  [DatabaseFields.COUNTRY]:
    "The country of manufacture (not the printed language).",
  [DatabaseFields.MPN]:
    "A special code used to identify a retail product. Typically found on the back of a game near the UPC.",
  [DatabaseFields.NOTES]:
    "Extra discerning factors, such as art differences, print errors, or the like.",
}
