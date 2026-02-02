import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import useLanguagePath from "./useLanguagePath";

export default function useLanguageDetection ()
{
	const {i18n: {language, changeLanguage}} = useTranslation();
	const [usedLang, path] = useLanguagePath();
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