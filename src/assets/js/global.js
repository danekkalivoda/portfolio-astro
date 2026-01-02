import Alpine from 'alpinejs'
import intersect from '@alpinejs/intersect'

import { initHeader } from "../js/components/header.js";
import { initHeroAvatar } from "../js/components/heroAvatar.js";
import { initHeaderSections } from "../js/components/headerSections.js";
import { initContactForm } from "../js/components/contactForm.js";

Alpine.plugin(intersect)
window.Alpine = Alpine

const prefersIOSViewportFix = () => {
  const ua = window.navigator.userAgent;
  const isIOSDevice = /iP(hone|od|ad)/.test(ua);
  const isIPadOS = /Macintosh/.test(ua) && "ontouchend" in document;

  return isIOSDevice || isIPadOS;
};

const getViewportHeight = () => {
  const root = document.documentElement;
  const visualViewport = window.visualViewport;
  let height = window.innerHeight;

  if (root) {
    height = Math.max(height, root.clientHeight);
  }

  if (typeof window.outerHeight === "number") {
    height = Math.max(height, window.outerHeight);
  }

  if (window.screen && typeof window.screen.height === "number") {
    const ratio = window.devicePixelRatio || 1;
    const screenHeight = Math.round(window.screen.height / ratio);
    height = Math.max(height, screenHeight);
  }

  if (window.screen && typeof window.screen.availHeight === "number") {
    const ratio = window.devicePixelRatio || 1;
    const screenAvailHeight = Math.round(window.screen.availHeight / ratio);
    height = Math.max(height, screenAvailHeight);
  }

  if (visualViewport) {
    const visualHeight = Math.round(visualViewport.height + visualViewport.offsetTop);
    height = Math.max(height, visualHeight);
  }

  return height;
};

const getViewportOverscan = () => {
  const visualViewport = window.visualViewport;

  if (!visualViewport) {
    return 0;
  }

  const diff = window.innerHeight - visualViewport.height;
  return diff > 0 ? Math.round(diff) : 0;
};

const setAppHeight = () => {
  const root = document.documentElement;

  if (!root) {
    return;
  }

  const height = getViewportHeight();
  const overscan = getViewportOverscan();
  root.style.setProperty("--app-height", `${height + overscan}px`);
};

const initViewportHeightFix = () => {
  if (!prefersIOSViewportFix()) {
    return;
  }

  let raf = 0;
  const scheduleUpdate = () => {
    if (raf) {
      return;
    }

    raf = window.requestAnimationFrame(() => {
      raf = 0;
      setAppHeight();
    });
  };

  setAppHeight();

  window.addEventListener("resize", scheduleUpdate, { passive: true });
  window.addEventListener("orientationchange", scheduleUpdate, { passive: true });
  window.addEventListener("scroll", scheduleUpdate, { passive: true });

  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", scheduleUpdate, { passive: true });
    window.visualViewport.addEventListener("scroll", scheduleUpdate, { passive: true });
  }

  window.setTimeout(setAppHeight, 250);
  window.setTimeout(setAppHeight, 1000);
};

initHeader();
initHeroAvatar();
initContactForm();
initViewportHeightFix();

Alpine.start();
initHeaderSections();
