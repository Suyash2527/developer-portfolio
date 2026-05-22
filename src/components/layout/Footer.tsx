"use client";

export default function Footer() {
  return (
    <footer className="bg-[#0f0f0f] border-t-[2.5px] border-[#0f0f0f]">
      <div className="container-max py-8 px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="font-mono text-[10px] uppercase tracking-widest text-white/50">
          Designed and coded by hand. No templates. No shortcuts.
        </p>
        <div className="flex items-center gap-4 text-white">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#dd4433]">
            SUYASH CHAUDHARI © {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </footer>
  );
}
