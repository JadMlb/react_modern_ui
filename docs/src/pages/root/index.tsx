import Header from "../../components/header";
import Navbar from "../../components/navbar";
import Contents from "../../components/contents";
import useLanguageDetection from "../../hooks/useLanguage";

export default function Root ()
{
	useLanguageDetection();
	
	return (
		<>
			<Header/>
			<Navbar/>
			<Contents/>
		</>
	);
}