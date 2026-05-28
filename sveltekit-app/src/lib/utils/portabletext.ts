/**
 * PortableText HTML Entity Decoding Utility
 *
 * Simple utility to decode HTML entities in PortableText output.
 */

// HTML entity mapping for decoding
const HTML_ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&apos;": "'",
  "&nbsp;": " ",
  "&copy;": "©",
  "&reg;": "®",
  "&trade;": "™",
  "&euro;": "€",
  "&pound;": "£",
  "&yen;": "¥",
  "&cent;": "¢",
  "&rarr;": "→",
};

/**
 * Decode HTML entities in a string
 * @param html - HTML string with encoded entities
 * @returns Decoded HTML string
 */
export function decodeHtmlEntities(html: string): string {
  let decoded = html;

  // Replace common HTML entities
  for (const [encoded, decoded_char] of Object.entries(HTML_ENTITIES)) {
    decoded = decoded.replace(new RegExp(encoded, "g"), decoded_char);
  }

  // Handle numeric entities (&#123; and &#x1F;)
  decoded = decoded.replace(/&#(\d+);/g, (match, num) => {
    return String.fromCharCode(parseInt(num, 10));
  });

  decoded = decoded.replace(/&#x([0-9a-fA-F]+);/g, (match, hex) => {
    return String.fromCharCode(parseInt(hex, 16));
  });

  return decoded;
}
