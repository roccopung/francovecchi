<script lang="ts">
  type Props = {
    fill?: string;
  };
  let { fill = "var(--color-black)" }: Props = $props();
</script>

<svg
  width="27"
  height="22"
  viewBox="0 0 27 22"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M26.9766 11L16.9854 22H9.97656L17.2432 14H0V8H17.2432L9.97656 0H16.9854L26.9766 11Z"
    {fill}
  />
</svg>
