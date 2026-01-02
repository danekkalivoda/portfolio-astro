# SEO Gap Analysis & Action Plan

**Site:** Portfolio Daniel Kalivoda
**Language:** Czech (cs)
**Stack:** Astro 5, Tailwind CSS 4, Alpine.js
**Date:** January 2025

---

## Executive Summary

This portfolio site has basic SEO foundations but lacks several critical technical and content optimization elements. The current implementation includes a good meta description and proper language tag, but is missing essential elements like robots.txt, sitemap, Open Graph tags, and structured data that are crucial for search visibility and social sharing.

**Current SEO Score Estimate:** 35/100
**Target SEO Score:** 85+/100

---

## 1. Current State Assessment

### What Exists Now

| Element | Status | Current Value |
|---------|--------|---------------|
| Title Tag | ✅ Present | "Daniel Kalivoda - Front-End Engineer & UI/UX Designer" |
| Meta Description | ✅ Present | "Front-end vývojář s 15+ lety zkušeností..." (147 chars) |
| Language | ✅ Set | `lang="cs"` |
| Viewport Meta | ✅ Present | Responsive configuration |
| Character Set | ✅ Present | UTF-8 |
| Pages | ✅ 2 pages | index.astro, success.astro |

### What's Missing (Critical)

| Element | Status | Impact |
|---------|--------|--------|
| robots.txt | ❌ Missing | HIGH - Search engines can't understand crawl preferences |
| sitemap.xml | ❌ Missing | HIGH - Poor page discovery |
| Open Graph Tags | ❌ Missing | HIGH - Poor social media sharing |
| Structured Data | ❌ Missing | HIGH - No rich snippets in search results |
| Canonical URL | ❌ Missing | MEDIUM - Potential duplicate content issues |
| Favicon | ❌ Missing in `<head>` | LOW - Brand recognition |
| Twitter Cards | ❌ Missing | MEDIUM - Poor Twitter sharing |
| H1 Tag | ⚠️ Using H2 | HIGH - Semantic structure issue |

---

## 2. Technical SEO Gaps

### 2.1 robots.txt (Missing)

**Impact:** HIGH
**Effort:** LOW

Currently no `robots.txt` file exists. This file tells search engines which pages to crawl and where to find the sitemap.

**Required Action:**
```txt
# public/robots.txt
User-agent: *
Allow: /

Sitemap: https://danielkalivoda.cz/sitemap-index.xml
```

### 2.2 XML Sitemap (Missing)

**Impact:** HIGH
**Effort:** LOW (Astro has built-in sitemap integration)

No sitemap exists. Astro provides `@astrojs/sitemap` for automatic generation.

**Required Actions:**
1. Install `@astrojs/sitemap`
2. Configure in `astro.config.mjs`
3. Set canonical site URL

### 2.3 Open Graph Meta Tags (Missing)

**Impact:** HIGH
**Effort:** MEDIUM

When shared on social media, the site has no preview image or description.

**Required Tags:**
```html
<meta property="og:title" content="Daniel Kalivoda - Front-End Engineer">
<meta property="og:description" content="...">
<meta property="og:image" content="/og-image.jpg">
<meta property="og:url" content="https://danielkalivoda.cz">
<meta property="og:type" content="website">
<meta property="og:locale" content="cs_CZ">
```

**User Action Required:**
- [ ] Create Open Graph image (1200x630px recommended)
- [ ] Confirm canonical domain URL

### 2.4 Twitter Card Meta Tags (Missing)

**Impact:** MEDIUM
**Effort:** LOW (once OG image exists)

**Required Tags:**
```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Daniel Kalivoda - Front-End Engineer">
<meta name="twitter:description" content="...">
<meta name="twitter:image" content="/og-image.jpg">
```

### 2.5 Structured Data / JSON-LD (Missing)

**Impact:** HIGH
**Effort:** MEDIUM

No structured data for search engines to understand site content.

**Recommended Schema Types:**
1. **Person** - For Daniel Kalivoda professional profile
2. **WebSite** - General site information
3. **LocalBusiness** (optional) - If targeting local Czech clients

