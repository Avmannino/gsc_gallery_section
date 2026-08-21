import {
  useEffect,
  useRef,
  useState,
} from "react";
import "./App.css";

const SITE_BASE_URL =
  "https://wingsarenact.wixstudio.com/gscnewsite";

const MEMBER_LOGIN_URL =
  "https://www.greenwichskatingclub.org/login";

const ADMISSIONS_EMAIL =
  "gscadmissions@greenwichskatingclub.org";

const GSC_PHONE_NUMBER = "(203) 622-9583";

const CENTER_ICE_LOGO_SRC =
  `${import.meta.env.BASE_URL}gsc-logo.png`;

const SCOREBOARD_IMAGE_SRC =
  `${import.meta.env.BASE_URL}scoreboard.png`;

const RINKCARDS_BACKGROUND_SRC =
  `${import.meta.env.BASE_URL}gsc-background.jpg`;

const NET_IMAGE_SRC =
  `${import.meta.env.BASE_URL}net.png`;

const GALLERY_IMAGE_BASE =
  `${import.meta.env.BASE_URL}gallery/`;

// Matches the crease diameter (radius 5, spanning 10 rink units).
const NET_MOUTH_WIDTH = 10;
// Scaled from NET_MOUTH_WIDTH using net.png's cropped aspect ratio (535x1023).
const NET_DEPTH = 5.23;
// Small standoff so the net's red goal bar sits just behind the crease's
// flat edge instead of flush against it (~2px at typical rink render widths).
const NET_GAP = 0.35;

const GALLERY_AUTOPLAY_MS = 3200;
const GALLERY_BREAKPOINT = "(max-width: 999px)";

// Desktop cards are laid out at the full 1.45x active size instead of
// enlarging the active image with transform: scale(). This keeps the
// main image sharper while preserving the existing visual size/spacing
// of the surrounding carousel cards.
const DESKTOP_ACTIVE_CARD_RATIO = 1.45;
const DESKTOP_TRANSLATE_STEP_PERCENT =
  86 / DESKTOP_ACTIVE_CARD_RATIO;

const galleryItems = [
  {
    src: `${GALLERY_IMAGE_BASE}gallery-01.jpeg`,
    alt: "Greenwich Skating Club gallery image 1",
  },
  {
    src: `${GALLERY_IMAGE_BASE}gallery-02.jpg`,
    alt: "Greenwich Skating Club gallery image 2",
  },
  {
    src: `${GALLERY_IMAGE_BASE}gallery-03.jpg`,
    alt: "Greenwich Skating Club gallery image 3",
  },
  {
    src: `${GALLERY_IMAGE_BASE}gallery-04.jpg`,
    alt: "Greenwich Skating Club gallery image 4",
  },
  {
    src: `${GALLERY_IMAGE_BASE}gallery-05.jpg`,
    alt: "Greenwich Skating Club gallery image 5",
  },
  {
    src: `${GALLERY_IMAGE_BASE}gallery-06.jpg`,
    alt: "Greenwich Skating Club gallery image 6",
  },
  {
    src: `${GALLERY_IMAGE_BASE}gallery-07.jpg`,
    alt: "Greenwich Skating Club gallery image 7",
  },
  {
    src: `${GALLERY_IMAGE_BASE}gallery-08.jpg`,
    alt: "Greenwich Skating Club gallery image 8",
  },
  {
    src: `${GALLERY_IMAGE_BASE}gallery-09.jpg`,
    alt: "Greenwich Skating Club gallery image 9",
  },
  {
    src: `${GALLERY_IMAGE_BASE}gallery-10.jpg`,
    alt: "Greenwich Skating Club gallery image 10",
  },
  {
    src: `${GALLERY_IMAGE_BASE}gallery-11.jpg`,
    alt: "Greenwich Skating Club gallery image 11",
  },
  {
    src: `${GALLERY_IMAGE_BASE}gallery-12.jpg`,
    alt: "Greenwich Skating Club gallery image 12",
  },
];

