import Script from "next/script"
import Link from "next/link"

export default function Header() {
  return (
    <header>
      <Script
        defer
        src="https://identity.netlify.com/v1/netlify-identity-widget.js"
      />
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/essays">Essays</Link>
          </li>
          <li>
            <Link href="/games">Games</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
