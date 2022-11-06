import covid_logo from "./assets/covid_logo.png";

const Loading = () => {
	return (
		<div className="flex flex-col justify-center place-items-center w-full h-screen gradient-bg">
			<span className="mb-2 text-sm text-red-400 text-center font-mono font-bold">
				COVID19Tracker
			</span>
			<span className="mb-5 text-xs text-gray-400 text-center font-serif">
				Get information about a country’s latest cases, deaths and recoveries of
				COVID-19.
			</span>
			<img
				className="object-cover w-32 h-32"
				src={covid_logo}
				alt=""
			/>
			<span className="text-green-100 mt-5 text-base">Loading...</span>
			<span className="text-white mt-1 text-xs text-center">
				Might take a few seconds
			</span>
		</div>
	);
};

export default Loading;
