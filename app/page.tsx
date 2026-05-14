// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
//       <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={100}
//           height={20}
//           priority
//         />
//         <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
//           <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
//             To get started, edit the page.tsx file.
//           </h1>
//           <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
//             Looking for a starting point or more instructions? Head over to{" "}
//             <a
//               href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Templates
//             </a>{" "}
//             or the{" "}
//             <a
//               href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Learning
//             </a>{" "}
//             center.
//           </p>
//         </div>
//         <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
//           <a
//             className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={16}
//               height={16}
//             />
//             Deploy Now
//           </a>
//           <a
//             className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Documentation
//           </a>
//         </div>
//       </main>
//     </div>
//   );
// }

import Link from "next/link";
export default function Home() {
    return (
        <main style={{ padding: "20px", textAlign:"center", marginTop:"50px" }}>
            <h1>홈 화면입니다.</h1>
            <nav>
                <ul style={{  padding: "20px", listStyle: "none" }}>
                    <li>
                        <Link href="/page0">페이지0로 이동</Link>
                    </li>
                    <li>
                        <Link href="/page1">페이지1로 이동</Link>
                    </li>
                    <li>
                        <Link href="/page2">페이지2로 이동</Link>
                    </li>
                    <li>
                        <Link href="/page3">페이지3로 이동</Link>
                    </li>
                    <li>
                        <Link href="/page4">페이지4로 이동</Link>
                    </li>
                    <li>
                        <Link href="/page5">페이지5로 이동</Link>
                    </li>
                    <li>
                        <Link href="/page6">페이지6로 이동</Link>
                    </li>
                    <li>
                        <Link href="/page7">페이지7로 이동</Link>
                    </li>
                    <li>
                        <Link href="/page8">페이지8로 이동</Link>
                    </li>
                    <li>
                        <Link href="/page9">페이지9로 이동</Link>
                    </li>
                    <li>
                        <Link href="/page10">페이지10로 이동</Link>
                    </li>
                </ul>
            </nav>
        </main>
    );
}
