import { ToastItem } from "./Toast";

export default interface ToastsContextType
{
	toasts: ToastItem[];
	enqueueToast: (toast: ToastItem) => void;
	clearToast: (id: number) => void;
}