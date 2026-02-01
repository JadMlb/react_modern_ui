import { createContext, useCallback, useContext, useState } from "react";
import ToastsContextType from "../../../types/components/Toaster/ToastContextType";
import { ToastItem } from "../../../types";

const INIT_CONTEXT = {
	toasts: [],
	enqueueToast: () => {},
	clearToast: () => {}
} satisfies ToastsContextType;

const ToasterContext = createContext<ToastsContextType> (INIT_CONTEXT);

type ToasterProviderProps = {
	children?: React.ReactNode
};

export default function ToasterProvider ({children}: ToasterProviderProps)
{
	const [toasts, setToasts] = useState<ToastItem[]> ([]);

	const enqueueToast = useCallback (
		(toast: ToastItem) =>
		{
			setToasts (
				old =>
				{
					const existsingIndex = old.findIndex (t => t.id === toast.id);
					if (existsingIndex > -1)
					{
						const pre = old.slice (0, existsingIndex);
						const post = old.slice (existsingIndex + 1);

						return [...pre, toast, ...post];
					}

					return [...old, toast];
				}
			);
		},
		[setToasts]
	);
	
	const clearToast = useCallback (
		(id: number) => setToasts (old => old.filter (t => t.id !== id)),
		[setToasts]
	);
	
	return (
		<ToasterContext.Provider value = {{toasts, enqueueToast, clearToast}}>
			{children}
		</ToasterContext.Provider>
	);
}

/**
 * The hook that is used to retrieve methods to manipulate data in the toaster.
 * - `enqueueToast`: accepts a `ToastItem` to add this toast
 * - `clearToast`: accepts an id (`number`) to manually clear the toast having this id value
 * 
 * @returns an object containing the functions
 */
export function useToaster ()
{
	const {enqueueToast, clearToast} = useContext (ToasterContext);
	return {enqueueToast, clearToast};
}

export function useToasts ()
{
	return useContext (ToasterContext);
}