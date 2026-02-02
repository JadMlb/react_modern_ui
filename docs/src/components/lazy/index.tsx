import { Suspense } from "react";
import Loader from "./loader";

interface LazyProps
{
	children: React.ReactNode;
}

export default function Lazy ({children}: LazyProps)
{
	return (
		<Suspense fallback = {<Loader/>}>
			{children}
		</Suspense>
	);
}