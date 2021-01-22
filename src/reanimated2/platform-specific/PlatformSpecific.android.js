export * from './PlatformSpecificNative';

export const rgbaColorResult = (c) => {
  return c < (1 << 31) >>> 0 ? c : c - Math.pow(2, 32);
};

// Android use 32 bit *signed* integer to represent the color
// We utilize the fact that bitwise operations in JS also operates on
// signed 32 bit integers, so that we can use those to convert from
// *unsigned* to *signed* 32bit int that way.
export const processColorResult = (normalizedColor) => normalizedColor | 0x0;

