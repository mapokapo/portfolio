"use client";

import TypewriterComponent from "typewriter-effect";

const IntroText: React.FC = () => {
  return (
    <TypewriterComponent
      component={"h1"}
      onInit={typewriter => {
        typewriter
          .changeDelay(100)
          .changeDeleteSpeed(60)
          .typeString("Hello")
          .pauseFor(2000)
          .deleteAll()
          .pauseFor(500)
          .typeString("My name is Leo")
          .pauseFor(2000)
          .deleteAll()
          .pauseFor(350)
          .start();
      }}
      options={{
        loop: true,
      }}
    />
  );
};

export default IntroText;
