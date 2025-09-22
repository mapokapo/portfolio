import Quote from "@/lib/types/Quote";
import Section from "@/lib/types/Section";
import Showcase from "@/lib/types/Showcase";
import TechStack from "@/lib/types/TechStack";

export default interface TextData {
  quotes: Quote[];
  sections: Section[];
  showcase: Showcase[];
  techStack: TechStack[];
}
