import { blockContent } from "./objects/blockContent";
import { cta } from "./objects/cta";
import { elementImage } from "./objects/elementImage";
import { elementVideo } from "./objects/elementVideo";
import { gallery } from "./objects/gallery";
import { linkExternal } from "./objects/link/linkExternal";
import { linkEmail } from "./objects/link/linkEmail";
import { linkInternal } from "./objects/link/linkInternal";
import { seo } from "./objects/seo";

import { home } from "./singletons/home";
import { about } from "./singletons/about";
import { settings } from "./singletons/settings";

export const schemaTypes = [
  //objects
  blockContent,
  cta,
  elementImage,
  elementVideo,
  gallery,
  linkExternal,
  linkEmail,
  linkInternal,
  seo,

  //singletons
  home,
  about,
  settings,
];
