import { PageHeading } from "../_components/page-heading"

export default function Loading() {
  return (
    <>
      <div className="prose max-w-full">
        <PageHeading>Contribute</PageHeading>
      </div>
      <div className="flex flex-col items-center gap-2">
        <div
          aria-hidden="true"
          className="loading loading-spinner loading-lg"
        ></div>
        <p>Loading</p>
      </div>
    </>
  )
}
