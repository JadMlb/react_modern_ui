export default function getLanguagePath (pathname: string)
{
	const cleanPath = pathname.slice (1);
	const slashIndex = cleanPath.indexOf ("/");
	if (slashIndex === -1)
		return [cleanPath, ""];
	return [cleanPath.slice (0, slashIndex), cleanPath.slice (slashIndex + 1)];
}