const exploreGroups = [
  {
    title: "About",
    links: [
      {
        label: "About GSC",
        href: `${SITE_BASE_URL}/about-gsc`,
      },
      {
        label: "Club History",
        href: `${SITE_BASE_URL}/history`,
      },
      {
        label: "Board of Governors",
        href: `${SITE_BASE_URL}/board`,
      },
      {
        label: "GSC Alumni",
        href: `${SITE_BASE_URL}/alumni`,
      },
    ],
  },
  {
    title: "Membership",
    links: [
      {
        label: "Admissions Process",
        href: `${SITE_BASE_URL}/admissions`,
      },
    ],
  },
  {
    title: "Programs",
    links: [
      {
        label: "Learn to Skate",
        href: `${SITE_BASE_URL}/learn-to-skate`,
      },
      {
        label: "Mini Mites",
        href: `${SITE_BASE_URL}/mini-mites`,
      },
      {
        label: "Youth Travel Hockey",
        href: `${SITE_BASE_URL}/youth-travel-hockey`,
      },
      {
        label: "Stateline Girls Hockey",
        href: `${SITE_BASE_URL}/stateline-girls-hockey`,
      },
      {
        label: "Figure Skating",
        href: `${SITE_BASE_URL}/figure-skating`,
      },
      {
        label: "Adult Hockey",
        href: `${SITE_BASE_URL}/adult-hockey`,
      },
    ],
  },
  {
    title: "Contact",
    links: [
      {
        label: "Map & Directions",
        href: `${SITE_BASE_URL}/directions`,
      },
      {
        label: "Contact Form",
        href: `${SITE_BASE_URL}/contact`,
      },
    ],
  },
];


function LandscapeRinkMarkings() {
  return (
    <svg
      className="rinkcards-rink__markings rinkcards-rink__markings--landscape"
      viewBox="0 0 200 90"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <line
        x1="12"
        y1="0"
        x2="12"
        y2="90"
        className="rinkcards-rink__goal-line"
      />

      <line
        x1="188"
        y1="0"
        x2="188"
        y2="90"
        className="rinkcards-rink__goal-line"
      />

      <line
        x1="75"
        y1="0"
        x2="75"
        y2="90"
        className="rinkcards-rink__blue-line"
      />

      <line
        x1="125"
        y1="0"
        x2="125"
        y2="90"
        className="rinkcards-rink__blue-line"
      />

      <line
        x1="100"
        y1="0"
        x2="100"
        y2="90"
        className="rinkcards-rink__center-line"
      />

      <path
        d="M 12 40 A 5 5 0 0 1 12 50 Z"
        className="rinkcards-rink__crease"
      />

      <path
        d="M 188 40 A 5 5 0 0 0 188 50 Z"
        className="rinkcards-rink__crease"
      />

      <image
        href={NET_IMAGE_SRC}
        x={12 - NET_GAP - NET_DEPTH}
        y={45 - NET_MOUTH_WIDTH / 2}
        width={NET_DEPTH}
        height={NET_MOUTH_WIDTH}
        preserveAspectRatio="xMidYMid meet"
        className="rinkcards-rink__net"
      />

      <g transform={`translate(${188 + NET_GAP + NET_DEPTH}, 0) scale(-1, 1)`}>
        <image
          href={NET_IMAGE_SRC}
          x="0"
          y={45 - NET_MOUTH_WIDTH / 2}
          width={NET_DEPTH}
          height={NET_MOUTH_WIDTH}
          preserveAspectRatio="xMidYMid meet"
          className="rinkcards-rink__net"
        />
      </g>

      <image
        href={CENTER_ICE_LOGO_SRC}
        x="87"
        y="32"
        width="26"
        height="26"
        preserveAspectRatio="xMidYMid meet"
        className="rinkcards-rink__logo"
      />
    </svg>
  );
}

// Corner faceoff circle centers (landscape), as % of the rink container —
// kept exactly where they are in the code you provided.
const FACEOFF_CIRCLE_CENTERS = [
  { left: 15.5, top: 20.56 },
  { left: 15.5, top: 79.44 },
  { left: 84.5, top: 20.56 },
  { left: 84.5, top: 79.44 },
];

// The four small L brackets around each end-zone faceoff dot.
// These sit inside the faceoff circle and do not affect the circle itself.
const FACEOFF_L_OFFSET_CQW = 1.55;

// Curling house dimensions are based on the rink container width so the
// rings remain true circles on the landscape rink. The center offset leaves
// a small visible gap between each hockey faceoff circle and curling house.
const CURLING_HOUSE_SIZE_CQW = 5.6;
const CURLING_HOUSE_CENTER_OFFSET_CQW = 9.4;

function FaceoffLBrackets() {
  const corners = [
    { x: -1, y: -1, className: "top-left" },
    { x: 1, y: -1, className: "top-right" },
    { x: -1, y: 1, className: "bottom-left" },
    { x: 1, y: 1, className: "bottom-right" },
  ];

  return FACEOFF_CIRCLE_CENTERS.flatMap(({ left, top }, circleIndex) =>
    corners.map(({ x, y, className }) => (
      <span
        key={`${circleIndex}-${className}`}
        className={`rinkcards-rink__faceoff-l rinkcards-rink__faceoff-l--${className}`}
        style={{
          left: `calc(${left}% + ${x * FACEOFF_L_OFFSET_CQW}cqw)`,
          top: `calc(${top}% + ${y * FACEOFF_L_OFFSET_CQW}cqw)`,
        }}
      />
    )),
  );
}

