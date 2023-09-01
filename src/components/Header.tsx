import GithubIcon from "@/icons/GithubIcon";
import Link from "next/link";

const Header = () => {
  return (
    <header className="mx-auto flex h-[4rem] max-w-[36rem] items-center justify-between border-b border-white px-4 sm:px-0">
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
          className="flex items-center rounded-full border bg-white px-2 py-1 text-sm font-medium shadow transition-all duration-200 hover:bg-gray-100"
        >
          <span className="mr-1">
            <GithubIcon />
          </span>
          Star on GitHub
        </a>
      </div>
    </header>
  );
};

export default Header;
