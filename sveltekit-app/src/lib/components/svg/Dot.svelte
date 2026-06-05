<script lang="ts">
  type Props = {
    fill?: string;
  };
  let { fill = "var(--color-black)" }: Props = $props();
</script>

<svg
  width="100%"
  height="100%"
  viewBox="0 0 12 12"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <circle cx="5.5" cy="5.5" r="5.5" {fill} />
</svg>
