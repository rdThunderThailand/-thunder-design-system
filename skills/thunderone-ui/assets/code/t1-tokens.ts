/* ThunderOne design tokens.
   GENERATED from skills/thunderone-ui/tokens.json by scripts/build.mjs. Do not edit by hand. */

export const t1Tokens = {
  "color": {
    "background": "#F9FAFB",
    "foreground": "#0F1727",
    "card": "#FFFFFF",
    "cardForeground": "#020618",
    "popover": "#FFFFFF",
    "popoverForeground": "#020618",
    "primary": "#286EF9",
    "primaryForeground": "#FFFFFF",
    "primarySoft": "#E9F4FF",
    "secondary": "#F1F5F9",
    "secondaryForeground": "#0F172B",
    "muted": "#F0F3F7",
    "mutedForeground": "#5A6475",
    "accent": "#F1F5F9",
    "accentForeground": "#0F172B",
    "destructive": "#E7000B",
    "destructiveForeground": "#F8FAFC",
    "border": "#DCE2E9",
    "borderSubtle": "#E8EBF1",
    "input": "#DCE2E9",
    "ring": "#90A1B9",
    "success": "#0FA44D",
    "successSoft": "#E0FAE4",
    "warning": "#E48300",
    "warningSoft": "#FFF2D4",
    "danger": "#E7000B",
    "dangerSoft": "#FFE9E6",
    "dangerForeground": "#FFFFFF",
    "info": "#0086CF",
    "infoSoft": "#E4F7FF",
    "surfaceSubtle": "#F5F7F9",
    "surfaceRaised": "#FFFFFF",
    "overlay": "#03060D",
    "program": "#00214B",
    "brandNavy": "#010F29",
    "chart1": "#F54900",
    "chart2": "#009689",
    "chart3": "#104E64",
    "chart4": "#FFB900",
    "chart5": "#FE9A00",
    "sidebar": "#FFFFFF",
    "sidebarForeground": "#020618",
    "sidebarPrimary": "#0F172B",
    "sidebarPrimaryForeground": "#F8FAFC",
    "sidebarAccent": "#F1F5F9",
    "sidebarAccentForeground": "#0F172B",
    "sidebarBorder": "#E2E8F0",
    "sidebarRing": "#90A1B9"
  },
  "status": {
    "success": {
      "fg": "success",
      "bg": "success-soft"
    },
    "warning": {
      "fg": "warning",
      "bg": "warning-soft"
    },
    "danger": {
      "fg": "danger",
      "bg": "danger-soft"
    },
    "info": {
      "fg": "info",
      "bg": "info-soft"
    },
    "neutral": {
      "fg": "muted-foreground",
      "bg": "muted"
    }
  },
  "statusMap": {
    "success": [
      "active",
      "online",
      "ready",
      "published",
      "completed"
    ],
    "warning": [
      "warning",
      "pending"
    ],
    "danger": [
      "error",
      "failed",
      "offline",
      "blocked"
    ],
    "info": [
      "scheduled",
      "draft",
      "processing",
      "in-progress",
      "uploading"
    ],
    "neutral": [
      "inactive",
      "archived",
      "unknown"
    ]
  },
  "font": {
    "sans": "'Manrope', 'Anuphan', system-ui, sans-serif",
    "weight": {
      "regular": 400,
      "medium": 500,
      "semibold": 600,
      "bold": 700,
      "extrabold": 800
    }
  },
  "text": {
    "displayKpi": {
      "figma": "Display/KPI value",
      "size": "24px",
      "lineHeight": "32px",
      "weight": 700,
      "lineHeightTh": "36px"
    },
    "titlePage": {
      "figma": "Title/Page",
      "size": "20px",
      "lineHeight": "28px",
      "weight": 800,
      "letterSpacing": "-0.025em",
      "lineHeightTh": "32px",
      "weightTh": 700
    },
    "headingLarge": {
      "figma": "Heading/Large",
      "size": "18px",
      "lineHeight": "28px",
      "weight": 700,
      "lineHeightTh": "32px"
    },
    "headingDialog": {
      "figma": "Heading/Dialog",
      "size": "18px",
      "lineHeight": "18px",
      "weight": 600,
      "lineHeightTh": "28px"
    },
    "headingSection": {
      "figma": "Heading/Section",
      "size": "16px",
      "lineHeight": "24px",
      "weight": 700,
      "lineHeightTh": "28px"
    },
    "titleCard": {
      "figma": "Title/Card",
      "size": "14px",
      "lineHeight": "20px",
      "weight": 700,
      "lineHeightTh": "24px"
    },
    "body": {
      "figma": "Body/Default",
      "size": "14px",
      "lineHeight": "20px",
      "weight": 400,
      "lineHeightTh": "24px"
    },
    "bodySm": {
      "figma": "Body/Small",
      "size": "12px",
      "lineHeight": "16px",
      "weight": 400,
      "lineHeightTh": "20px"
    },
    "labelSm": {
      "figma": "UI/Label sm Semibold (Medium)",
      "size": "14px",
      "lineHeight": "20px",
      "weight": 600,
      "lineHeightTh": "24px"
    },
    "labelXs": {
      "figma": "UI/Label xs Semibold (Medium)",
      "size": "12px",
      "lineHeight": "16px",
      "weight": 600,
      "lineHeightTh": "20px"
    },
    "ui": {
      "figma": "UI/Default",
      "size": "11px",
      "lineHeight": "16px",
      "weight": 400,
      "lineHeightTh": "20px"
    },
    "caption2xs": {
      "figma": "Caption/2xs",
      "size": "10px",
      "lineHeight": "14px",
      "weight": 400,
      "lineHeightTh": "18px"
    },
    "caption9": {
      "figma": "Caption/9",
      "size": "9px",
      "lineHeight": "13.5px",
      "weight": 400,
      "lineHeightTh": "16px"
    },
    "caption3xs": {
      "figma": "Caption/3xs",
      "size": "8px",
      "lineHeight": "12px",
      "weight": 400,
      "lineHeightTh": "16px"
    },
    "labelSection": {
      "figma": "Label/Section",
      "size": "11px",
      "lineHeight": "16px",
      "weight": 800,
      "letterSpacing": "0.08em",
      "uppercase": true,
      "lineHeightTh": "20px",
      "weightTh": 700
    },
    "labelType": {
      "figma": "Label/Type label",
      "size": "10px",
      "lineHeight": "14px",
      "weight": 700,
      "letterSpacing": "0.08em",
      "uppercase": true,
      "lineHeightTh": "18px"
    }
  },
  "radius": {
    "sm": 8,
    "md": 10,
    "lg": 12,
    "xl": 16,
    "2xl": 20,
    "3xl": 24,
    "4xl": 28,
    "full": 9999
  },
  "shadow": {
    "panel": "0 1px 2px 0 rgba(15, 23, 39, 0.04)",
    "float": "0 14px 36px 0 rgba(15, 23, 39, 0.12)",
    "dialog": "0 24px 60px 0 rgba(15, 23, 39, 0.18)"
  },
  "layout": {
    "sidebar": 224,
    "sidebarCollapsed": 68,
    "sidebarDrawer": 256,
    "header": 68,
    "contentPaddingX": 24,
    "contentPaddingXCompact": 16,
    "contentPaddingTop": 20,
    "cardGap": 16,
    "columns": 12,
    "gutter": 16,
    "gutterCompact": 12,
    "kpiCardMin": 300,
    "textMeasure": 720,
    "searchMax": 448,
    "dialogMax": 512
  },
  "breakpoint": {
    "xs": 480,
    "sm": 640,
    "md": 768,
    "lg": 1024,
    "xl": 1280
  },
  "z": {
    "nav": 20,
    "sticky": 30,
    "overlay": 60,
    "modal": 70,
    "popover": 80,
    "tooltip": 90
  },
  "motion": {
    "sidebar": "200ms cubic-bezier(0.4, 0, 0.2, 1)",
    "colors": "150ms"
  }
} as const;

export type T1Tokens = typeof t1Tokens;
export type T1Tone = keyof typeof t1Tokens.status;
