# FaithStream Design Guidelines

## Design Approach

**Reference-Based Approach** drawing from:
- **Spotify**: Music streaming patterns, player controls, library organization
- **Apple Music**: Clean content-first aesthetics, elegant typography
- **YouVersion Bible**: Scripture-centered design, devotional experience
- **Calm/Headspace**: Peaceful, focused UI with calming presence

**Core Design Principles:**
1. Reverent & Serene - Create a sanctuary-like digital space
2. Content-First - Let gospel music, sermons, and scripture shine
3. Modern Clarity - Clean, professional, timeless (not trendy)
4. Trust & Safety - Polished execution that feels reliable

## Typography

**Font Families:**
- Primary: Inter (UI elements, body text, navigation)
- Scripture/Headings: Crimson Pro (Bible verses, devotional content, elegant headers)
- Monospace: JetBrains Mono (timestamps, verse references)

**Hierarchy:**
- Hero/Feature Titles: text-4xl to text-6xl, font-semibold
- Section Headers: text-2xl to text-3xl, font-semibold
- Card Titles: text-lg, font-medium
- Body Text: text-base, font-normal
- Scripture Text: text-lg, font-serif (Crimson Pro), leading-relaxed
- Metadata: text-sm, text-gray-600

## Layout System

**Spacing Scale:** Use Tailwind units of **2, 4, 6, 8, 12, 16** for consistency
- Component padding: p-4 to p-6
- Section spacing: py-12 to py-16
- Card gaps: gap-6
- Content margins: mb-8, mt-6

**Container Strategy:**
- Max width: max-w-7xl for main content
- Bible reader: max-w-3xl for optimal reading
- Sidebar navigation: w-64 (desktop)

## Component Library

### Navigation
**Primary Sidebar** (Desktop):
- Fixed left sidebar (w-64) with logo at top
- Navigation sections: Home, Browse Music, Sermons, Bible, Library, Profile
- Mini player docked at bottom of sidebar
- Church Connect link for church accounts

**Mobile Header:**
- Top navigation bar with hamburger menu
- Logo centered
- Search icon right-aligned

### Music Player

**Full Player View:**
- Large album artwork (400x400px) centered
- Song title (text-2xl, font-semibold)
- Artist name (text-lg, text-gray-600)
- Progress bar with timestamps
- Control buttons: Previous, Play/Pause (larger), Next, Shuffle, Loop
- Volume slider on right
- Lyrics/Scripture toggle button
- Background: Subtle gradient derived from album art

**Mini Player:**
- Fixed at bottom, full-width
- Album thumbnail (56x56px) on left
- Track info (truncated) in center
- Play controls and volume on right
- Progress bar along top edge

### Sermon Player
- Video/audio toggle tabs
- Large play button overlay on thumbnail
- Speed controls (0.5x, 1x, 1.5x, 2x) clearly visible
- Chapter markers on progress bar
- Notes panel toggle (collapsible side panel)
- Share and download buttons in header

### Bible Reader
- Two-column layout on desktop: chapter list (left), content (right)
- Verse numbers in left margin
- Highlight and note icons on hover
- Daily Verse card: featured at top with beautiful imagery, large text, share button
- Translation selector (KJV, NIV, NKJV) as dropdown
- Reading plan progress indicator

### Content Cards

**Music Album Cards:**
- Square album artwork
- Title below (font-medium)
- Artist name (text-sm, text-gray-600)
- Play button overlay on hover
- Rounded corners (rounded-lg)

**Sermon Cards:**
- 16:9 thumbnail aspect ratio
- Pastor photo badge overlaid on bottom-left
- Title, church name, duration
- Category tag chip
- Play icon overlay

**Church Profile Cards:**
- Header banner with church logo
- Member count, location
- Recent uploads grid
- Follow/Subscribe button

### Search Interface
- Search bar with icon (magnifying glass)
- Filter chips: All, Music, Sermons, Pastors, Scripture, Churches
- Results grouped by type with section headers
- Inline play buttons for quick preview

### Home Dashboard Sections

1. **Hero Section**: Featured content carousel with large imagery, play button overlays with blurred backgrounds, auto-rotating
2. **Continue Listening**: Horizontal scrollable row of recent items
3. **Verse of the Day**: Full-width card with calming background image, large scripture text
4. **New Gospel Releases**: Grid of album cards (4 columns desktop)
5. **Trending Sermons**: Grid of sermon cards (3 columns desktop)
6. **Featured Artists/Churches**: Large profile cards with featured content

## Form Elements
- Input fields: border border-gray-300, rounded-lg, p-3, focus:ring-2 focus:ring-blue-500
- Buttons: Primary (bg-blue-600, text-white, rounded-lg, px-6 py-3), Secondary (outlined)
- Toggle switches for preferences (iOS-style)
- Dropdowns with subtle shadows

## Images

**Required Images:**
1. **Hero Carousel**: 3-5 high-quality images showcasing worship moments, gospel artists performing, congregation in worship (1920x800px)
2. **Verse of the Day Background**: Peaceful nature/abstract imagery (1920x400px)
3. **Album Artwork**: Square placeholders for gospel albums (400x400px minimum)
4. **Sermon Thumbnails**: 16:9 ratio, pastor speaking or church setting
5. **Church Banners**: Wide format for church profile headers (1200x300px)
6. **Pastor Profile Photos**: Circular, professional headshots (200x200px)
7. **Category Icons**: Simple, reverent iconography for sermon categories

## Animations
**Minimal & Purposeful:**
- Fade-in on scroll for content sections (duration-300)
- Smooth transitions on hover states (transition-all duration-200)
- Play button pulse on featured content (subtle)
- NO distracting scroll animations or excessive motion

## Accessibility
- WCAG AA contrast ratios minimum
- Keyboard navigation fully supported
- Focus indicators on all interactive elements (ring-2 ring-blue-500)
- ARIA labels for player controls
- Screen reader friendly Bible navigation
- Skip to content links