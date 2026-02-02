import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router";

export default function useLanguageDetection ()
{
	const {i18n: {language, changeLanguage}} = useTranslation();
	const {pathname} = useLocation();
	const [usedLang, path] = useMemo (
		() =>
		{
			const cleanPath = pathname.slice (1);
			const slashIndex = cleanPath.indexOf ("/");
			if (slashIndex === -1)
				return [cleanPath, ""];
			return [cleanPath.slice (0, slashIndex), cleanPath.slice (slashIndex + 1)];
		},
		[pathname]
	);
	const nav = useNavigate();

	useEffect (
		() =>
		{
			if (usedLang === language)
				return;
			changeLanguage (language);
			nav (`/${language}/${path}`);
		},
		[usedLang, language, path, changeLanguage]
	);
}