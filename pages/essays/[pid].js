import { useRouter } from "next/router"

export default function Essay() {
  const router = useRouter()
  const { pid } = router.query
  return <p>{pid}</p>
}

// export async function getStaticPaths() {
//   return { paths: [], fallback: false }
// }

// export async function getStaticProps() {}
