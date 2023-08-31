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
          className="flex items-center text-sm font-medium border rounded-full px-2 py-1 shadow hover:bg-gray-100 transition-all duration-200"
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
