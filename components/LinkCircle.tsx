import Link from "next/link";
import React from "react";

type Props = {
  name: string;
  link: string;
  icon: React.ReactNode;
};
const LinkCircle: React.FC<Props> = ({ name, link, icon }) => {
  return (
    <Link
      target={"_blank"}
      aria-label={name}
      href={link}
      className="flex h-16 w-16 items-center justify-center rounded-full"
      rel="noreferrer">
      {icon}
    </Link>
  );
};

export default LinkCircle;
