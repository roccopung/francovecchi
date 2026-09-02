<script lang="ts">
  type Props = {
    fill?: string;
  };
  let { fill = "var(--color-black)" }: Props = $props();
</script>

<svg
  width="100%"
  height="100%"
  viewBox="0 0 52 44"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M29.84 0.64209L29.91 1.40209C30.93 12.2021 39.48 20.7521 50.28 21.7721L51.04 21.8421L50.28 21.9121C39.48 22.9321 30.93 31.4821 29.91 42.2821L29.84 43.0421"
    stroke={fill}
    stroke-width="14"
    stroke-miterlimit="10"
  />
  <path
    d="M0 21.8423H41.65"
    stroke={fill}
    stroke-width="14"
    stroke-miterlimit="10"
  />
</svg>
