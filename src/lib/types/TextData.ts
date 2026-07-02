import type Quote from "@/lib/types/Quote";
import type Section from "@/lib/types/Section";
import type Showcase from "@/lib/types/Showcase";
import type TechStack from "@/lib/types/TechStack";

export default interface TextData {
  quotes: Quote[];
  sections: Section[];
  showcase: Showcase[];
  techStack: TechStack[];
}
