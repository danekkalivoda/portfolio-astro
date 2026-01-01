export const initHeader = () => {
  start();
};

const start = () => {
  window.header = () => {
    return {
      // Note: header color state is now handled by CSS clip-path in headerSections.js
      // These properties are used by Hero.astro for content animations
      content: "visible",
      animateContent: false,
      init() {
        this.$nextTick(() => {
          this.animateContent = true;
        });
      }
    };
  };
};