**Example Person Schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Daniel Kalivoda",
  "jobTitle": "Front-End Engineer & UI/UX Designer",
  "url": "https://danielkalivoda.cz",
  "sameAs": [
    "https://linkedin.com/in/danielkalivoda",
    "https://github.com/danielkalivoda"
  ],
  "knowsAbout": ["Vue.js", "React", "TypeScript", "UI/UX Design"],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Pardubice",
    "addressCountry": "CZ"
  }
}
```

**User Action Required:**
- [ ] Confirm LinkedIn URL
- [ ] Confirm GitHub URL
- [ ] Confirm location (Pardubice?)
- [ ] Any other social profiles to include?

### 2.6 Canonical URLs (Missing)

**Impact:** MEDIUM
**Effort:** LOW

**Required:**
```html
<link rel="canonical" href="https://danielkalivoda.cz/">
```

### 2.7 Favicon (Missing in HTML)

**Impact:** LOW
**Effort:** LOW

Files may exist in `/public` but not referenced in `<head>`.

**Required:**
```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
```

**User Action Required:**
- [ ] Provide favicon files (or confirm creation needed)

### 2.8 Heading Structure Issue

**Impact:** HIGH
**Effort:** LOW

Current Hero section uses `<h2>` for the main heading "Designer & Developer". This should be `<h1>` for proper semantic structure.

**Current (Hero.astro line 35):**
```html
<h2 class="...">Designer & Developer</h2>
```

**Should be:**
```html
<h1 class="...">Designer & Developer</h1>
```

---

## 3. Content Optimization Gaps

### 3.1 Meta Description Optimization

**Current:** "Front-end vývojář s 15+ lety zkušeností. TypeScript-first development, komponenty ve Storybooku a produkční aplikace ve Vue 3 a Reactu."

**Issues:**
- Missing location targeting (Pardubice/Czech Republic)
- Could include call-to-action
- Length is good (147 chars, target 150-160)

**Suggested Improvement:**
"Front-end vývojář z Pardubic s 15+ lety zkušeností. TypeScript, Vue 3, React a UI/UX design. Pomáhám firmám budovat SaaS aplikace a design systémy."

### 3.2 Title Tag Optimization

**Current:** "Daniel Kalivoda - Front-End Engineer & UI/UX Designer"

**Issues:**
- Missing location targeting
- Could be more keyword-rich

**Suggested Alternatives:**
- "Daniel Kalivoda | Frontend vývojář Pardubice | Vue, React, TypeScript"
- "Daniel Kalivoda - Frontend Developer & UI Designer | Pardubice"

### 3.3 Image Alt Text Audit

**Current Status:**
| Image | Alt Text | Status |
|-------|----------|--------|
| Daniel_Kalivoda.webp | "Daniel Kalivoda" | ✅ Good |
| Project images | None visible | ⚠️ Check templates |

**Recommended:** Add descriptive alt text to all project images.

### 3.4 Content Gaps

**Missing Content Opportunities:**
- [ ] About/Bio section with more detail for SEO
- [ ] Individual project case study pages
- [ ] Blog section for long-tail keywords
- [ ] Services page with detailed service descriptions

---

## 4. Target Keyword Strategy

### 4.1 Primary Keywords (Czech)

| Keyword | Search Intent | Current Optimization | Priority |
|---------|--------------|---------------------|----------|
| frontend vývojář | Hiring | Partial | HIGH |
| frontend developer česko | Hiring | Missing | HIGH |
| webový vývojář pardubice | Local hiring | Missing | HIGH |
| vue.js vývojář | Hiring specific tech | Partial | MEDIUM |
| react vývojář | Hiring specific tech | Partial | MEDIUM |

### 4.2 Secondary Keywords (Czech)

| Keyword | Search Intent | Priority |
|---------|--------------|----------|
| typescript developer | Tech-specific hiring | MEDIUM |
| ui/ux designer pardubice | Local design | MEDIUM |
| saas vývoj aplikací | Service inquiry | MEDIUM |
| design systém vývoj | Service inquiry | LOW |
| storybook komponenty | Tech-specific | LOW |

### 4.3 Long-tail Keywords

| Keyword | Opportunity |
|---------|-------------|
| "frontend vývojář na volné noze" | Freelance positioning |
| "vue 3 vývojář česká republika" | Technology + location |
| "react typescript developer pardubice" | Full tech stack + location |
| "saas aplikace na míru" | Service positioning |

### 4.4 Location Targeting Strategy

**Primary Location:** Pardubice, Czech Republic
**Targeting Radius:** Czech Republic (remote-friendly)

**Recommendations:**
1. Add location to meta description
2. Include address in structured data
3. Consider Google Business Profile
4. Add location mentions naturally in content

---

## 5. Actionable Checklist

### 5.1 Items User Must Prepare/Provide

**Required from User:**

- [ ] **Canonical Domain URL** - Confirm: `https://danielkalivoda.cz` or other?
- [ ] **Open Graph Image** - Create 1200x630px image for social sharing
- [ ] **Favicon Files** - Provide or confirm need for creation:
  - favicon.svg (preferred)
  - favicon-32x32.png
  - apple-touch-icon.png (180x180)
