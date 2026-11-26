// ThunderOne — Tailwind v3 preset (pair it with tailwind/shadcn.css).
// GENERATED from skills/thunderone-ui/tokens.json by scripts/build.mjs. Do not edit by hand.
// tailwind.config: presets: [require('@rdthunderthailand/thunderone-theme/tailwind/preset')]
/** @type {import('tailwindcss').Config} */
module.exports = {
  "theme": {
    "extend": {
      "colors": {
        "background": "hsl(var(--background) / <alpha-value>)",
        "foreground": "hsl(var(--foreground) / <alpha-value>)",
        "card": {
          "DEFAULT": "hsl(var(--card) / <alpha-value>)",
          "foreground": "hsl(var(--card-foreground) / <alpha-value>)"
        },
        "popover": {
          "DEFAULT": "hsl(var(--popover) / <alpha-value>)",
          "foreground": "hsl(var(--popover-foreground) / <alpha-value>)"
        },
        "primary": {
          "DEFAULT": "hsl(var(--primary) / <alpha-value>)",
          "foreground": "hsl(var(--primary-foreground) / <alpha-value>)",
          "soft": "hsl(var(--primary-soft) / <alpha-value>)"
        },
        "secondary": {
          "DEFAULT": "hsl(var(--secondary) / <alpha-value>)",
          "foreground": "hsl(var(--secondary-foreground) / <alpha-value>)"
        },
        "muted": {
          "DEFAULT": "hsl(var(--muted) / <alpha-value>)",
          "foreground": "hsl(var(--muted-foreground) / <alpha-value>)"
        },
        "accent": {
          "DEFAULT": "hsl(var(--accent) / <alpha-value>)",
          "foreground": "hsl(var(--accent-foreground) / <alpha-value>)"
        },
        "destructive": {
          "DEFAULT": "hsl(var(--destructive) / <alpha-value>)",
          "foreground": "hsl(var(--destructive-foreground) / <alpha-value>)"
        },
        "border": {
          "DEFAULT": "hsl(var(--border) / <alpha-value>)",
          "subtle": "hsl(var(--border-subtle) / <alpha-value>)"
        },
        "input": "hsl(var(--input) / <alpha-value>)",
        "ring": "hsl(var(--ring) / <alpha-value>)",
        "success": {
          "DEFAULT": "hsl(var(--success) / <alpha-value>)",
          "soft": "hsl(var(--success-soft) / <alpha-value>)"
        },
        "warning": {
          "DEFAULT": "hsl(var(--warning) / <alpha-value>)",
          "soft": "hsl(var(--warning-soft) / <alpha-value>)"
        },
        "danger": {
          "DEFAULT": "hsl(var(--danger) / <alpha-value>)",
          "soft": "hsl(var(--danger-soft) / <alpha-value>)",
          "foreground": "hsl(var(--danger-foreground) / <alpha-value>)"
        },
        "info": {
          "DEFAULT": "hsl(var(--info) / <alpha-value>)",
          "soft": "hsl(var(--info-soft) / <alpha-value>)"
        },
        "surface": {
          "subtle": "hsl(var(--surface-subtle) / <alpha-value>)",
          "raised": "hsl(var(--surface-raised) / <alpha-value>)"
        },
        "overlay": "hsl(var(--overlay) / <alpha-value>)",
        "program": "hsl(var(--program) / <alpha-value>)",
        "brand": {
          "navy": "hsl(var(--brand-navy) / <alpha-value>)"
        },
        "chart": {
          "1": "hsl(var(--chart-1) / <alpha-value>)",
          "2": "hsl(var(--chart-2) / <alpha-value>)",
          "3": "hsl(var(--chart-3) / <alpha-value>)",
          "4": "hsl(var(--chart-4) / <alpha-value>)",
          "5": "hsl(var(--chart-5) / <alpha-value>)"
        },
        "sidebar": {
          "DEFAULT": "hsl(var(--sidebar-background) / <alpha-value>)",
          "foreground": "hsl(var(--sidebar-foreground) / <alpha-value>)",
          "primary": "hsl(var(--sidebar-primary) / <alpha-value>)",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground) / <alpha-value>)",
          "accent": "hsl(var(--sidebar-accent) / <alpha-value>)",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground) / <alpha-value>)",
          "border": "hsl(var(--sidebar-border) / <alpha-value>)",
          "ring": "hsl(var(--sidebar-ring) / <alpha-value>)"
        }
      },
      "fontFamily": {
        "sans": [
          "Manrope",
          "Anuphan",
          "system-ui",
          "sans-serif"
        ]
      },
      "borderRadius": {
        "sm": "calc(var(--radius) - 4px)",
        "md": "calc(var(--radius) - 2px)",
        "lg": "var(--radius)",
        "xl": "calc(var(--radius) + 4px)",
        "2xl": "20px",
        "3xl": "24px",
        "4xl": "28px"
      },
      "boxShadow": {
        "panel": "0 1px 2px 0 rgba(15, 23, 39, 0.04)",
        "float": "0 14px 36px 0 rgba(15, 23, 39, 0.12)",
        "dialog": "0 24px 60px 0 rgba(15, 23, 39, 0.18)"
      },
      "screens": {
        "xs": "480px"
      },
      "spacing": {
        "sidebar": "224px",
        "sidebar-collapsed": "68px",
        "sidebar-drawer": "256px",
        "header": "68px",
        "summary-card": "88px"
      },
      "maxWidth": {
        "search": "448px",
        "measure": "720px"
      },
      "fontSize": {
        "display-kpi": [
          "var(--text-display-kpi)",
          {
            "lineHeight": "var(--text-display-kpi--line-height)",
            "fontWeight": "var(--text-display-kpi--font-weight)",
            "letterSpacing": "var(--text-display-kpi--letter-spacing)"
          }
        ],
        "title-page": [
          "var(--text-title-page)",
          {
            "lineHeight": "var(--text-title-page--line-height)",
            "fontWeight": "var(--text-title-page--font-weight)",
            "letterSpacing": "var(--text-title-page--letter-spacing)"
          }
        ],
        "heading-large": [
          "var(--text-heading-large)",
          {
            "lineHeight": "var(--text-heading-large--line-height)",
            "fontWeight": "var(--text-heading-large--font-weight)",
            "letterSpacing": "var(--text-heading-large--letter-spacing)"
          }
        ],
        "heading-dialog": [
          "var(--text-heading-dialog)",
          {
            "lineHeight": "var(--text-heading-dialog--line-height)",
            "fontWeight": "var(--text-heading-dialog--font-weight)",
            "letterSpacing": "var(--text-heading-dialog--letter-spacing)"
          }
        ],
        "heading-section": [
          "var(--text-heading-section)",
          {
            "lineHeight": "var(--text-heading-section--line-height)",
            "fontWeight": "var(--text-heading-section--font-weight)",
            "letterSpacing": "var(--text-heading-section--letter-spacing)"
          }
        ],
        "title-card": [
          "var(--text-title-card)",
          {
            "lineHeight": "var(--text-title-card--line-height)",
            "fontWeight": "var(--text-title-card--font-weight)",
            "letterSpacing": "var(--text-title-card--letter-spacing)"
          }
        ],
        "body": [
          "var(--text-body)",
          {
            "lineHeight": "var(--text-body--line-height)",
            "fontWeight": "var(--text-body--font-weight)",
            "letterSpacing": "var(--text-body--letter-spacing)"
          }
        ],
        "body-sm": [
          "var(--text-body-sm)",
          {
            "lineHeight": "var(--text-body-sm--line-height)",
            "fontWeight": "var(--text-body-sm--font-weight)",
            "letterSpacing": "var(--text-body-sm--letter-spacing)"
          }
        ],
        "label-sm": [
          "var(--text-label-sm)",
          {
            "lineHeight": "var(--text-label-sm--line-height)",
            "fontWeight": "var(--text-label-sm--font-weight)",
            "letterSpacing": "var(--text-label-sm--letter-spacing)"
          }
        ],
        "label-xs": [
          "var(--text-label-xs)",
          {
            "lineHeight": "var(--text-label-xs--line-height)",
            "fontWeight": "var(--text-label-xs--font-weight)",
            "letterSpacing": "var(--text-label-xs--letter-spacing)"
          }
        ],
        "ui": [
          "var(--text-ui)",
          {
            "lineHeight": "var(--text-ui--line-height)",
            "fontWeight": "var(--text-ui--font-weight)",
            "letterSpacing": "var(--text-ui--letter-spacing)"
          }
        ],
        "caption-2xs": [
          "var(--text-caption-2xs)",
          {
            "lineHeight": "var(--text-caption-2xs--line-height)",
            "fontWeight": "var(--text-caption-2xs--font-weight)",
            "letterSpacing": "var(--text-caption-2xs--letter-spacing)"
          }
        ],
        "caption-9": [
          "var(--text-caption-9)",
          {
            "lineHeight": "var(--text-caption-9--line-height)",
            "fontWeight": "var(--text-caption-9--font-weight)",
            "letterSpacing": "var(--text-caption-9--letter-spacing)"
          }
        ],
        "caption-3xs": [
          "var(--text-caption-3xs)",
          {
            "lineHeight": "var(--text-caption-3xs--line-height)",
            "fontWeight": "var(--text-caption-3xs--font-weight)",
            "letterSpacing": "var(--text-caption-3xs--letter-spacing)"
          }
        ],
        "label-section": [
          "var(--text-label-section)",
          {
            "lineHeight": "var(--text-label-section--line-height)",
            "fontWeight": "var(--text-label-section--font-weight)",
            "letterSpacing": "var(--text-label-section--letter-spacing)"
          }
        ],
        "label-type": [
          "var(--text-label-type)",
          {
            "lineHeight": "var(--text-label-type--line-height)",
            "fontWeight": "var(--text-label-type--font-weight)",
            "letterSpacing": "var(--text-label-type--letter-spacing)"
          }
        ]
      }
    }
  }
};
