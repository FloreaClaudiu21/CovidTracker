import { memo, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import cases from "./assets/cases.png";
import cures from "./assets/cures.png";
import deaths from "./assets/deaths.png";
import { NumericFormat } from "react-number-format";

const Country = ({ countries }) => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [data, setData] = useState(null);
	useEffect(() => {
		if (countries == null) return;
		const d = countries.filter((v) => v.data.Country === id);
		if (d.length <= 0) {
			navigate("/", { replace: true });
			return;
		}
		setData(d[0]);
	}, [countries, id, navigate]);
	const d = useMemo(() => data?.data, [data]);
	if (!data)
		return (
			<span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-sm mb-1 text-green-100">
				Loading information...
			</span>
		);
	return (
		<div
			className={`absolute flex flex-col top-0 p-2 h-screen w-full bg-white rounded-t-lg overflow-hidden`}
		>
			<div className="flex w-full my-2 gap-2 h-8 place-items-center">
				<button
					onClick={() => {
						navigate("/", { replace: true });
						return;
					}}
					className="hover:bg-slate-200 p-1 px-2 rounded-full"
				>
					🡸
				</button>
				<span className="flex-1">Back to main page</span>
				<span className="text-base font-thin font-sans text-red-500 text-right flex-1">
					COVID-19 STATS
				</span>
			</div>
			<hr className="w-full" />
			<div className="flex flex-col w-full h-full max-w-[800px] mx-auto bg-slate-50 overflow-y-auto">
				<div className="flex flex-col gap-1 w-full my-1 place-items-center">
					<div className="flex flex-col place-items-center">
						<span className="text-lg font-serif font-bold">{d.Country}</span>
						<span className="text-xs font-serif text-gray-600">
							🌍 {d.Continent} - Population: 📊{" "}
							<NumericFormat
								disabled
								allowNegative
								value={d.Population}
								thousandSeparator=","
							/>
						</span>
					</div>
					<img
						alt=""
						src={data.flag}
						className="w-32 h-16 object-cover rounded-sm"
					/>
					<hr className="w-3/4 mx-auto" />
				</div>
				<div className="grid grid-cols-3 h-full gap-1">
					<div className="flex flex-col w-full h-full justify-start place-items-center gap-2 border-r-2 border-r-gray-200">
						<span className="text-lg font-serif underline text-blue-500">
							CASES
						</span>
						<img
							alt=""
							src={cases}
							className="w-16 h-16 object-cover"
						/>
						<ol className="p-0">
							<li className="text-center">
								TOTAL:{" "}
								<NumericFormat
									disabled
									allowNegative
									value={d.TotalCases}
									thousandSeparator=","
									className="text-sm text-blue-500"
								/>
							</li>
							<li className="text-center">
								ACTIVE:{" "}
								<span className="text-sm text-blue-500">{d.ActiveCases}</span>
							</li>
							<li className="text-center">
								TODAY:{" "}
								<span className="text-sm text-blue-500">{d.NewCases}</span>
							</li>
							<li className="text-center">
								INFECTION RISK:{" "}
								<span className="text-sm text-green-500">
									{d.Infection_Risk}%
								</span>
							</li>
							<li className="text-center">
								CRITICAL:{" "}
								<span className="text-sm text-red-500">
									{d.Serious_Critical}
								</span>
							</li>
						</ol>
					</div>
					<div className="flex flex-col w-full h-full justify-start place-items-center gap-2 border-r-2 border-r-gray-200">
						<span className="text-lg font-serif underline text-red-500">
							DEATHS
						</span>
						<img
							alt=""
							src={deaths}
							className="w-16 h-16 object-cover"
						/>
						<ol>
							<li className="text-center">
								NEW: <span className="text-sm text-red-500">{d.NewDeaths}</span>
							</li>
							<li className="text-center">
								TOTAL:{" "}
								<span className="text-sm text-red-500">{d.TotalDeaths}</span>
							</li>
						</ol>
					</div>
					<div className="flex flex-col w-full h-full justify-start place-items-center gap-2">
						<span className="text-base font-serif underline text-green-500 text-center">
							RECOVERED
						</span>
						<img
							alt=""
							src={cures}
							className="w-16 h-16 object-cover"
						/>
						<ol>
							<li className="text-center">
								NEW:{" "}
								<span className="text-sm text-green-500">{d.NewRecovered}</span>
							</li>
							<li className="text-center">
								TOTAL:{" "}
								<span className="text-sm text-green-500">
									{d.TotalRecovered}
								</span>
							</li>
							<li className="text-center">
								TOTAL TESTS:{" "}
								<span className="text-sm text-green-500">{d.TotalTests}</span>
							</li>
							<li className="text-center">
								RECOVERY PROP:{" "}
								<span className="text-sm text-green-500">
									{d.Recovery_Proporation}%
								</span>
							</li>
						</ol>
					</div>
				</div>
			</div>
		</div>
	);
};

export default memo(Country);
