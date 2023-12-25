import { PageHeading } from "components"
import { BASE_TITLE } from "utils/constants"

export const metadata = {
  alternates: {
    canonical: `https://afew.games/database/contribute`,
  },
  title: `${BASE_TITLE} database | contribute`,
  description: "Contribute to A Few Games' video game database",
}

const FIELD_DATA = [
  {
    label: { text: "Title *", id: "title" },
    hint: {
      text: "Official title of the game, including subtitles.",
      id: "title-hint",
    },
    input: { required: true, id: "title" },
  },
  {
    label: { text: "Platform *", id: "platform" },
    hint: {
      text: "Specify which console the game released on.",
      id: "platform-hint",
    },
    input: { required: true, id: "platform" },
  },
  {
    label: { text: "MPN (Model Product Number)", id: "mpn" },
    hint: {
      text: "A code used to identify a product at retail. Each publisher has a different format. If you're not sure about this, leave this blank. Typically found on the back of a game near the UPC.",
      id: "mpn-hint",
    },
    input: { id: "mpn" },
  },
  {
    label: { text: "Country", id: "country" },
    hint: {
      text: "The country of manufacture. Most games say 'Made in Japan,' 'Made in USA,' etc. If there's no country indicated, leave this blank. The MPN might specify the country, e.g., ending in 'USA,' 'CAN' (Canada), etc.",
      id: "country-hint",
    },
    input: { id: "country" },
  },
  {
    label: { text: "Part Code", id: "part-code" },
    hint: {
      text: "The unique identifier given to the game during manufacturing. Sometimes called a 'product code.' Typically found on the spine, or the back of a game near the UPC.",
      id: "part-code-hint",
    },
    input: { id: "part-code" },
  },
]

export default function Page() {
  return (
    <>
      <div className="prose max-w-full">
        <PageHeading>Contribute</PageHeading>
        <p>Use this form to submit a new game, new game variant, or both!</p>
      </div>

      <form className="my-12">
        <div className="rounded-md border-2 border-solid border-slate-800 p-5">
          <h2 className="mb-2 text-xl font-bold">Game Details</h2>

          <p className="mb-2">First of all, thank you for your contribution!</p>

          <p className="mb-2">
            The data you submit will need to be cross-referenced. Please review
            this checklist before submitting:
          </p>
          <ul className="list-disc ps-4">
            <li>Proof read your submission for inaccuracies, such as typos</li>
            <li>
              Links to official sources (e.g., press releases, publisher
              documentation) are encouraged
            </li>
            <li>Links to eBay listings are encouraged</li>
            <li>
              If the game has so little documentation and so few listings that
              it can&apos;t be easily referenced, say so in the notes
            </li>
          </ul>

          <div className="divider" role="separator" />

          <p className="mb-4 italic opacity-75">
            (*) indicates a required field
          </p>

          {FIELD_DATA.map((field) => (
            <div className="form-control" key={field.label.id}>
              <label
                className="label px-0 pb-1 pt-0 text-sm font-bold uppercase text-white"
                htmlFor={field.label.id}
              >
                {field.label.text}
              </label>
              <p id={field.hint.id} className="mb-4 text-sm italic opacity-75">
                {field.hint.text}
              </p>
              <input
                required={field.input.required}
                className="input-bordered input input-md mb-3 w-full max-w-full"
                aria-describedby={field.hint.id}
                type="text"
                id={field.input.id}
                name={field.input.id}
              />
            </div>
          ))}

          <div className="form-control">
            <label
              className="label px-0 pb-1 text-sm font-bold uppercase text-white"
              htmlFor="notes"
            >
              Additional information
            </label>
            <p id="notes-hint" className="mb-4 text-sm italic opacity-75">
              Provide links to resources, additional context, or anything else
              useful to cross-verify this game.
            </p>
            <textarea
              className="textarea-bordered textarea textarea-md mb-3 w-full max-w-full"
              id="notes"
              name="notes"
              aria-describedby="notes-hint"
            />
          </div>

          <div className="divider" role="separator" />

          <p className="form-control">
            <label
              className="label flex cursor-pointer items-start"
              htmlFor="release-box"
            >
              <input
                className="checkbox-primary checkbox checkbox-sm me-3"
                type="checkbox"
                id="release-box"
                name="release-box"
              />
              <span className="label-text">
                By submitting this form, I agree to release the provided
                information, without consequence or condition, to A Few Games
                for the sole purpose of publishing to its video game database.
              </span>
            </label>
          </p>
          <p className="form-control">
            <label
              className="label flex cursor-pointer items-start"
              htmlFor="terms-box"
            >
              <input
                className="checkbox-primary checkbox checkbox-sm me-3"
                type="checkbox"
                id="terms-box"
                name="terms-box"
              />
              <span className="label-text">
                I understand that A Few Games may choose to not list all or some
                of the submitted information if it is deemed inappropriate,
                incomplete, or inaccurate.
              </span>
            </label>
          </p>
          <p className="form-control mb-8">
            <label
              className="label flex cursor-pointer items-start"
              htmlFor="consent-box"
            >
              <input
                className="checkbox-primary checkbox checkbox-sm me-3"
                type="checkbox"
                id="consent-box"
                name="consent-box"
              />
              <span className="label-text">
                I understand that submitting this form will create a
                public-facing GitHub ticket with the provided information, to
                remain publicly visible for contributor & collector interest. I
                understand that I may request deletion of any unintentionally
                submitted personal information by emailing the owner at{" "}
                <a
                  className="link text-primary"
                  href="mailto:contact@afew.games"
                >
                  contact@afew.games
                </a>
                , or leaving a comment on the created GitHub issue, in order to
                specify the scope of deletion.
              </span>
            </label>
          </p>

          <button className="btn-accent btn-lg btn !h-auto !min-h-0 w-full rounded-md py-3 md:btn-md">
            Submit
          </button>
        </div>
      </form>
    </>
  )
}
