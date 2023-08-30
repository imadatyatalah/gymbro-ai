import GithubIcon from "@/icons/GithubIcon";
import Link from "next/link";

const Header = () => {
  return (
    <header className="px-4 sm:px-0 flex items-center max-w-[36rem] mx-auto h-[4rem] border-b justify-between">
      <div className="inline-block">
        <Link href="/">
          <h1 className="text-2xl font-bold">Gymbro AI</h1>
        </Link>
      </div>

      <div>
        <a
          href="https://github.com/imadatyatalah/gymbro-ai"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GithubIcon />
        </a>
      </div>
    </header>
  );
};

export default Header;
