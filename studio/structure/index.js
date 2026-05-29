export const structure = (S, context) =>
  S.list()
    .id("root")
    .title("Content")
    .items([
      S.documentTypeListItem("home")
        .title("Home")
        .child(
          S.document().schemaType("home").title("Home").documentId("home"),
        ),
      S.documentTypeListItem("about")
        .title("About")
        .child(
          S.document().schemaType("about").title("About").documentId("about"),
        ),

      S.documentTypeListItem("lookbook")
        .title("Look Book")
        .child(
          S.document()
            .schemaType("lookbook")
            .title("Look Book")
            .documentId("lookbook"),
        ),
      S.divider(),

      S.documentTypeListItem("character").title("Characters"),
      S.documentTypeListItem("project").title("Projects"),
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
