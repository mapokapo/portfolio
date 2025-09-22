export default interface Showcase {
  content: string;
  description: string;
  meta: {
    imageUrl: string;
    links?: {
      label: string;
      url: string;
    }[];
    madeWith: string[];
  };
  title: string;
}
