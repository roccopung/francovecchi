<script lang="ts">
  type Props = {
    fill?: string;
  };
  let { fill = "var(--color-black)" }: Props = $props();
</script>

<svg
  class="arrow-enter w-full aspect-square"
  width="100%"
  height="100%"
  viewBox="0 0 18 18"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M2 10H14.6826L9.99805 4.75391H12.6406L17.998 10.7539L12.6406 17.7539H9.99805L14.4014 12H0V0H2V10Z"
    {fill}
  />
</svg>
