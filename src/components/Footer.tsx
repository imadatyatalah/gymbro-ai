const Footer = () => {
  return (
    <footer className="mx-auto flex h-[4rem] max-w-[36rem] items-center justify-between border-t border-white px-4 text-sm sm:px-0">
      <div className="w-full text-center">
        <p className="font-medium">
          Proudly built in Morocco 🇲🇦 by{" "}
          <a
            href="https://www.imadatyat.me"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 underline"
          >
            Imad Atyat-Allah
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
