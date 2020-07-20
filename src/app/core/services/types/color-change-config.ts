import { ModeEntry } from "app/shared/constants/modes";

/**
 * The configuration object used to describe a Color and Mode change.
 *
 * @export
 * @interface ColorChangeConfig
 */
export interface ColorChangeConfig {
  /**
   * The specified mode entry to be used.
   *
   * @type {ModeEntry}
   * @memberof ColorChangeConfig
   */
  mode: ModeEntry;
  /**
   * The color value (in hex) to be used.
   *
   * @type {string}
   * @memberof ColorChangeConfig
   */
  color: string;
}
