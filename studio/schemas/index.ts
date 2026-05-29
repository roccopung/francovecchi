import { character } from "./documents/character";
import { project } from "./documents/project";
import { service } from "./documents/service";

import { blockContent } from "./objects/blockContent";
import { callFranco } from "./objects/callFranco";
import { columnSpan } from "./objects/columnSpan";
import { cta } from "./objects/cta";
import { elementImage } from "./objects/elementImage";
import { elementVideo } from "./objects/elementVideo";
import { linkExternal } from "./objects/link/linkExternal";
import { linkEmail } from "./objects/link/linkEmail";
import { linkInternal } from "./objects/link/linkInternal";
import { media } from "./objects/media";
import { pageBuilder } from "./objects/pageBuilder";
import { seo } from "./objects/seo";

import { about } from "./singletons/about";
import { home } from "./singletons/home";
import { lookbook } from "./singletons/lookbook";
import { settings } from "./singletons/settings";

// page builder
import { info } from "./objects/page-builder/_info";
import { stackedGallery } from "./objects/page-builder/_stackedGallery";

export const schemaTypes = [
  // documents
  character,
  project,
  service,

  //objects
  blockContent,
  callFranco,
  columnSpan,
  cta,
  elementImage,
  elementVideo,
  linkExternal,
  linkEmail,
  linkInternal,
  media,
  pageBuilder,
  seo,

  //singletons
  about,
  home,
  lookbook,
  settings,

  //page builder
  info,
  stackedGallery,
];
