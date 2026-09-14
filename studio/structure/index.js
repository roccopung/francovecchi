import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import { DashboardIcon, FaceHappyIcon } from "@sanity/icons";

export const structure = (S, context) =>
  S.list()
    .id("root")
    .title("Content")
    .items([
      S.listItem()
        .title("Pages")
        .child(
          S.list()
            .title("Pages")
            .items([
              S.documentTypeListItem("home")
                .title("Home")
                .child(
                  S.document()
                    .schemaType("home")
                    .title("Home")
                    .documentId("home"),
                ),
              S.documentTypeListItem("about")
                .title("About")
                .child(
                  S.document()
                    .schemaType("about")
                    .title("About")
                    .documentId("about"),
                ),
              S.documentTypeListItem("lookbook")
                .title("Gallery")
                .child(
                  S.document()
                    .schemaType("lookbook")
                    .title("Gallery")
                    .documentId("lookbook"),
                ),
              S.documentTypeListItem("caseStudies")
                .title("Case Studies")
                .child(
                  S.document()
                    .schemaType("caseStudies")
                    .title("Case Studies")
                    .documentId("caseStudies"),
                ),
            ]),
        ),

      S.divider(),


      orderableDocumentListDeskItem({
        type: "character",
        title: "Characters",
        icon: FaceHappyIcon,
        S,
        context,
      }),


      orderableDocumentListDeskItem({
        type: "project",
        title: "Projects",
        icon: DashboardIcon,
        S,
        context,
      }),
      S.documentTypeListItem("service").title("Services"),

      S.divider(),

      S.documentTypeListItem("settings")
        .title("Settings")
        .child(
          S.document()
            .schemaType("settings")
            .title("Settings")
            .documentId("settings"),
        ),
    ]);
