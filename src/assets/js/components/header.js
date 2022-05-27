export const initHeader = () => {
  if (hasHeaderComponent()) {
    start();
  }
};

/**
 * Checks if page has header component
 * @return {Boolean}
 */
const hasHeaderComponent = () => {
  return document.querySelectorAll("[x-data='header()']").length > 0;
};

const start = () => {
  window.header = () => {
    return {
      header: "default",
      content: "hidden",
      animateContent: true,
      init() {
          this.$nextTick(() => {
            this.content = "visible"
          })
      }
    };
  };
};