function CurlingHouse({ left, top }) {
  return (
    <span
      className="rinkcards-rink__curling-house"
      style={{
        left,
        top,
        width: `${CURLING_HOUSE_SIZE_CQW}cqw`,
      }}
    >
      <span className="rinkcards-rink__curling-house-ring rinkcards-rink__curling-house-ring--middle" />
      <span className="rinkcards-rink__curling-house-ring rinkcards-rink__curling-house-ring--inner" />
      <span className="rinkcards-rink__curling-house-button" />
    </span>
  );
}

function LandscapeRinkCircles() {
  return (
    <div
      className="rinkcards-rink__circles"
      aria-hidden="true"
    >
      <span
        className="rinkcards-rink__circle-shape"
        style={{ left: "50%", top: "50%", width: "14%" }}
      />

      <span
        className="rinkcards-rink__circle-shape"
        style={{ left: "15.5%", top: "20.56%", width: "10%" }}
      />

      <span
        className="rinkcards-rink__circle-shape"
        style={{ left: "15.5%", top: "79.44%", width: "10%" }}
      />

      <span
        className="rinkcards-rink__circle-shape"
        style={{ left: "84.5%", top: "20.56%", width: "10%" }}
      />

      <span
        className="rinkcards-rink__circle-shape"
        style={{ left: "84.5%", top: "79.44%", width: "10%" }}
      />

      <span
        className="rinkcards-rink__dot-shape"
        style={{ left: "50%", top: "50%", width: "1.35%" }}
      />

      <span
        className="rinkcards-rink__dot-shape"
        style={{ left: "15.5%", top: "20.56%", width: "1.15%" }}
      />

      <span
        className="rinkcards-rink__dot-shape"
        style={{ left: "15.5%", top: "79.44%", width: "1.15%" }}
      />

      <span
        className="rinkcards-rink__dot-shape"
        style={{ left: "84.5%", top: "20.56%", width: "1.15%" }}
      />

      <span
        className="rinkcards-rink__dot-shape"
        style={{ left: "84.5%", top: "79.44%", width: "1.15%" }}
      />

      <span
        className="rinkcards-rink__dot-shape"
        style={{ left: "40%", top: "20.56%", width: "1.3%" }}
      />

      <span
        className="rinkcards-rink__dot-shape"
        style={{ left: "40%", top: "79.44%", width: "1.3%" }}
      />

      <span
        className="rinkcards-rink__dot-shape"
        style={{ left: "60%", top: "20.56%", width: "1.3%" }}
      />

      <span
        className="rinkcards-rink__dot-shape"
        style={{ left: "60%", top: "79.44%", width: "1.3%" }}
      />

      <FaceoffLBrackets />

      <CurlingHouse
        left={`calc(15.5% + ${CURLING_HOUSE_CENTER_OFFSET_CQW}cqw)`}
        top="20.56%"
      />
      <CurlingHouse
        left={`calc(15.5% + ${CURLING_HOUSE_CENTER_OFFSET_CQW}cqw)`}
        top="79.44%"
      />
      <CurlingHouse
        left={`calc(84.5% - ${CURLING_HOUSE_CENTER_OFFSET_CQW}cqw)`}
        top="20.56%"
      />
      <CurlingHouse
        left={`calc(84.5% - ${CURLING_HOUSE_CENTER_OFFSET_CQW}cqw)`}
        top="79.44%"
      />
    </div>
  );
}

const PORTRAIT_FACEOFF_CENTERS = [
  { x: 21, y: 43 },
  { x: 69, y: 43 },
  { x: 21, y: 157 },
  { x: 69, y: 157 },
];

function PortraitFaceoffLBrackets() {
  return PORTRAIT_FACEOFF_CENTERS.map(({ x, y }) => (
    <g key={`portrait-l-${x}-${y}`}>
      {/* Top-left: corner sits nearest the dot; both arms extend outward. */}
      <path
        d={`M ${x - 3.0} ${y - 1.15} H ${x - 1.15} V ${y - 3.0}`}
        className="rinkcards-rink__faceoff-l-svg"
      />

      {/* Top-right */}
      <path
        d={`M ${x + 1.15} ${y - 3.0} V ${y - 1.15} H ${x + 3.0}`}
        className="rinkcards-rink__faceoff-l-svg"
      />

      {/* Bottom-left */}
      <path
        d={`M ${x - 3.0} ${y + 1.15} H ${x - 1.15} V ${y + 3.0}`}
        className="rinkcards-rink__faceoff-l-svg"
      />

      {/* Bottom-right */}
      <path
        d={`M ${x + 1.15} ${y + 3.0} V ${y + 1.15} H ${x + 3.0}`}
        className="rinkcards-rink__faceoff-l-svg"
      />
    </g>
  ));
}

