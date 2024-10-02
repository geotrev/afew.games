import { PageHeading } from "../_components/page-heading"
import { EssayListLoader } from "./_components/essay-list-loader"

export default function Loading() {
  return (
    <>
      <div className="prose">
        <PageHeading>Essays</PageHeading>
      </div>
      <EssayListLoader />
    </>
  )
}
