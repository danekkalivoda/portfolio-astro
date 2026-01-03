/**
 * Header Clipping System
 *
 * Creates a dual-header visual effect using a single header element in HTML.
 * The dark header is the original element, and a light header is cloned at runtime.
 * CSS clip-path is used to reveal the light header over "white" sections.
 *
 * Also manages the header avatar visibility based on hero section scroll position.
 *
 * This approach ensures:
 * - Only one header in the DOM for SEO/accessibility
 * - Smooth visual transitions as user scrolls
 * - No flash of wrong colors during page load
 */

/**
 * Initialize Alpine store for header state
 * Available as $store.header.showAvatar and $store.nav.activeSection in templates
 */
export const initHeaderStore = () => {
  if (typeof window !== "undefined" && window.Alpine) {
    window.Alpine.store("header", {
      showAvatar: false,
    });

    window.Alpine.store("nav", {
      activeSection: "",
    });
  }
};

export const initHeaderSections = () => {
  if (typeof window !== "undefined") {
    const existingCleanup = window.__headerSectionsCleanup;
    if (typeof existingCleanup === "function") {
      existingCleanup();
    }
  }

  // Initialize Alpine store
  initHeaderStore();

  const isIOS = () => {
    const ua = window.navigator.userAgent;
    const isIOSDevice = /iP(hone|od|ad)/.test(ua);
    const isIPadOS = /Macintosh/.test(ua) && "ontouchend" in document;

    return isIOSDevice || isIPadOS;
  };

  const container = document.querySelector("[data-header-clip]");
  if (!container) {
    return;
  }

  const darkHeader = container.querySelector("[data-header-variant='dark']");
  if (!darkHeader) {
    return;
  }

  const existingLightHeader = container.querySelector(
    "[data-header-variant='light']",
  );
  if (existingLightHeader) {
    existingLightHeader.remove();
  }

  // Clone the header and modify for light variant
  const lightHeader = darkHeader.cloneNode(true);
  lightHeader.setAttribute("data-header-variant", "light");
  lightHeader.setAttribute("aria-hidden", "true"); // Hide from screen readers (it's just visual)

  // Swap class variants: dark -> light
  lightHeader.classList.remove("header--dark", "bg-gray-900/75");
  lightHeader.classList.add("header--light");

  // Hide light header initially (will be revealed by calculateClipPath when needed)
  lightHeader.style.clipPath = "inset(0 0 100% 0)";
  lightHeader.style.webkitClipPath = "inset(0 0 100% 0)";

  // Avoid duplicating the floating language switcher when cloning the header
  const floatingSwitcher = lightHeader.querySelector(
    "[data-language-switcher-floating]",
  );
  if (floatingSwitcher) {
    floatingSwitcher.remove();
  }

  // Insert the light header after the dark one
  container.appendChild(lightHeader);

  // Collect all sections with header variant indicators
  const sections = [];
  const sectionNodes = document.querySelectorAll("[data-header-section]");
  for (const node of sectionNodes) {
    sections.push(node);
  }

  if (!sections.length) {
    return;
  }

  const mobileSwitcher = document.querySelector(
    ".mobile-lang-switcher:not(.mobile-lang-switcher--light)",
  );
  let lightMobileSwitcher = null;
  if (mobileSwitcher) {
    const existingLightSwitchers = document.querySelectorAll(
      ".mobile-lang-switcher--light",
    );
    for (const existingLightSwitcher of existingLightSwitchers) {
      existingLightSwitcher.remove();
    }

    const switcherClone = mobileSwitcher.cloneNode(true);
    switcherClone.classList.add("mobile-lang-switcher--light");
    switcherClone.setAttribute("aria-hidden", "true");
    switcherClone.style.pointerEvents = "none";

    const cloneLinks = switcherClone.querySelectorAll("a");
    for (const link of cloneLinks) {
      link.setAttribute("tabindex", "-1");
      link.setAttribute("aria-hidden", "true");
    }

    if (mobileSwitcher.parentNode) {
      mobileSwitcher.parentNode.insertBefore(
        switcherClone,
        mobileSwitcher.nextSibling,
      );
      lightMobileSwitcher = switcherClone;
    }
  }

  /**
   * Get the current header height for calculations
   */
  const getHeaderHeight = () => {
    return darkHeader.getBoundingClientRect().height;
  };

  /**
   * Track hero section for avatar visibility
   */
  const heroSection = document.querySelector("[data-hero-section]");

  /**
   * Section IDs for navigation tracking
   * These correspond to the menu links in a_menulink.astro
   */
  const navSectionIds = ["projekty", "sluzby", "klienti", "kontakt"];
  const navSections = [];
  for (const id of navSectionIds) {
    const element = document.getElementById(id);
    if (element) {
      navSections.push({ id, element });
    }
  }

  /**
   * Update active section based on scroll position
   * Uses a threshold approach: section is active when its top is within
   * the upper portion of the viewport
   */
  const updateActiveSection = () => {
    if (navSections.length === 0) {
      return;
    }

    const headerHeight = getHeaderHeight();
    // Threshold: consider section active when its top is at or above this point
    const threshold = headerHeight + 100;

    let activeSection = "";

    // Find the section that is currently in view
    // We iterate in reverse to find the last section that has scrolled past the threshold
    for (let i = navSections.length - 1; i >= 0; i--) {
      const section = navSections[i];
      const rect = section.element.getBoundingClientRect();

      // Section is considered active if its top has scrolled past the threshold
      if (rect.top <= threshold) {
        activeSection = section.id;
        break;
      }
    }

    // Update Alpine store
    if (window.Alpine?.store) {
      window.Alpine.store("nav").activeSection = activeSection;
    }

    // Update data attribute on container for CSS targeting (works with cloned light header)
    container.dataset.activeSection = activeSection;

    // Also sync the is-active class to cloned light header links
    // The dark header Alpine handles its own state, but the clone needs manual sync
    const darkLinks = darkHeader.querySelectorAll(".header-menu-link");
    const lightLinks = lightHeader.querySelectorAll(".header-menu-link");

    for (let i = 0; i < darkLinks.length; i++) {
      const darkLink = darkLinks[i];
      const lightLink = lightLinks[i];
      if (!lightLink) {
        continue;
      }

      // Extract section ID from href (e.g., "/#projekty" -> "projekty")
      const href = darkLink.getAttribute("href") || "";
      const sectionId = href.replace(/^\/?#/, "");

      if (sectionId === activeSection) {
        darkLink.classList.add("is-active");
        lightLink.classList.add("is-active");

        // Auto-scroll nav to show active item on mobile
        scrollNavToActiveItem(darkLink, darkHeader);
        scrollNavToActiveItem(lightLink, lightHeader);
      } else {
        darkLink.classList.remove("is-active");
        lightLink.classList.remove("is-active");
      }
    }
  };

  /**
   * Scroll the navigation container to make the active item visible
   * Only applies on mobile where the nav is scrollable
   */
  const scrollNavToActiveItem = (activeLink, header) => {
    const nav = header.querySelector(".header-nav-scroll");
    if (!nav || nav.scrollWidth <= nav.clientWidth) {
      return; // Not scrollable, skip
    }

    const linkRect = activeLink.getBoundingClientRect();
    const navRect = nav.getBoundingClientRect();

    // Calculate the link's position relative to the nav container
    const linkLeft = linkRect.left - navRect.left + nav.scrollLeft;
    const linkRight = linkLeft + linkRect.width;

    // Center the active link in the visible area
    const navVisibleWidth = nav.clientWidth;
    const targetScroll = linkLeft - navVisibleWidth / 2 + linkRect.width / 2;

    // Clamp to valid scroll range
    const maxScroll = nav.scrollWidth - navVisibleWidth;
    const clampedScroll = Math.max(0, Math.min(targetScroll, maxScroll));

    nav.scrollTo({
      left: clampedScroll,
      behavior: "smooth",
    });
  };

  /**
   * Update fade mask visibility based on nav scroll position
   * Shows left/right fades only when there's content to scroll in that direction
   */
  const updateNavFadeMasks = () => {
    const navElements = container.querySelectorAll(".header-nav-scroll");

    for (const nav of navElements) {
      if (nav.scrollWidth <= nav.clientWidth) {
        // Not scrollable - remove all masks
        nav.removeAttribute("data-scroll-start");
        nav.removeAttribute("data-scroll-end");
        continue;
      }

      const scrollLeft = nav.scrollLeft;
      const maxScroll = nav.scrollWidth - nav.clientWidth;
      const threshold = 5; // Small threshold to account for rounding

      // Can scroll left (not at start)
      if (scrollLeft > threshold) {
        nav.setAttribute("data-scroll-start", "");
      } else {
        nav.removeAttribute("data-scroll-start");
      }

      // Can scroll right (not at end)
      if (scrollLeft < maxScroll - threshold) {
        nav.setAttribute("data-scroll-end", "");
      } else {
        nav.removeAttribute("data-scroll-end");
      }
    }
  };

  /**
   * Update avatar visibility based on hero section position
   * Updates both Alpine store and CSS class for dual-header support
   */
  const updateAvatarVisibility = () => {
    if (!heroSection) {
      return;
    }

    const heroRect = heroSection.getBoundingClientRect();
    const headerHeight = getHeaderHeight();

    // Show avatar when hero section is scrolled past the header
    const heroIsAboveHeader = heroRect.bottom <= headerHeight;

    // Update Alpine store (for template reactivity)
    if (window.Alpine?.store) {
      window.Alpine.store("header").showAvatar = heroIsAboveHeader;
    }

    // Update data attribute on container (for cloned light header)
    if (heroIsAboveHeader) {
      container.dataset.showAvatar = "";
    } else {
      delete container.dataset.showAvatar;
    }
  };

  /**
   * Calculate which white sections intersect with the header area
   * and generate a clip-path polygon to reveal the light header
   * only over those sections.
   *
   * The clip-path uses viewport coordinates since the header is fixed.
   */
  const calculateClipPath = () => {
    const onIOS = isIOS();
    const headerHeight = getHeaderHeight();
    const headerBottom = headerHeight;
    const viewportWidth = window.innerWidth;

    // Find all "white" sections that intersect the header area
    const whiteRanges = [];

    for (const section of sections) {
      const variant = section.getAttribute("data-header-section");
      if (variant !== "white") {
        continue;
      }

      const rect = section.getBoundingClientRect();

      // Check if this section intersects with the header area (0 to headerBottom)
      if (rect.bottom > 0 && rect.top < headerBottom) {
        // Calculate the visible portion within the header area
        const visibleTop = Math.max(0, rect.top);
        const visibleBottom = Math.min(headerBottom, rect.bottom);

        if (visibleBottom > visibleTop) {
          whiteRanges.push({
            top: visibleTop,
            bottom: visibleBottom,
          });
        }
      }
    }

    // If no white sections intersect header, hide the light header completely
    // and show dark header fully
    if (whiteRanges.length === 0) {
      lightHeader.style.clipPath = "inset(0 0 100% 0)";
      lightHeader.style.webkitClipPath = "inset(0 0 100% 0)";
      if (onIOS) {
        darkHeader.style.clipPath = "none";
        darkHeader.style.webkitClipPath = "none";
      } else {
        darkHeader.style.clipPath = "inset(0 0 0 0)";
      }
      return;
    }

    // Merge overlapping ranges (in case sections overlap)
    whiteRanges.sort((a, b) => a.top - b.top);
    const mergedRanges = [];

    for (const range of whiteRanges) {
      if (mergedRanges.length === 0) {
        mergedRanges.push({ ...range });
        continue;
      }

      const last = mergedRanges[mergedRanges.length - 1];
      if (range.top <= last.bottom) {
        // Ranges overlap, merge them
        last.bottom = Math.max(last.bottom, range.bottom);
      } else {
        mergedRanges.push({ ...range });
      }
    }

    // Build the clip-path polygon
    // For each white range, we create a rectangle that spans the full width
    // Using polygon allows for multiple disconnected regions
    const polygonPoints = [];

    for (const range of mergedRanges) {
      // Each range creates a rectangle: top-left, top-right, bottom-right, bottom-left
      // We need to add these as separate polygons using the polygon() function
      // Since polygon() creates a single shape, we'll use multiple inset() or a complex polygon

      // For simplicity with multiple ranges, we'll create a single polygon that
      // covers all white areas. This works well when ranges are vertically stacked.

      // Actually, CSS clip-path polygon can handle complex shapes by tracing the outline
      // For horizontal bands, we trace: start at top-left of first band,
      // go right to top-right, down to bottom-right, left to bottom-left,
      // then down to next band's top-left, etc.

      polygonPoints.push(
        `0px ${range.top}px`,
        `${viewportWidth}px ${range.top}px`,
        `${viewportWidth}px ${range.bottom}px`,
        `0px ${range.bottom}px`,
      );
    }

    // If we have multiple ranges, we need to connect them properly
    // The simplest approach for horizontal bands is to use multiple clip-paths
    // or create a polygon that traces all bands

    // For a single continuous polygon covering all ranges:
    if (mergedRanges.length === 1) {
      const range = mergedRanges[0];
      // Simple inset is more performant for a single rectangle
      const topInset = range.top;
      const bottomInset = headerHeight - range.bottom;

      // Light header: show where white section is
      lightHeader.style.clipPath = `inset(${topInset}px 0 ${bottomInset}px 0)`;
      lightHeader.style.webkitClipPath = `inset(${topInset}px 0 ${bottomInset}px 0)`;

      // Dark header: show where white section ISN'T
      // Determine which edge is the transition boundary
      if (topInset <= 0) {
        // White section starts at top of header, ends at range.bottom
        // Dark should be visible BELOW the white section
        darkHeader.style.clipPath = `inset(${range.bottom}px 0 0 0)`;
      } else {
        // White section starts below top of header (at range.top)
        // Dark should be visible ABOVE the white section
        darkHeader.style.clipPath = `inset(0 0 ${headerHeight - range.top}px 0)`;
      }
    } else {
      // For multiple ranges, create a polygon
      // Trace the outline: start at origin, go through each band
      const points = [];

      // Start at top-left corner of header
      points.push("0 0");

      // For each range, we need to carve out the visible areas
      // This is complex because polygon creates filled areas, not masks
      //
      // Alternative: Use multiple overlapping headers with different clips
      // But that defeats the purpose of our approach
      //
      // Better solution: For the header case, ranges are always full-width
      // horizontal bands. We can use a polygon that traces the outline
      // of all combined bands.

      let allPoints = [];
      // Trace clockwise around all white areas
      for (let i = 0; i < mergedRanges.length; i++) {
        const range = mergedRanges[i];
        if (i === 0) {
          allPoints.push(`0px ${range.top}px`);
        }
        allPoints.push(`100% ${range.top}px`);
        allPoints.push(`100% ${range.bottom}px`);

        // If there's a next range, we need to handle the gap
        if (i < mergedRanges.length - 1) {
          const nextRange = mergedRanges[i + 1];
          // Go back left and down to next range
          allPoints.push(`0px ${range.bottom}px`);
          allPoints.push(`0px ${nextRange.top}px`);
        }
      }

      // Close the polygon
      const lastRange = mergedRanges[mergedRanges.length - 1];
      allPoints.push(`0px ${lastRange.bottom}px`);

      lightHeader.style.clipPath = `polygon(${allPoints.join(", ")})`;
      lightHeader.style.webkitClipPath = `polygon(${allPoints.join(", ")})`;

      // Dark header: for multiple ranges, use first range logic
      if (onIOS) {
        darkHeader.style.clipPath = "none";
        darkHeader.style.webkitClipPath = "none";
      } else {
        const firstRange = mergedRanges[0];
        if (firstRange.top <= 0) {
          // White starts at top, dark visible below last white range
          const lastRange = mergedRanges[mergedRanges.length - 1];
          darkHeader.style.clipPath = `inset(${lastRange.bottom}px 0 0 0)`;
        } else {
          // White starts below top, dark visible above first white range
          darkHeader.style.clipPath = `inset(0 0 ${headerHeight - firstRange.top}px 0)`;
        }
      }
    }
  };

  /**
   * Update floating mobile language switcher clip mask based on white sections
   */
  const updateMobileSwitcherClip = () => {
    if (!mobileSwitcher || !lightMobileSwitcher) {
      return;
    }

    const onIOS = isIOS();
    const switcherRect = mobileSwitcher.getBoundingClientRect();
    if (!switcherRect.width || !switcherRect.height) {
      lightMobileSwitcher.style.clipPath = "inset(0 0 100% 0)";
      lightMobileSwitcher.style.webkitClipPath = "inset(0 0 100% 0)";
      lightMobileSwitcher.style.pointerEvents = "none";
      if (onIOS) {
        mobileSwitcher.style.clipPath = "none";
        mobileSwitcher.style.webkitClipPath = "none";
      } else {
        mobileSwitcher.style.clipPath = "inset(0 0 0 0)";
      }
      mobileSwitcher.style.pointerEvents = "auto";
      return;
    }

    const whiteRanges = [];

    for (const section of sections) {
      const variant = section.getAttribute("data-header-section");
      if (variant !== "white") {
        continue;
      }

      const rect = section.getBoundingClientRect();
      const visibleTop = Math.max(rect.top, switcherRect.top);
      const visibleBottom = Math.min(rect.bottom, switcherRect.bottom);

      if (visibleBottom > visibleTop) {
        whiteRanges.push({
          top: visibleTop - switcherRect.top,
          bottom: visibleBottom - switcherRect.top,
        });
      }
    }

    if (!whiteRanges.length) {
      lightMobileSwitcher.style.clipPath = "inset(0 0 100% 0)";
      lightMobileSwitcher.style.webkitClipPath = "inset(0 0 100% 0)";
      lightMobileSwitcher.style.pointerEvents = "none";
      if (onIOS) {
        mobileSwitcher.style.clipPath = "none";
        mobileSwitcher.style.webkitClipPath = "none";
      } else {
        mobileSwitcher.style.clipPath = "inset(0 0 0 0)";
      }
      mobileSwitcher.style.pointerEvents = "auto";
      return;
    }

    whiteRanges.sort((a, b) => a.top - b.top);
    const mergedRanges = [];

    for (const range of whiteRanges) {
      if (mergedRanges.length === 0) {
        mergedRanges.push({ ...range });
        continue;
      }

      const last = mergedRanges[mergedRanges.length - 1];
      if (range.top <= last.bottom) {
        last.bottom = Math.max(last.bottom, range.bottom);
      } else {
        mergedRanges.push({ ...range });
      }
    }

    const buildBandPolygon = (ranges) => {
      const points = [];
      for (let i = 0; i < ranges.length; i++) {
        const range = ranges[i];
        if (i === 0) {
          points.push(`0px ${range.top}px`);
        }
        points.push(`${switcherRect.width}px ${range.top}px`);
        points.push(`${switcherRect.width}px ${range.bottom}px`);

        if (i < ranges.length - 1) {
          const nextRange = ranges[i + 1];
          points.push(`0px ${range.bottom}px`);
          points.push(`0px ${nextRange.top}px`);
        }
      }

      const lastRange = ranges[ranges.length - 1];
      points.push(`0px ${lastRange.bottom}px`);

      return points.join(", ");
    };

    if (mergedRanges.length === 1) {
      const range = mergedRanges[0];
      const topInset = range.top;
      const bottomInset = switcherRect.height - range.bottom;

      lightMobileSwitcher.style.clipPath = `inset(${topInset}px 0 ${bottomInset}px 0)`;
      lightMobileSwitcher.style.webkitClipPath = `inset(${topInset}px 0 ${bottomInset}px 0)`;
      lightMobileSwitcher.style.pointerEvents = "auto";
    } else {
      const lightPolygon = buildBandPolygon(mergedRanges);
      lightMobileSwitcher.style.clipPath = `polygon(${lightPolygon})`;
      lightMobileSwitcher.style.webkitClipPath = `polygon(${lightPolygon})`;
      lightMobileSwitcher.style.pointerEvents = "auto";
    }

    if (onIOS) {
      mobileSwitcher.style.clipPath = "none";
      mobileSwitcher.style.webkitClipPath = "none";
    } else {
      mobileSwitcher.style.clipPath = `inset(0 0 0 0)`;
    }
    mobileSwitcher.style.pointerEvents = "auto";

    const darkRanges = [];
    let cursor = 0;

    for (let i = 0; i < mergedRanges.length; i++) {
      const range = mergedRanges[i];
      if (range.top > cursor) {
        darkRanges.push({
          top: cursor,
          bottom: range.top,
        });
      }
      cursor = Math.max(cursor, range.bottom);
    }

    if (cursor < switcherRect.height) {
      darkRanges.push({
        top: cursor,
        bottom: switcherRect.height,
      });
    }

    if (darkRanges.length === 0) {
      mobileSwitcher.style.clipPath = "inset(0 0 100% 0)";
      mobileSwitcher.style.webkitClipPath = "inset(0 0 100% 0)";
      mobileSwitcher.style.pointerEvents = "none";
      return;
    }

    if (darkRanges.length === 1) {
      const range = darkRanges[0];
      const topInset = range.top;
      const bottomInset = switcherRect.height - range.bottom;

      mobileSwitcher.style.clipPath = `inset(${topInset}px 0 ${bottomInset}px 0)`;
      mobileSwitcher.style.webkitClipPath = `inset(${topInset}px 0 ${bottomInset}px 0)`;
      mobileSwitcher.style.pointerEvents = "auto";
      return;
    }

    const darkPolygon = buildBandPolygon(darkRanges);
    mobileSwitcher.style.clipPath = `polygon(${darkPolygon})`;
    mobileSwitcher.style.webkitClipPath = `polygon(${darkPolygon})`;
    mobileSwitcher.style.pointerEvents = "auto";
  };

  let ticking = false;
  const onScroll = () => {
    if (ticking) {
      return;
    }
    ticking = true;
    window.requestAnimationFrame(() => {
      ticking = false;
      calculateClipPath();
      updateAvatarVisibility();
      updateActiveSection();
      updateNavFadeMasks();
      updateMobileSwitcherClip();
    });
  };

  const cleanupTasks = [];
  const addCleanup = (task) => {
    cleanupTasks.push(task);
  };

  // Listen for scroll and resize events
  window.addEventListener("scroll", onScroll, { passive: true });
  addCleanup(() => window.removeEventListener("scroll", onScroll));
  window.addEventListener("resize", onScroll);
  addCleanup(() => window.removeEventListener("resize", onScroll));

  // Listen for horizontal scroll within nav elements (user manually scrolling)
  // Note: We query after cloning so both dark and light header navs are included
  const setupNavScrollListeners = () => {
    const navElements = container.querySelectorAll(".header-nav-scroll");
    for (const nav of navElements) {
      nav.addEventListener("scroll", updateNavFadeMasks, { passive: true });
      addCleanup(() => nav.removeEventListener("scroll", updateNavFadeMasks));
    }
  };
  setupNavScrollListeners();

  // Initial calculation
  calculateClipPath();
  updateAvatarVisibility();
  updateActiveSection();
  updateNavFadeMasks();
  updateMobileSwitcherClip();

  if (typeof window !== "undefined") {
    window.__headerSectionsCleanup = () => {
      for (const task of cleanupTasks) {
        task();
      }

      if (lightMobileSwitcher) {
        lightMobileSwitcher.remove();
        lightMobileSwitcher = null;
      }
    };
  }
};
