import { CSSProperties } from "react";

export type StaticStyle = CSSProperties & {
	[key: string]: any;
};

export type DynamicStyleFunction<PropsType = any> = (isDark: boolean, instanceProps: PropsType) => StaticStyle;

export type Style<ComponentPropsType = any> = StaticStyle | DynamicStyleFunction<ComponentPropsType>;