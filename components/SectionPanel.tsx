import React from "react";

type Props = {
  icon: React.ReactNode;
  title: string;
  content: string;
};
const SectionPanel: React.FC<Props> = ({ icon, title, content }) => {
  return (
    <article className="bg-slate-800 z-10 flex shadow-md shadow-slate-800 flex-col p-8 gap-8 sm:p-16 mx-4 sm:mx-16">
      <div className="flex gap-4 flex-col sm:flex-row sm:items-end items-center text-white">
        <div className="text-7xl -mb-2 sm:text-5xl">{icon}</div>
        <h3 className="text-5xl text-center sm:text-start">{title}</h3>
      </div>
      <p className="text-white text-2xl">{content}</p>
    </article>
  );
};

export default SectionPanel;
