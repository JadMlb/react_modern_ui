import { lazy } from "react";
import type { LoaderFunctionArgs, RouteObject } from "react-router";
import Lazy from "../components/lazy";
import getLanguagePath from "../utils/getLanguagePath";

const MarkdownPage = lazy (() => import ("../pages/markdown"));

async function fetchMarkdownData ({request}: LoaderFunctionArgs)
{
	const url = new URL (request.url);
	const [language, path] = getLanguagePath (url.pathname);
	return await fetch (`/data/${path}.${language}.md`)
						.then (r => r.text())
						.then (
							md =>
							{
								if (md.startsWith ("<!doctype html>"))
									throw new Error();
								return md;
							}
						)
						.catch (() => "");
}

function createRoute (path: string): RouteObject
{
	return {
		path,
		loader: fetchMarkdownData,
		element: <Lazy><MarkdownPage/></Lazy>
	};
}

export default function createSectionRoutes (section: string, children: string[]): RouteObject
{
	return {
		path: section,
		children: children.map (
			route => createRoute (route)
		)
	};
}