import Layout from "components/layout"

export default function Home() {
  return (
    <Layout>
      <h1>
        <span aria-hidden="true">./</span>
        <span className="visually-hidden">Home</span>
      </h1>
      <p>
        Hello and welcome. This is my personal blog and collection website. I
        like to write about, document, and track my video games. I hope you stay
        for a while!
      </p>
    </Layout>
  )
}
