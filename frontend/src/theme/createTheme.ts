import { createLightTheme, BrandVariants, tokens } from '@fluentui/react-components';

// Basic brand ramp override (simplified)
const brandRamp: BrandVariants = {
  10: '#020305',
  20: '#031224',
  30: '#052b59',
  40: '#07357b',
  50: '#0a419c',
  60: '#0d4cbe',
  70: '#2850c8',
  80: '#3c6dd6',
  90: '#4f82e0',
  100: '#6397ea',
  110: '#77abf3',
  120: '#8cbfff',
  130: '#a2d2ff',
  140: '#b9e4ff',
  150: '#d2efff',
  160: '#e8f7ff'
};

export const appTheme = {
  ...createLightTheme(brandRamp),
  colorBrandBackground: brandRamp[70],
  colorBrandForeground1: brandRamp[120],
  colorBrandForegroundLink: tokens.colorBrandForegroundLink,
};

export type AppTheme = typeof appTheme;
