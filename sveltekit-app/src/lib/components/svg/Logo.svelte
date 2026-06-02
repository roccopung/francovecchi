<script lang="ts">
  type Props = {
    fill?: string;
  };
  let { fill = "var(--color-dark-gray)" }: Props = $props();
</script>

<svg
  width="100%"
  height="100%"
  viewBox="0 0 126 65"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M123.49 2V31.77C123.49 48.6 109.8 62.28 92.98 62.28H2V31.72C2 15.33 15.33 2 31.72 2H123.48M125.49 0H31.72C14.2 0 0 14.2 0 31.72V64.28H92.97C110.93 64.28 125.48 49.72 125.48 31.77V0H125.49Z"
    {fill}
  />
  <path
    d="M31.2 6.19C17.48 6.29 6.39 17.44 6.39 31.18V58.01H34.45V45.62H59.26V38.05H34.45V33.23H59.26V6.19H31.2Z"
    {fill}
  />
  <path
    d="M95.57 6.19L90.19 41.83H85.24L91.67 6.19H63.61V58.01H93.79C107.75 58.01 119.07 46.69 119.07 32.73V6.19H95.57Z"
    {fill}
  />
</svg>
