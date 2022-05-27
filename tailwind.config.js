const colors = require("tailwindcss/colors");
const plugin = require("tailwindcss/plugin");

module.exports = {
  mode: "jit",
  purge: ["./public/**/*.html", "./src/**/*.{astro,js,jsx,svelte,ts,tsx,vue}"],
  darkMode: false,
  theme: {
    screens: {
      xs: "414px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1920px",
      "4xl": "2560px",
      "can-hover": { raw: "(hover: hover)" },
      touch: { raw: "(hover: none)" },
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: "#000",
      white: "#fff",
      gray: colors.coolGray,
      blue: colors.sky,
      red: colors.red,
      orange: colors.orange,
      yellow: colors.amber,
      green: colors.emerald,
      vestra: "#2ec8dc",
      man: "#43a3c7",
      woman: "#DB2777",
      dead: "#2e2e2e",
      info: colors.sky[600],
      danger: colors.red[600],
      success: colors.green[600],
      dark: colors.gray[600],
    },
    fontFamily: {
      sans: [
        '"General Sans"',
        "ui-sans-serif",
        "system-ui",
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        '"Noto Sans"',
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
    },
    extend: {
      minWidth: (theme) => ({
        ...theme("spacing"),
        ...theme("width"),
        ...theme("maxWidth"),
        0: "0",
      }),
      margin: () => ({
        screen: "100vh",
      }),
      padding: {
        "16/9": "56.2%",
        "16/10": "62.5%",
      },
      width: (theme) => ({
        128: "32rem",
        160: "40rem",
        180: "45rem",
        200: "50rem",
      }),
      height: {
        "2px": "2px",
        22: "5.5rem",
      },
      inset: (theme) => ({
        ...theme("spacing"),
        ...theme("width"),
        ...theme("maxWidth"),
      }),
      zIndex: {
        "-10": "-10",
        60: "60",
        70: "70",
        80: "80",
        90: "90",
        100: "100",
      },
      transitionDelay: {
        100: "100ms",
        200: "200ms",
        400: "400ms",
        600: "600ms",
        600: "600ms",
        700: "700ms",
        800: "800ms",
        900: "900ms",
      }
    },
  },
  plugins: [
    plugin(function ({ addVariant, e, postcss }) {
      addVariant("firefox", ({ container, separator }) => {
        const isFirefoxRule = postcss.atRule({
          name: "-moz-document",
          params: "url-prefix()",
        });
        isFirefoxRule.append(container.nodes);
        container.append(isFirefoxRule);
        isFirefoxRule.walkRules((rule) => {
          rule.selector = `.${e(
            `firefox${separator}${rule.selector.slice(1)}`
          )}`;
        });
      });
    }),
  ],
};
