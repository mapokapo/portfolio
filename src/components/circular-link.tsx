import Link from "next/link";
import React from "react";

export type CircularLinkProps = {
  icon: React.ReactNode;
  link: string;
  name: string;
};

const CircularLink: React.FC<CircularLinkProps> = ({ icon, link, name }) => {
  return (
    <Link
      aria-label={name}
      className="flex h-16 w-16 items-center justify-center rounded-full"
      href={link}
      rel="noreferrer"
      target={"_blank"}>
      {icon}
    </Link>
  );
};

export default CircularLink;
