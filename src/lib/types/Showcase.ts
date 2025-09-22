export default interface Showcase {
  title: string;
  description: string;
  content: string;
  meta: {
    imageUrl: string;
    madeWith: string[];
    links?: {
      label: string;
      url: string;
    }[];
  };
}
