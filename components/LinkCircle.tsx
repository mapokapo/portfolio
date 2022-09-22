import React from "react";

type Props = {
  name: string;
  link: string;
  icon: React.ReactNode;
};
const LinkCircle: React.FC<Props> = ({ name, link, icon }) => {
  return (
    <a
      target={"_blank"}
      aria-label={name}
      href={link}
      className="rounded-full w-16 h-16 flex justify-center items-center"
      rel="noreferrer">
      {icon}
    </a>
  );
};

export default LinkCircle;
