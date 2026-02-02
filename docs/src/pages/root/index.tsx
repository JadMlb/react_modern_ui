import Header from "../../components/header";
import Navbar from "../../components/navbar";
import Contents from "../../components/contents";
import useLanguageDetection from "../../hooks/useLanguageDetection";

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