function PortraitCurlingHouses() {
  return PORTRAIT_FACEOFF_CENTERS.map(({ x, y }) => {
    const direction = y < 100 ? 1 : -1;
    const houseY = y + direction * 18.2;

    return (
      <g
        key={`portrait-house-${x}-${y}`}
        className="rinkcards-rink__curling-house-svg"
      >
        <circle
          cx={x}
          cy={houseY}
          r="5.4"
          className="rinkcards-rink__curling-house-svg-outer"
        />
        <circle
          cx={x}
          cy={houseY}
          r="3.55"
          className="rinkcards-rink__curling-house-svg-middle"
        />
        <circle
          cx={x}
          cy={houseY}
          r="1.75"
          className="rinkcards-rink__curling-house-svg-inner"
        />
        <circle
          cx={x}
          cy={houseY}
          r="0.48"
          className="rinkcards-rink__curling-house-svg-button"
        />
      </g>
    );
  });
}

function PortraitRinkMarkings() {
  return (
    <svg
      className="rinkcards-rink__markings rinkcards-rink__markings--portrait"
      viewBox="0 0 90 200"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {/* Goal lines — horizontal in portrait orientation */}
      <line
        x1="0"
        y1="12"
        x2="90"
        y2="12"
        className="rinkcards-rink__goal-line"
      />

      <line
        x1="0"
        y1="188"
        x2="90"
        y2="188"
        className="rinkcards-rink__goal-line"
      />

      {/* Blue lines — horizontal in portrait orientation */}
      <line
        x1="0"
        y1="70"
        x2="90"
        y2="70"
        className="rinkcards-rink__blue-line"
      />

      <line
        x1="0"
        y1="130"
        x2="90"
        y2="130"
        className="rinkcards-rink__blue-line"
      />

      {/* Center red line — horizontal in portrait orientation */}
      <line
        x1="0"
        y1="100"
        x2="90"
        y2="100"
        className="rinkcards-rink__center-line"
      />

      <circle
        cx="45"
        cy="100"
        r="14"
        className="rinkcards-rink__circle"
      />

      <circle
        cx="21"
        cy="43"
        r="10"
        className="rinkcards-rink__circle"
      />

      <circle
        cx="69"
        cy="43"
        r="10"
        className="rinkcards-rink__circle"
      />

      <circle
        cx="21"
        cy="157"
        r="10"
        className="rinkcards-rink__circle"
      />

      <circle
        cx="69"
        cy="157"
        r="10"
        className="rinkcards-rink__circle"
      />

      <circle
        cx="45"
        cy="100"
        r="1.35"
        className="rinkcards-rink__dot"
      />

      <circle
        cx="21"
        cy="43"
        r="1.15"
        className="rinkcards-rink__dot"
      />

      <circle
        cx="69"
        cy="43"
        r="1.15"
        className="rinkcards-rink__dot"
      />

      <circle
        cx="21"
        cy="157"
        r="1.15"
        className="rinkcards-rink__dot"
      />

      <circle
        cx="69"
        cy="157"
        r="1.15"
        className="rinkcards-rink__dot"
      />

      {/* Neutral-zone faceoff dots — no L brackets around these. */}
      <circle
        cx="18.5"
        cy="80"
        r="1.3"
        className="rinkcards-rink__dot"
      />

      <circle
        cx="71.5"
        cy="80"
        r="1.3"
        className="rinkcards-rink__dot"
      />

      <circle
        cx="18.5"
        cy="120"
        r="1.3"
        className="rinkcards-rink__dot"
      />

      <circle
        cx="71.5"
        cy="120"
        r="1.3"
        className="rinkcards-rink__dot"
      />

      <PortraitFaceoffLBrackets />
      <PortraitCurlingHouses />

      {/* Top crease */}
      <path
        d="M 40 12 A 5 5 0 0 0 50 12 Z"
        className="rinkcards-rink__crease"
      />

      {/* Bottom crease */}
      <path
        d="M 40 188 A 5 5 0 0 1 50 188 Z"
        className="rinkcards-rink__crease"
      />

      <g transform={`translate(45, ${12 - NET_GAP - NET_DEPTH}) rotate(90)`}>
        <image
          href={NET_IMAGE_SRC}
          x="0"
          y={-NET_MOUTH_WIDTH / 2}
          width={NET_DEPTH}
          height={NET_MOUTH_WIDTH}
          preserveAspectRatio="xMidYMid meet"
          className="rinkcards-rink__net"
        />
      </g>

      <g transform={`translate(45, ${188 + NET_GAP + NET_DEPTH}) rotate(-90)`}>
        <image
          href={NET_IMAGE_SRC}
          x="0"
          y={-NET_MOUTH_WIDTH / 2}
          width={NET_DEPTH}
          height={NET_MOUTH_WIDTH}
          preserveAspectRatio="xMidYMid meet"
          className="rinkcards-rink__net"
        />
      </g>

      <image
        href={CENTER_ICE_LOGO_SRC}
        x="32"
        y="87"
        width="26"
        height="26"
        preserveAspectRatio="xMidYMid meet"
        transform="rotate(90 45 100)"
        className="rinkcards-rink__logo"
      />
    </svg>
  );
}

