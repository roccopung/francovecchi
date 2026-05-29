import { StringInputProps, set } from "sanity";
import { Grid, Button, Stack, Label, Text } from "@sanity/ui";
import { useCallback } from "react";
import { IMAGES_COL_SPAN } from "../../constants";

export function StackedGalleryInput(props: StringInputProps) {
  const { value, onChange } = props;

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const nextValue = event.currentTarget.value;
      onChange(set(nextValue));
    },
    [onChange],
  );

  return (
    <Grid columns={4} gap={3}>
      {IMAGES_COL_SPAN.map((input) => (
        <Button
          key={input.value}
          value={input.value}
          mode={value === input.value ? "default" : "ghost"}
          tone={value === input.value ? "primary" : "default"}
          onClick={handleClick}
          padding={2}
        >
          <Stack space={2}>
            <img
              src={`/static/col-span-thumbnails/${input.value}.png`}
              alt={input.title}
              style={{ width: "100%", borderRadius: 4 }}
            />
            <Label size={1} style={{ textAlign: "center" }}>
              {input.title}
            </Label>
          </Stack>
        </Button>
      ))}
    </Grid>
  );
}
