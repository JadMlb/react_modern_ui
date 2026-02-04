import { useMemo } from "react";
import camelCaseToDashed from "./camelCaseToDashed";
import useNavLinkStyle from "./useNavLinkStyle";
import { NavLink } from "react-router";
import useAppNavigationPath from "../../hooks/useAppNavigationPath";
import { useTranslation } from "react-i18next";

interface TreeLinkProps
{
	parent: string;
	children: string;
}

export default function TreeLink ({parent, children}: TreeLinkProps)
{
	const {t} = useTranslation ("nav");

	const getPath = useAppNavigationPath();
	const destination = useMemo (
		() => getPath (camelCaseToDashed (parent), camelCaseToDashed (children)),
		[children, getPath, parent]
	);
	const style = useNavLinkStyle();

	return (
		<NavLink to = {destination} style = {style}>
			{t (children)}
		</NavLink>
	);
}