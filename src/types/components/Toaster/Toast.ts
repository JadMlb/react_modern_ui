export type ToastType = "info" | "success" | "warn" | "fail";

export type ToastItem = {
	id: number,
	type?: ToastType,
	contents: React.ReactNode
};

export type ToastIconType = {icon: React.ReactNode, colour: string};

export type ToastIconMap = {
	[toastType in ToastType]: ToastIconType
};

export const TOAST_TYPE_SYMBOL_MAP = {
	"info": {icon: "?", colour: "primary"},
	"success": {icon: "\u2713", colour: "affirmative"},
	"warn": {icon: "!", colour: "alert"},
	"fail": {icon: "\u2715", colour: "error"}
}