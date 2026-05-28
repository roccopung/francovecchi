import type { PortableTextBlock, Image, Reference } from "@sanity/types";

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

// Reusables

export type Seo = {
  title?: string;
  description?: string;
  image?: Image;
};
