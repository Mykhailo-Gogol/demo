import Link from 'next/link'

export async function getServerSideProps() {
  const res = await fetch('https://api.github.com/repos/vercel/next.js')
  const statueCode = res.ok ? false : res.status
  const statueText = res.ok ? false : res.statusText

  const json = await res.json()

  return {
    props: { statueCode, statueText, stars: json.stargazers_count },
  }
}

interface iProps {
  statueCode: number
  statueText: string
  stars: string
}

export default function statuePage({ statueCode, statueText }: iProps) {
  if (statueCode) {
    return (
      <div className="flex flex-1 justify-center items-center">
        <div>
          <p className="py-2">
            <span className="text-lg pr-2 mr-2 border-r-2">{statueCode}</span>
            {statueText}
          </p>
          <Link href="/" className="link py-2 text-center">
            Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-1 justify-center items-center">
      <div>
        <p className="py-2">This page could not be found.</p>
        <Link href="/" className="link py-2 text-center">
          Home
        </Link>
      </div>
    </div>
  )
}
