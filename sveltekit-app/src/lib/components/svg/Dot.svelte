<script lang="ts">
  type Props = {
    fill?: string;
  };
  let { fill = "var(--color-black)" }: Props = $props();
</script>

<svg
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <circle cx="12" cy="12" r="12" {fill} />
</svg>