- [ ] **Social Profile URLs** - For structured data:
  - LinkedIn: `https://linkedin.com/in/...`
  - GitHub: `https://github.com/...`
  - Twitter/X: (if applicable)
  - Other platforms
- [ ] **Location Confirmation** - Confirm Pardubice as primary location
- [ ] **Additional Keywords** - Any specific keywords to target?
- [ ] **Updated Meta Description** - Approve or modify suggested text

### 5.2 Technical Implementation Tasks

**Implementation (No user input needed):**

- [ ] Create `public/robots.txt`
- [ ] Install and configure `@astrojs/sitemap`
- [ ] Add Open Graph meta tags to BaseLayout
- [ ] Add Twitter Card meta tags to BaseLayout
- [ ] Add JSON-LD structured data (Person schema)
- [ ] Add canonical URL meta tag
- [ ] Fix H2 → H1 in Hero component
- [ ] Add favicon references to `<head>`
- [ ] Optimize meta description with location
- [ ] Review and optimize image alt texts

---

## 6. Priority Recommendations

### Priority 1: Critical (Week 1)
Impact: HIGH | Effort: LOW-MEDIUM

1. **Fix heading structure** - Change H2 to H1 in Hero
2. **Add robots.txt** - Basic crawling instructions
3. **Install sitemap integration** - `@astrojs/sitemap`
4. **Add canonical URL** - Prevent duplicate content
5. **Optimize title & description** - Include location keywords

### Priority 2: Important (Week 2)
Impact: HIGH | Effort: MEDIUM

1. **Add Open Graph tags** - Requires OG image from user
2. **Add Twitter Cards** - Uses same OG image
3. **Implement JSON-LD** - Person schema for rich results
4. **Add favicon references** - Requires files from user

### Priority 3: Enhancement (Week 3+)
Impact: MEDIUM | Effort: MEDIUM-HIGH

1. **Create additional pages** - Services, About, individual projects
2. **Add breadcrumb navigation** - For multi-page structure
3. **Implement blog** - Long-tail keyword targeting
4. **Performance optimization** - Core Web Vitals audit
5. **Add Google Search Console** - Monitor search performance

---

## 7. Expected Outcomes

After implementing all recommendations:

| Metric | Current | Expected |
|--------|---------|----------|
| SEO Score | ~35/100 | 85+/100 |
| Rich Results Eligibility | No | Yes |
| Social Sharing Preview | None | Full preview |
| Local Search Visibility | Low | High |
| Crawlability | Unknown | Optimized |

### Key Benefits:
1. **Better search rankings** for "frontend vývojář" and related terms
2. **Professional social sharing** with branded preview images
3. **Rich search results** with structured data
4. **Local visibility** for Pardubice/Czech Republic searches
5. **Improved click-through rates** from search results

---

## 8. Technical Notes

### Astro Configuration for SEO

The current `astro.config.mjs` is minimal:
```js
export default {
    devOptions: {
        tailwindConfig: './tailwind.config.js',
    },
};
```

**Recommended Update:**
```js
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
    site: 'https://danielkalivoda.cz',
    integrations: [sitemap()],
});
```

### BaseLayout.astro Modifications Needed

Current `<head>` section is minimal. Will need expansion for:
- Open Graph tags
- Twitter Cards
- Structured data script
- Canonical URL
- Favicon links

---

## Next Steps

1. **User Review:** Review this document and provide required items (Section 5.1)
2. **Implementation:** Once user provides assets, implement technical changes
3. **Testing:** Validate with:
   - Google Rich Results Test
   - Facebook Sharing Debugger
   - Twitter Card Validator
   - Google Search Console
4. **Monitoring:** Set up tracking for search performance

---

*Generated for Daniel Kalivoda Portfolio SEO Optimization Project*
