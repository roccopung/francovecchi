import type {
  PortableTextBlock,
  Image,
  Reference,
  Slug,
  EmailDefinition,
} from "@sanity/types";

// Elements

export type ElementImage = Image & {
  hasMobile?: boolean;
  mobileImage?: Image;
};

export type ElementVideo = {
  poster?: Image;
  url?: string;
  hasMobile?: boolean;
  mobileVideo?: {
    poster?: Image;
    url?: string;
  };
};

export type Cta =
  | { _type: "cta"; ctaType: "linkInternal"; linkInternal: LinkInternal }
  | { _type: "cta"; ctaType: "linkExternal"; linkExternal: LinkExternal }
  | { _type: "cta"; ctaType: "linkEmail"; linkEmail: LinkEmail }
  | { _type: "cta"; ctaType: "popup" };

export type Media = {
  image: ElementImage;
  video?: ElementVideo;
};

// Links

export type LinkEmail = {
  label?: string;
  url?: string;
};

export type LinkExternal = {
  label?: string;
  url?: string;
};

export type LinkInternal = {
  label?: string;
  url?: Reference;
};

// Objects

export type Credit = {
  label: string;
  name: string;
};

export type CallFranco = {
  content: PortableTextBlock[];
  cta: Cta;
};

export type FeaturedProject = {
  title?: string;
  slug?: Slug;
  coverImages?: { one?: ElementImage; two?: ElementImage };
  services?: { title?: string }[];
  shortSummary?: PortableTextBlock[];
};

export type Review = {
  author: string;
  companyRole: string;
  content: PortableTextBlock[];
};

export type Seo = {
  title?: string;
  description?: string;
  image?: Image;
};

// Page Builder

export type ItemImage = {
  columnSpan: {
    input: number;
  };
  image: ElementImage;
};

export type SectionStackedGallery = {
  _type: "stackedGallery";
  items: ItemImage[];
};

export type SectionInfo = {
  _type: "info";
  title: string;
  content: PortableTextBlock[];
};

export type PageBuilderSection = SectionStackedGallery | SectionInfo;

export type PageBuilder = {
  sections: PageBuilderSection[];
};

// Documents

export type Service = {
  title: string;
  slug: Slug;
};

export type Character = {
  name: string;
  cover: ElementImage;
};

export type Project = {
  title: string;
  slug: Slug;
  isHighlighted: boolean;
  years: string;
  coverImages: {
    one: ElementImage;
    two: ElementImage;
  };
  shortSummary: PortableTextBlock[];
  cover: ElementImage;
  description: PortableTextBlock[];
  services: Service[];
  problem: PortableTextBlock[];
  solution: PortableTextBlock[];
  pageBuilder: PageBuilder;
  result: {
    content: PortableTextBlock[];
    media: Media;
  };
  credits: Credit[];
  seo: Seo;
  next?: { title: string; slug: any; cover: ElementImage };
  firstProject?: { title: string; slug: any; cover: ElementImage };
  projectIndexes?: { slug: Slug }[];
};

// Singletons

export type HomePage = {
  pushingKeyframes: JSON;
  cover: Media;
  heading: PortableTextBlock[];
  featuredProjects: FeaturedProject[];
  aboutSection: {
    heading: PortableTextBlock[];
    paragraphOne: PortableTextBlock[];
    paragraphTwo: PortableTextBlock[];
    cta: Cta;
    animation: JSON;
  };
  clientsSection: {
    title: string;
    subtitle: PortableTextBlock[];
    logos: Image[];
  };
  endingBlock: {
    animation: JSON;
    title: string;
    description: PortableTextBlock[];
    cta: Cta;
  };
  callFranco: CallFranco;
};

export type CaseStudiesPage = {
  title: string;
  slug: Slug;
};

export type LookbookPage = {
  title: string;
  slug: Slug;
  stackedGallery: SectionStackedGallery;
  callFranco: CallFranco;
};

export type AboutPage = {
  title: string;
  slug: Slug;
  portrait: ElementImage;
  intro: {
    heading: PortableTextBlock[];
    content: PortableTextBlock[];
    earlyCareer: PortableTextBlock[];
    workExperience: PortableTextBlock[];
    cta: Cta;
  };
  collaborations: {
    heading: PortableTextBlock[];
    content: PortableTextBlock[];
    brands: string[];
    agencies: string[];
    animation: JSON;
  };
  hobbies: string[];
  skillsSection: {
    heading: string;
    content: PortableTextBlock[];
    skills: SectionInfo[];
  };
  reviewsSection: {
    heading: string;
    content: PortableTextBlock[];
    reviews: Review[];
  };
  callFranco: CallFranco;
};

export type Settings = {
  animationTop: JSON;
  animationBottom: JSON;
  email: EmailDefinition;
  phone: string;
  social: LinkExternal[];
};
