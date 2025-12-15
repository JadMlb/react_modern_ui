import { CSSProperties } from "react";

export type StaticStyle = CSSProperties & {
	[key: string]: any;
};

export type DynamicStyleFunction = (isDark: boolean) => StaticStyle;

export type Style = StaticStyle | DynamicStyleFunction;