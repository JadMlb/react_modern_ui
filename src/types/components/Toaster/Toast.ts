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

export type PartialToastIconMap = {
	[toastType in ToastType]?: Partial<ToastIconType>
};