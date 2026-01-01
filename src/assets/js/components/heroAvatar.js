export const initHeroAvatar = () => {
  if (typeof window === "undefined") {
    return;
  }

  const clamp = (value, min, max) => {
    return Math.min(max, Math.max(min, value));
  };

  window.heroAvatar = () => {
    return {
      ratioX: 0.5,
      ratioY: 0.5,
      tiltX: "0deg",
      tiltY: "0deg",
      shiftX: "0%",
      shiftY: "0%",
      active: false,
      tiltIntensity: 34,
      shiftIntensity: 10,
      init() {
        this.applyTransforms();
      },
      onEnter(event) {
        this.active = true;
        this.updateFromEvent(event);
      },
      onMove(event) {
        if (!this.active) {
          this.active = true;
        }
        this.updateFromEvent(event);
      },
      onLeave() {
        this.active = false;
        this.setRatios(0.5, 0.5);
      },
      updateFromEvent(event) {
        if (!event || !this.$el) {
          return;
        }

        const bounds = this.$el.getBoundingClientRect();
        if (!bounds.width || !bounds.height) {
          return;
        }

        const touchPoint = event.touches && event.touches.length ? event.touches[0] : null;
        const changedTouch = event.changedTouches && event.changedTouches.length ? event.changedTouches[0] : null;
        const point = touchPoint || changedTouch || event;
        const pointX = typeof point.clientX === "number" ? point.clientX : 0;
        const pointY = typeof point.clientY === "number" ? point.clientY : 0;
        const posX = pointX - bounds.left;
        const posY = pointY - bounds.top;

        const ratioX = clamp(posX / bounds.width, 0, 1);
        const ratioY = clamp(posY / bounds.height, 0, 1);

        this.setRatios(ratioX, ratioY);
      },
      setRatios(ratioX, ratioY) {
        this.ratioX = ratioX;
        this.ratioY = ratioY;
        this.applyTransforms();
      },
      applyTransforms() {
        const offsetX = (this.ratioX - 0.5) * 2;
        const offsetY = (this.ratioY - 0.5) * 2;

        const tiltX = (-offsetY * this.tiltIntensity).toFixed(2);
        const tiltY = (offsetX * this.tiltIntensity).toFixed(2);
        const shiftX = (-offsetX * this.shiftIntensity).toFixed(2);
        const shiftY = (-offsetY * this.shiftIntensity).toFixed(2);

        this.tiltX = `${tiltX}deg`;
        this.tiltY = `${tiltY}deg`;
        this.shiftX = `${shiftX}%`;
        this.shiftY = `${shiftY}%`;
      }
    };
  };
};
