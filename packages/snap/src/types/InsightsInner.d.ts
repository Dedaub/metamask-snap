export type SnapCopyable = {
  /**
   *
   * @type {string}
   * @memberof SnapCopyable
   */
  type?: SnapCopyableTypeEnum;
  /**
   *
   * @type {string}
   * @memberof SnapCopyable
   */
  value: string;
};

export declare const SnapCopyableTypeEnum: {
  readonly Copyable: 'copyable';
};
export type SnapCopyableTypeEnum =
  (typeof SnapCopyableTypeEnum)[keyof typeof SnapCopyableTypeEnum];

export type SnapDivider = {
  /**
   *
   * @type {string}
   * @memberof SnapDivider
   */
  type?: SnapDividerTypeEnum;
};

export type SnapHeading = {
  /**
   *
   * @type {string}
   * @memberof SnapHeading
   */
  type?: SnapHeadingTypeEnum;
  /**
   *
   * @type {string}
   * @memberof SnapHeading
   */
  value: string;
};

export declare const SnapHeadingTypeEnum: {
  readonly Heading: 'heading';
};
export type SnapHeadingTypeEnum =
  (typeof SnapHeadingTypeEnum)[keyof typeof SnapHeadingTypeEnum];

export type SnapSpinner = {
  /**
   *
   * @type {string}
   * @memberof SnapSpinner
   */
  type?: SnapSpinnerTypeEnum;
};

export declare const SnapSpinnerTypeEnum: {
  readonly Spinner: 'spinner';
};
export type SnapSpinnerTypeEnum =
  (typeof SnapSpinnerTypeEnum)[keyof typeof SnapSpinnerTypeEnum];

export type SnapText = {
  /**
   *
   * @type {string}
   * @memberof SnapText
   */
  type?: SnapTextTypeEnum;
  /**
   *
   * @type {string}
   * @memberof SnapText
   */
  value: string;
  /**
   *
   * @type {boolean}
   * @memberof SnapText
   */
  markdown?: boolean;
};

export declare const SnapTextTypeEnum: {
  readonly Text: 'text';
};
export type SnapTextTypeEnum =
  (typeof SnapTextTypeEnum)[keyof typeof SnapTextTypeEnum];

export declare const SnapDividerTypeEnum: {
  readonly Divider: 'divider';
};
export type SnapDividerTypeEnum =
  (typeof SnapDividerTypeEnum)[keyof typeof SnapDividerTypeEnum];

export type InsightsInner =
  | ({
      type: 'copyable';
    } & SnapCopyable)
  | ({
      type: 'divider';
    } & SnapDivider)
  | ({
      type: 'heading';
    } & SnapHeading)
  | ({
      type: 'spinner';
    } & SnapSpinner)
  | ({
      type: 'text';
    } & SnapText);
