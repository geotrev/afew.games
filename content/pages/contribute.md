---
blocks:
  - subheading: >
      Use this form to submit a new game, new game variant, or both, to be added
      to the variant database.


      Looking for the status on a submission? [View All
      Submissions](https://github.com/geotrev/afew.games/issues)
    formHeader: >
      ## Database Submission Form


      First of all, thanks for your contribution!


      The data you submit will need to be cross-referenced. Please review this
      checklist before submitting:


      * Proof read your submission for inaccuracies, such as typos

      * Links to official sources (e.g., press releases, publisher
      documentation) are encouraged

      * Links to eBay listings are encouraged

      * If the game has so little documentation and so few listings that it
      can't be easily referenced, say so in the notes


      ***


      **\*** *indicates a required field*
    formSuccessMessage: >
      **Submitted successfully** – thanks for contributing to the database!


      You can track your submission on A Few Games' GitHub issue tracker, linked
      above.
    formFields:
      - required: true
        type: input
        id: title
        label: Title
        hint: 'Official title of the game, including subtitles.'
      - required: true
        type: input
        id: platform
        label: Platform
        hint: Specify which console the game released on.
      - type: input
        id: mpn
        label: MPN
        hint: >-
          A code used to identify a product at retail. Each publisher has a
          different format. If you're not sure about this, leave this blank.
          Typically found on the back of a game near the UPC.
      - type: input
        id: country
        label: Country
        hint: >-
          The country of manufacture. Most games say 'Made in Japan,' 'Made in
          USA,' etc. If there's no country indicated, leave this blank. The MPN
          might specify the country, e.g., ending in 'USA,' 'CAN' (Canada), etc.
      - type: input
        id: part
        label: Product Code
        hint: >-
          The unique identifier given to the game during manufacturing.
          Sometimes called a 'product code.' Typically found on the spine, or
          the back of a game near the UPC.
      - type: textarea
        id: notes
        label: Additional Information
        hint: >-
          Provide links to resources, additional context, or anything else
          useful to cross-verify this game.
      - type: input
        id: credit
        label: Submitter Credit
        hint: >-
          Who should A Few Games credit for this submission? An online handle is
          OK. Leave blank if no credit desired.
    consentFields:
      - id: terms
        label: I agree to A Few Games' code of conduct
        externalLink: 'https://github.com/geotrev/afew.games/blob/main/CODE_OF_CONDUCT.md'
        externalLinkLabel: Code of Conduct ↗
      - id: consent
        label: >-
          I understand this form will create a GitHub ticket with the provided
          information, to remain publicly visible for contributor & collector
          interest
    _template: contribute
---

