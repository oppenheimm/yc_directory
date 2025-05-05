// import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { auth, signOut, signIn } from "@/auth";


const Navbar = async () => {
    const session = await auth();

    return (
        <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
            <nav className="flex justify-between items-center">
                <Link href="/">
                    <Image src="/football.jpg" alt="Logo" width={100} height={50} />
                </Link>

                <div className="flex items-center gap-5 text-black">
                    {session && session?.user ? (
                        <>
                            <Link href="/startup/create">
                                <span className="text-gray-700 hover:text-gray-900">Create Startup</span>
                            </Link>

                            <form action={async () => {
                                "use server";

                                await signOut(options: {redirectTo : "/"});
                                <button type="submit">
                                    LogOut
                                </button>
                            </form>

                            <Link href={`/user/${session?.id}`}>
                                <span>{session?.user?.name}</span>
                            </Link>
                        </>
                    ) : (
                        <form
                            action={async () => {
                                "use server";

                                await signIn( provider: 'github' );
                            }}
                        >
                            <button type="submit">
                                Login
                            </button>
                        </form>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Navbar;