function RinkMarkings() {
  return (
    <>
      <LandscapeRinkMarkings />
      <LandscapeRinkCircles />
      <PortraitRinkMarkings />
    </>
  );
}

function GalleryArrowIcon({ direction = "right" }) {
  const transform =
    direction === "left"
      ? "rotate(180 12 12)"
      : direction === "up"
        ? "rotate(-90 12 12)"
        : direction === "down"
          ? "rotate(90 12 12)"
          : undefined;

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <g transform={transform}>
        <path d="m9 5 7 7-7 7" />
      </g>
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

function getCircularOffset(index, activeIndex, length) {
  let offset = index - activeIndex;
  const half = length / 2;

  if (offset > half) {
    offset -= length;
  } else if (offset < -half) {
    offset += length;
  }

  return offset;
}

function GallerySection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPortrait, setIsPortrait] = useState(() =>
    typeof window === "undefined"
      ? false
      : window.matchMedia(GALLERY_BREAKPOINT).matches,
  );
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const dragStartRef = useRef({ x: 0, y: 0 });
  const dragPointerRef = useRef(null);
  const suppressClickRef = useRef(false);

  const goToPrevious = () => {
    setActiveIndex((current) =>
      (current - 1 + galleryItems.length) % galleryItems.length,
    );
  };

  const goToNext = () => {
    setActiveIndex((current) =>
      (current + 1) % galleryItems.length,
    );
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const showPreviousLightboxImage = () => {
    setLightboxIndex((current) =>
      current === null
        ? 0
        : (current - 1 + galleryItems.length) % galleryItems.length,
    );
  };

  const showNextLightboxImage = () => {
    setLightboxIndex((current) =>
      current === null
        ? 0
        : (current + 1) % galleryItems.length,
    );
  };

  useEffect(() => {
    const media = window.matchMedia(GALLERY_BREAKPOINT);

    const syncOrientation = () => {
      setIsPortrait(media.matches);
      setDragOffset(0);
      setIsDragging(false);
    };

    syncOrientation();
    media.addEventListener("change", syncOrientation);

    return () => {
      media.removeEventListener("change", syncOrientation);
    };
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (
      prefersReducedMotion ||
      isHovered ||
      isDragging ||
      lightboxIndex !== null
    ) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) =>
        (current + 1) % galleryItems.length,
      );
    }, GALLERY_AUTOPLAY_MS);

    return () => {
      window.clearInterval(interval);
    };
  }, [isHovered, isDragging, lightboxIndex]);

  useEffect(() => {
    if (lightboxIndex === null) {
      return undefined;
    }

    const previousHtmlOverflow =
      document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeLightbox();
      } else if (
        event.key === "ArrowRight" ||
        event.key === "ArrowDown"
      ) {
        showNextLightboxImage();
      } else if (
        event.key === "ArrowLeft" ||
        event.key === "ArrowUp"
      ) {
        showPreviousLightboxImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
    };
  }, [lightboxIndex]);

  const handlePointerDown = (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    dragPointerRef.current = event.pointerId;
    dragStartRef.current = {
      x: event.clientX,
      y: event.clientY,
    };

    suppressClickRef.current = false;
    setIsDragging(true);
    setDragOffset(0);

    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (
      !isDragging ||
      dragPointerRef.current !== event.pointerId
    ) {
      return;
    }

    const delta = isPortrait
      ? event.clientY - dragStartRef.current.y
      : event.clientX - dragStartRef.current.x;

    if (Math.abs(delta) > 6) {
      suppressClickRef.current = true;
    }

    setDragOffset(delta);
  };

  const finishDrag = (event) => {
    if (dragPointerRef.current !== event.pointerId) {
      return;
    }

    const delta = isPortrait
      ? event.clientY - dragStartRef.current.y
      : event.clientX - dragStartRef.current.x;

    const threshold = isPortrait ? 54 : 48;

    if (Math.abs(delta) >= threshold) {
      if (isPortrait) {
        if (delta > 0) {
          goToNext();
        } else {
          goToPrevious();
        }
      } else if (delta < 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }

    if (Math.abs(delta) > 6) {
      suppressClickRef.current = true;

      window.setTimeout(() => {
        suppressClickRef.current = false;
      }, 0);
    }

    dragPointerRef.current = null;
    setDragOffset(0);
    setIsDragging(false);

    try {
      event.currentTarget.releasePointerCapture?.(event.pointerId);
    } catch {
      // No-op if capture was already released by the browser.
    }
  };

  const handlePointerCancel = (event) => {
    if (dragPointerRef.current !== event.pointerId) {
      return;
    }

    dragPointerRef.current = null;
    setDragOffset(0);
    setIsDragging(false);
  };

  const openLightbox = (index) => {
    if (suppressClickRef.current) {
      return;
    }

    setActiveIndex(index);
    setLightboxIndex(index);
  };

  return (
    <>
      <section
        className="rinkcards-section"
        aria-labelledby="rinkcards-section-title"
        style={{
          backgroundImage:
            `radial-gradient(
              ellipse at 50% -18%,
              rgba(87, 135, 205, 0.28) 0%,
              rgba(35, 77, 135, 0.12) 38%,
              transparent 66%
            ),
            linear-gradient(
              180deg,
              rgba(10, 32, 63, 0.8) 0%,
              rgba(7, 27, 53, 0.78) 47%,
              rgba(11, 39, 74, 0.8) 100%
            ),
            url("${RINKCARDS_BACKGROUND_SRC}")`,
        }}
      >
        <div
          className="rinkcards-section__ambient"
          aria-hidden="true"
        />

        <div className="rinkcards-section__inner">
          <header className="rinkcards-heading">
            <h1 id="rinkcards-section-title">
              Around the Rink
            </h1>

            <span aria-hidden="true" />
          </header>

          <div className="rinkcards-rink-wrap">
            <img
              className="rinkcards-scoreboard"
              src={SCOREBOARD_IMAGE_SRC}
              alt=""
              aria-hidden="true"
            />

            <div className="rinkcards-rink">
              <RinkMarkings />

              <div
                className={
                  `gallery-stage${
                    isDragging
                      ? " gallery-stage--dragging"
                      : ""
                  }`
                }
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <button
                  type="button"
                  className="gallery-control gallery-control--previous"
                  onClick={goToPrevious}
                  aria-label="Show previous gallery image"
                >
                  <GalleryArrowIcon direction="left" />
                </button>

                <div
                  className="gallery-viewport"
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={finishDrag}
                  onPointerCancel={handlePointerCancel}
                  aria-roledescription="carousel"
                  aria-label="Greenwich Skating Club photo gallery"
                >
                  {galleryItems.map((item, index) => {
                    const rawOffset = getCircularOffset(
                      index,
                      activeIndex,
                      galleryItems.length,
                    );

                    const visualOffset = isPortrait
                      ? -rawOffset
                      : rawOffset;

                    const distance = Math.abs(rawOffset);
                    const baseScale = Math.max(
                      0.72,
                      1 - Math.min(distance, 3) * 0.095,
                    );

                    // Desktop cards are physically rendered at the full
                    // 1.45x active size. Only the surrounding cards are
                    // scaled down so their visible size stays exactly where
                    // it was before. The active card itself renders at scale 1,
                    // which avoids enlarging a smaller rasterized image layer.
                    const scale = isPortrait
                      ? baseScale
                      : distance === 0
                        ? 1
                        : baseScale / DESKTOP_ACTIVE_CARD_RATIO;
                    const opacity =
                      distance > 3
                        ? 0
                        : Math.max(0.24, 1 - distance * 0.24);
                    const zIndex = 20 - Math.round(distance * 3);
                    const pointerEvents =
                      distance <= 2 ? "auto" : "none";

                    const transform = isPortrait
                      ? `translate(-50%, -50%) translateY(calc(${visualOffset * 76}% + ${dragOffset}px)) translateZ(${-distance * 70}px) rotateX(${visualOffset * 11}deg) scale(${scale})`
                      : distance === 0
                        ? `translate(-50%, -50%) translateX(${dragOffset}px)`
                        : `translate(-50%, -50%) translateX(calc(${visualOffset * DESKTOP_TRANSLATE_STEP_PERCENT}% + ${dragOffset}px)) translateZ(${-distance * 92}px) rotateY(${visualOffset * -15}deg) scale(${scale})`;

                    return (
                      <button
                        key={item.src}
                        type="button"
                        className={
                          `gallery-card${
                            index === activeIndex
                              ? " gallery-card--active"
                              : ""
                          }`
                        }
                        style={{
                          transform,
                          opacity,
                          zIndex,
                          pointerEvents,
                        }}
                        onClick={() => openLightbox(index)}
                        aria-label={`Open image ${index + 1} of ${galleryItems.length}`}
                        aria-current={
                          index === activeIndex
                            ? "true"
                            : undefined
                        }
                      >
                        <img
                          src={item.src}
                          alt={item.alt}
                          draggable="false"
                        />

                        <span
                          className="gallery-card__glass"
                          aria-hidden="true"
                        />
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  className="gallery-control gallery-control--next"
                  onClick={goToNext}
                  aria-label="Show next gallery image"
                >
                  <GalleryArrowIcon direction="right" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {lightboxIndex !== null && (
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Gallery image ${lightboxIndex + 1} of ${galleryItems.length}`}
        >
          <button
            type="button"
            className="gallery-lightbox__close"
            onClick={closeLightbox}
            aria-label="Close full image view"
          >
            <CloseIcon />
          </button>

          <button
            type="button"
            className="gallery-lightbox__arrow gallery-lightbox__arrow--previous"
            onClick={showPreviousLightboxImage}
            aria-label="Show previous full image"
          >
            <GalleryArrowIcon direction="left" />
          </button>

          <div className="gallery-lightbox__image-wrap">
            <img
              src={galleryItems[lightboxIndex].src}
              alt={galleryItems[lightboxIndex].alt}
            />
          </div>

          <button
            type="button"
            className="gallery-lightbox__arrow gallery-lightbox__arrow--next"
            onClick={showNextLightboxImage}
            aria-label="Show next full image"
          >
            <GalleryArrowIcon direction="right" />
          </button>

          <div className="gallery-lightbox__counter">
            {String(lightboxIndex + 1).padStart(2, "0")} / {String(galleryItems.length).padStart(2, "0")}
          </div>
        </div>
      )}
    </>
  );
}


function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="m9 5 7 7-7 7" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2"
      />

      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.3 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1v3.6c0 .6-.4 1-1 1C10.6 21.1 2.9 13.4 2.9 3.7c0-.6.4-1 1-1h3.6c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1L6.6 10.8Z" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />

      <circle
        cx="12"
        cy="10"
        r="2.5"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
      />

      <circle
        cx="12"
        cy="12"
        r="4"
      />

      <circle
        className="icon-fill"
        cx="17.5"
        cy="6.5"
        r="1"
      />
    </svg>
  );
}

function FooterLogo() {
  return (
    <a
      className="footer-logo"
      href={`${SITE_BASE_URL}/`}
      target="_top"
      aria-label="Greenwich Skating Club home"
    >
      <img
        src={CENTER_ICE_LOGO_SRC}
        alt="Greenwich Skating Club"
      />
    </a>
  );
}

function ExploreMenu() {
  const [openGroups, setOpenGroups] =
    useState(() => new Set());

  const [panelHeights, setPanelHeights] =
    useState({});

  const panelRefs = useRef(new Map());

  /*
   * Measure each panel's natural content height once after mount.
   * scrollHeight is unaffected by the wrapper's own collapsed
   * max-height, so every group can be measured up front even though
   * none of them start open. The animation then transitions between
   * two known pixel values instead of guessing a large max-height,
   * which is both smoother and avoids the "long pause at the end"
   * artifact that an oversized max-height guess produces.
   */
  useEffect(() => {
    const heights = {};

    panelRefs.current.forEach((node, title) => {
      heights[title] = node.scrollHeight;
    });

    setPanelHeights(heights);
  }, []);

  const toggleGroup = (title) => {
    setOpenGroups((current) => {
      const next = new Set(current);

      if (next.has(title)) {
        next.delete(title);
      } else {
        next.add(title);
      }

      return next;
    });
  };

  return (
    <nav
      className="footer-menu"
      aria-label="Footer navigation"
    >
      <h2>Explore</h2>

      <div className="footer-menu__groups">
        {exploreGroups.map(
          (group) => {
            const isOpen = openGroups.has(
              group.title,
            );

            const measuredHeight =
              panelHeights[group.title];

            return (
              <div
                className="footer-menu__group"
                key={group.title}
              >
                <button
                  type="button"
                  className="footer-menu__group-title"
                  onClick={() =>
                    toggleGroup(group.title)
                  }
                  aria-expanded={isOpen}
                >
                  <span>
                    {group.title}
                  </span>

                  <span
                    className={
                      `footer-menu__group-arrow${
                        isOpen
                          ? " footer-menu__group-arrow--open"
                          : ""
                      }`
                    }
                    aria-hidden="true"
                  >
                    <ArrowIcon />
                  </span>
                </button>

                <div
                  className={
                    `footer-menu__group-panel${
                      isOpen
                        ? " footer-menu__group-panel--open"
                        : ""
                    }`
                  }
                  style={{
                    maxHeight: isOpen
                      ? `${measuredHeight ?? 600}px`
                      : "0px",
                  }}
                >
                  <ul
                    ref={(node) => {
                      if (node) {
                        panelRefs.current.set(
                          group.title,
                          node,
                        );
                      } else {
                        panelRefs.current.delete(
                          group.title,
                        );
                      }
                    }}
                  >
                    {group.links.map(
                      (link) => (
                        <li key={link.label}>
                          <a
                            href={link.href}
                            target="_top"
                          >
                            <span>
                              {link.label}
                            </span>

                            <ArrowIcon />
                          </a>
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              </div>
            );
          },
        )}
      </div>
    </nav>
  );
}

function ConnectPanel() {
  return (
    <section
      className="footer-connect"
      aria-labelledby="connect-title"
    >
      <div className="footer-connect__info">
        <h2 id="connect-title">
          Connect
        </h2>

        <p>
          Questions about joining Greenwich Skating
          Club or visiting the rink?
        </p>

        <div className="footer-connect__details">
          <a
            href={`${SITE_BASE_URL}/directions`}
            target="_top"
          >
            <PinIcon />

            <span>
              9 Cardinal Road · Greenwich, CT 06830
            </span>
          </a>

          <a href={`mailto:${ADMISSIONS_EMAIL}`}>
            <EmailIcon />

            <span>
              {ADMISSIONS_EMAIL}
            </span>
          </a>

          <a
            href={`tel:${GSC_PHONE_NUMBER.replace(
              /[^\d+]/g,
              "",
            )}`}
          >
            <PhoneIcon />

            <span>
              Phone: {GSC_PHONE_NUMBER}
            </span>
          </a>
        </div>

        <a
          className="member-button"
          href={MEMBER_LOGIN_URL}
          target="_blank"
          rel="noreferrer"
        >
          <span>
            Member Login
          </span>

          <ArrowIcon />
        </a>

        <a
          className="instagram-link"
          href="https://www.instagram.com/thegreenwichskatingclub/"
          target="_blank"
          rel="noreferrer"
        >
          <InstagramIcon />

          <span>
            Follow GSC on Instagram
          </span>
        </a>
      </div>

      <div className="footer-map">
        <iframe
          title="Greenwich Skating Club location"
          src="https://www.google.com/maps?q=Greenwich+Skating+Club,+Cardinal+Road,+Greenwich,+CT&output=embed"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}

function SiteFooter() {
  const currentYear =
    new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div
        className="site-footer__accent"
        aria-hidden="true"
      >
        <span />
        <span />
      </div>

      <div
        className="site-footer__rings"
        aria-hidden="true"
      />

      <div className="footer-container site-footer__main">
        <section
          className="footer-brand"
          aria-label="Greenwich Skating Club"
        >
          <FooterLogo />
        </section>

        <ExploreMenu />

        <ConnectPanel />
      </div>

      <div className="site-footer__bottom">
        <div className="footer-container site-footer__bottom-inner">
          <p>
            © {currentYear} Greenwich Skating Club
          </p>
        </div>
      </div>
    </footer>
  );
}



function App() {
  useEffect(() => {
    const handlePageShow = (
      event,
    ) => {
      if (event.persisted) {
        window.location.reload();
      }
    };

    window.addEventListener(
      "pageshow",
      handlePageShow,
    );

    return () => {
      window.removeEventListener(
        "pageshow",
        handlePageShow,
      );
    };
  }, []);

  return (
    <>
      <main>
        <GallerySection />
      </main>

      <SiteFooter />
    </>
  );
}

export default App;
