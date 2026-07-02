export default interface Showcase {
  content: string;
  description: string;
  meta: {
    imageKey: string;
    links?: {
      label: string;
      url: string;
    }[];
    madeWith: string[];
  };
  title: string;
}
