export const Logo = ({ className }: { className?: string }) => {
  return (
    <div
      className={`flex gap-2 cursor-pointer active:opacity-80 md:hover:opacity-80 ${className}`}
    >
      <img
        src="./icon_32x32_mono.svg"
        alt="Memo"
        className="size-6 md:size-7"
      />
      <span className="text-[21px] font-extrabold leading-none tracking-tighter select-none md:text-2xl">
        memoroom
      </span>
    </div>
  );
};
