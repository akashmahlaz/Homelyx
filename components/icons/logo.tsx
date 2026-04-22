import clsx from "clsx";

export default function LogoIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Homelyx logo"
      viewBox="0 0 32 32"
      {...props}
      className={clsx("h-4 w-4 fill-orange-500", props.className)}
    >
      {/* House shape with door notch */}
      <path d="M16 3L3 14h3v15h7v-7h6v7h7V14h3L16 3z" />
    </svg>
  );
}
