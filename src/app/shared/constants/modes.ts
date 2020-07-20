/**
 * Describes an entry of a specific mode by its name and its min and max values.
 *
 * @interface ModeEntry
 */
export interface ModeEntry {
  /**
   * The key of the entry type, used by liquidctl to specify an rgb display mode.
   *
   * @type {string}
   * @memberof ModeEntry
   */
  key: string;
  /**
   * The minimum value that can be used for the configuration.
   *
   * @type {number}
   * @memberof ModeEntry
   */
  minValue: number;
  /**
   * The maximum value that can be used for the configuration.
   *
   * @type {number}
   * @memberof ModeEntry
   */
  maxValue: number;
}

/**
 * A list of all available modes that are used by the liquidctl tool to set rgb-modes on a kraken cooler.
 *
 * @export
 * @class MODES
 */
export class MODES {
  static FIXED: ModeEntry = { key: "fixed", minValue: 1, maxValue: 1 };
  static SUPER_FIXED: ModeEntry = {
    key: "super-fixed",
    minValue: 1,
    maxValue: 9,
  };
  static FADING: ModeEntry = { key: "fading", minValue: 2, maxValue: 8 };
  static SPECTRUM_WAVE: ModeEntry = {
    key: "spectrum-wave",
    minValue: 0,
    maxValue: 0,
  };
  static BACKWARDS_SPECTRUM_WAVE: ModeEntry = {
    key: "backwards-spectrum-wave",
    minValue: 0,
    maxValue: 0,
  };
  static SUPER_WAVE: ModeEntry = {
    key: "super-wave",
    minValue: 0,
    maxValue: 8,
  };
  static BACKWARDS_SUPER_WAVE: ModeEntry = {
    key: "backwards-super-wave",
    minValue: 0,
    maxValue: 8,
  };
  static MARQUEE: ModeEntry = { key: "marquee", minValue: 1, maxValue: 1 };
  static BACKWARDS_MARQUEE: ModeEntry = {
    key: "backwards-marquee",
    minValue: 1,
    maxValue: 1,
  };
  static COVERING_MARQUEE: ModeEntry = {
    key: "covering-marquee",
    minValue: 1,
    maxValue: 8,
  };
  static COVERING_BACKWARDS_MARQUEE: ModeEntry = {
    key: "covering-backwards-marquee	",
    minValue: 1,
    maxValue: 8,
  };
  static ALTERNATING: ModeEntry = {
    key: "alternating",
    minValue: 2,
    maxValue: 2,
  };
  static MOVING_ALTERNATING: ModeEntry = {
    key: "moving-alternating",
    minValue: 2,
    maxValue: 2,
  };
  static BACKWARDS_MOVING_ALTERNATING: ModeEntry = {
    key: "backwards-moving-alternating",
    minValue: 2,
    maxValue: 2,
  };
  static BREATHING: ModeEntry = { key: "breathing", minValue: 1, maxValue: 8 };
  static SUPER_BREATHING: ModeEntry = {
    key: "super-breathing",
    minValue: 1,
    maxValue: 9,
  };
  static PULSE: ModeEntry = {
    key: "super-breathing",
    minValue: 1,
    maxValue: 8,
  };
  static TAI_CHI: ModeEntry = { key: "tai-chi", minValue: 2, maxValue: 2 };
  static WATER_COOLER: ModeEntry = {
    key: "water-cooler",
    minValue: 0,
    maxValue: 0,
  };
  static LOADING: ModeEntry = { key: "loading", minValue: 1, maxValue: 1 };
  static WINGS: ModeEntry = { key: "wings", minValue: 1, maxValue: 1 };
}
