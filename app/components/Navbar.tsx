// app/components/Navbar.tsx
import Image from 'next/image'
import Link  from 'next/link'
import { auth }    from '@/auth'
import { signIn, signOut } from '@/auth'

/** Server action must be top‐level */
async function logoutAction(formData: FormData) {
  'use server'
  await signOut({ redirectTo: '/' })
}

async function loginAction(formData: FormData) {
  'use server'
  await signIn('github')
}

export default async function Navbar() {
  const session = await auth()

  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/football.jpg" alt="Logo" width={100} height={50} />
        </Link>

          {/* Category Links */}
        <div className="flex gap-4 text-black">
            <Link href="/men"><span className="hover:underline">Men</span></Link>
            <Link href="/women"><span className="hover:underline">Women</span></Link>
            <Link href="/kids"><span className="hover:underline">Kids</span></Link>
        </div>

        <div className="flex items-center gap-5 text-black">
          {session?.user ? (
            <>
              <Link href="/startup/create">
                <span className="text-gray-700 hover:text-gray-900">
                  Create Startup
                </span>
              </Link>

              {/* ← Notice method="post" here */}
              <form action={logoutAction} method="post">
                <button type="submit">Logout</button>
              </form>

              <Link href={`/user/${session.id}`}>
                <span>{session.user.name}</span>
              </Link>
            </>
          ) : (
            <form action={loginAction} method="post">
              <button type="submit">Login</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  )
}
