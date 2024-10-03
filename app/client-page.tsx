"use client"

// import { TinaMarkdown } from "tinacms/dist/rich-text"
// import { tinaField, useTina } from "tinacms/dist/react"
import Link from "next/link"
import { DatabaseWrapper } from "./_components/database-wrapper"
import { PageHeading } from "./_components/page-heading"
// import { HomeQuery } from "@/tina/__generated__/types"
import { sortByKey } from "@/utils/generics"

interface HomePageProps {
  // query: {
  //   data: HomeQuery
  //   variables: { relativePath: string }
  //   query: string
  // }
  platformList: string[]
  contributors: { contributors: { name: string }[] }
}

export const ClientPage = ({
  // query,
  platformList,
  contributors,
}: HomePageProps) => {
  // const { data } = useTina(query)

  return (
    <>
      <div className="prose">
        <PageHeading>Database</PageHeading>
      </div>
      <DatabaseWrapper platformList={platformList} />
      <div className="divider" role="separator" />
      <div className="prose max-w-full">
        {/* <div data-tina-field={tinaField(data.home, "message")}> */}
        {/* <TinaMarkdown content={data.home.message} /> */}
        {/* </div> */}
        <p className="mb-0">
          <Link
            className="btn btn-secondary btn-sm text-base-100"
            href="/contribute"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contribute ↗
          </Link>
        </p>
        {/* <div */}
        {/* className="mt-2 text-sm italic" */}
        {/* data-tina-field={tinaField(data.home, "contribute")} */}
        {/* > */}
        {/* <TinaMarkdown content={data.home.contribute} /> */}
        {/* </div> */}
      </div>
      <div className="divider" role="separator" />
      <div className="prose max-w-full">
        <p className="font-bold">♥ Database Contributors</p>
        <p>
          {contributors.contributors
            .sort(sortByKey("name"))
            .map((contributor) => contributor.name)
            .join(", ")}
        </p>
      </div>
    </>
  )
}
