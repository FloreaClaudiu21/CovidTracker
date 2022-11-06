import { memo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import covid_logo from "./assets/covid_logo.png";
import video_bg from "./assets/video_bg.mp4";

const Home = ({ countries }) => {
	const selRef = useRef(null);
	const navigate = useNavigate();
	return (
		<div className="h-auto min-h-screen w-full bg-black overflow-hidden">
			<main className="relative min-h-screen top-0 bottom-0 w-full">
				<video
					className="w-full h-screen object-cover -z-10"
					autoPlay
					loop
					muted
				>
					<source
						src={video_bg}
						type="video/mp4"
					/>
				</video>
				<div className="absolute h-full w-screen top-0 left-0 bg-[rgba(0,0,0,0.75)]"></div>
				<div className="flex top-0 absolute h-screen w-full justify-center place-items-center">
					<div className="flex flex-col h-full w-full">
						<div className="max-w-[640px] flex flex-col w-full h-full justify-center place-items-center gap-3 p-2 mx-auto">
							<img
								className="object-cover w-32 h-32"
								src={covid_logo}
								alt=""
							/>
							<span className="text-sm text-red-400 text-center font-mono font-bold">
								COVID19Tracker
							</span>
							<span className="text-xs text-gray-400 text-center font-serif">
								To get information about a country’s latest cases of COVID-19,
								select a country down below and press the "Get Info" button.
							</span>
							<select
								ref={selRef}
								defaultValue="Australia"
								className="px-1 h-6 text-sm font-sans font-bold bg-slate-100 hover:bg-slate-200 w-3/4 mx-auto border-none rounded-sm"
							>
								{countries.map(({ data }) => {
									return (
										<option
											key={data.Country}
											value={data.Country}
										>
											{data.Country}
										</option>
									);
								})}
							</select>
							<button
								onClick={() => {
									const selc = selRef.current.value;
									navigate("/" + selc, { replace: true });
									return;
								}}
								className="text-sm bg-red-400 p-2 rounded-md font-semibold text-white shadow-md hover:bg-red-600 hover:scale-110 transition-all delay-75"
							>
								Get Info
							</button>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
};

export default memo(Home);
