import { useEffect, useState } from "react";

const PHRASES = ["Hello", "My name is Leo"];
const TYPE_DELAY = 100;
const DELETE_DELAY = 60;
const PAUSE_AFTER_TYPE = 2000;
const PAUSE_AFTER_DELETE = 500;

export default function Typewriter() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [text, setText] = useState("");
  const [mode, setMode] = useState<"deleting" | "typing">("typing");

  useEffect(() => {
    const phrase = PHRASES[phraseIndex];
    const isTyped = mode === "typing" && text === phrase;
    const isDeleted = mode === "deleting" && text === "";

    const timeout = window.setTimeout(
      () => {
        if (isTyped) {
          setMode("deleting");
          return;
        }

        if (isDeleted) {
          setPhraseIndex(current => (current + 1) % PHRASES.length);
          setMode("typing");
          return;
        }

        setText(current =>
          mode === "typing"
            ? phrase.slice(0, current.length + 1)
            : current.slice(0, -1)
        );
      },
      isTyped
        ? PAUSE_AFTER_TYPE
        : isDeleted
          ? PAUSE_AFTER_DELETE
          : mode === "typing"
            ? TYPE_DELAY
            : DELETE_DELAY
    );

    return () => { window.clearTimeout(timeout); };
  }, [mode, phraseIndex, text]);

  return (
    <h1 className="typewriter-heading animate-gradient-move">
      {text}
      <span className="typewriter-cursor">|</span>
    </h1>
  );
}
