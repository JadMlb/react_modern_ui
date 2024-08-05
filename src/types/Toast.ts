export type ToastType = "info" | "success" | "warn" | "fail";

export type ToastItem = {
	id: number,
	message: string,
	type?: ToastType
};

export const TOAST_TYPE_SYMBOL_MAP = {
	"info": {icon: "?", colour: "primary"},
	"success": {icon: "\u2713", colour: "affirmative"},
	"warn": {icon: "!", colour: "alert"},
	"fail": {icon: "\u2715", colour: "error"}
}