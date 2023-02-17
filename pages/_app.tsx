import "../styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-green-200 min-h-screen">
      <nav className="h-16 bg-green-800 text-white px-12">
        <ul className="flex text-2xl items-center gap-10 h-full">
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          <li>
            <Link href={"/create"}>Create User</Link>
          </li>
        </ul>
      </nav>
      <main className="py-10 px-6">
        <Component {...pageProps} />
      </main>
    </div>
  );
}

export default MyApp;
