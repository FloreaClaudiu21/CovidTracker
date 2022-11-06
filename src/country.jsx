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
		return;
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
			className={`absolute flex flex-col top-0 h-screen w-full bg-white rounded-t-lg overflow-hidden`}
		>
			<div className="flex w-full p-2 my-2 gap-2 h-8 place-items-center">
				<button
					onClick={() => {
						navigate("/", { replace: true });
						return;
					}}
					className="hover:bg-slate-200 p-1 px-2 rounded-full"
				>
					🡸
				</button>
				<span className="text-center">Back to main page</span>
				<span className="text-base font-thin font-sans text-red-500 text-right flex-1">
					COVID-19 STATS
				</span>
			</div>
			<hr className="w-full" />
			<div className="w-full overflow-y-auto overflow-x-hidden">
				<div className="flex flex-col w-full h-auto max-w-[800px] mx-auto p-1 bg-slate-50">
					<div className="flex flex-col gap-1 w-full my-1 place-items-center">
						<div className="flex w-full flex-col place-items-center">
							<select
								defaultValue={id}
								onChange={(e) => {
									const selc = e.target.value;
									navigate("/" + selc, { replace: true });
									return;
								}}
								className="w-full text-lg font-serif font-bold border-none outline-none text-center bg-transparent"
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
							<span className="w-full text-xs font-serif text-gray-600 text-center">
								🌍 {d.Continent}
							</span>
							<span className="flex justify-center w-full text-xs font-serif text-gray-600 text-center">
								📊 Population:{" "}
								<NumericFormat
									disabled
									allowNegative
									value={d.Population}
									thousandSeparator=","
									className="w-[140px] text-center"
								/>
							</span>
						</div>
						<img
							alt=""
							src={data.flag}
							className="w-32 h-16 object-cover rounded-sm shadow-lg"
						/>
						<hr className="w-3/4 mx-auto" />
					</div>
					<div className="grid grid-cols-3 h-full gap-1">
						<div className="flex flex-col w-full h-full justify-start place-items-center gap-2 border-r-2 border-r-gray-200">
							<span className="text-lg break-all font-serif underline text-blue-500">
								CASES
							</span>
							<img
								alt=""
								src={cases}
								className="w-16 h-16 object-cover"
							/>
							<ol className="w-full p-0">
								<li>
									<p className="w-full break-all text-center">TOTAL:</p>
									<NumericFormat
										disabled
										allowNegative
										value={d.TotalCases}
										thousandSeparator=","
										className="w-full text-sm text-blue-500 text-center"
									/>
								</li>
								<li>
									<p className="w-full break-all text-center">ACTIVE:</p>
									<NumericFormat
										disabled
										allowNegative
										value={d.ActiveCases}
										thousandSeparator=","
										className="w-full text-sm text-blue-500 text-center"
									/>
								</li>
								<li>
									<p className="w-full break-all text-center">TODAY:</p>
									<NumericFormat
										disabled
										allowNegative
										value={d.NewCases}
										thousandSeparator=","
										className="w-full text-sm text-blue-500 text-center"
									/>
								</li>
								<li>
									<p className="w-full break-all text-center">
										INFECTION RISK:
									</p>
									<p className="text-sm text-green-500 text-center">
										{d.Infection_Risk}%
									</p>
								</li>
								<li>
									<p className="w-full break-all text-center">CRITICAL:</p>
									<NumericFormat
										disabled
										allowNegative
										thousandSeparator=","
										value={d.Serious_Critical}
										className="w-full text-sm text-red-500 text-center"
									/>
								</li>
							</ol>
						</div>
						<div className="flex flex-col w-full h-full justify-start place-items-center gap-2 border-r-2 border-r-gray-200">
							<span className="text-lg break-all font-serif underline text-red-500">
								DEATHS
							</span>
							<img
								alt=""
								src={deaths}
								className="w-16 h-16 object-cover"
							/>
							<ol className="w-full p-0">
								<li>
									<p className="w-full break-all text-center">NEW:</p>
									<NumericFormat
										disabled
										allowNegative
										value={d.NewDeaths}
										thousandSeparator=","
										className="w-full text-sm text-red-500 text-center"
									/>
								</li>
								<li>
									<p className="w-full break-all text-center">TOTAL:</p>
									<NumericFormat
										disabled
										allowNegative
										value={d.TotalDeaths}
										thousandSeparator=","
										className="w-full text-sm text-red-500 text-center"
									/>
								</li>
							</ol>
						</div>
						<div className="flex flex-col w-full h-full justify-start place-items-center gap-2">
							<span className="text-base break-all font-serif underline text-green-500 text-center">
								RECOVERED
							</span>
							<img
								alt=""
								src={cures}
								className="w-16 h-16 object-cover"
							/>
							<ol className="w-full p-0">
								<li>
									<p className="w-full break-all text-center">NEW:</p>
									<NumericFormat
										disabled
										allowNegative
										value={d.NewRecovered}
										thousandSeparator=","
										className="w-full text-sm text-green-500 text-center"
									/>
								</li>
								<li>
									<p className="w-full break-all text-center">TOTAL:</p>
									<NumericFormat
										disabled
										allowNegative
										value={d.TotalRecovered}
										thousandSeparator=","
										className="w-full text-sm text-green-500 text-center"
									/>
								</li>
								<li>
									<p className="w-full break-all text-center">TOTAL TESTS:</p>
									<NumericFormat
										disabled
										allowNegative
										value={d.TotalTests}
										thousandSeparator=","
										className="w-full text-sm text-green-500 text-center"
									/>
								</li>
								<li>
									<p className="w-full break-all text-center">RECOVERY PROP:</p>
									<p className="text-sm text-green-500 text-center">
										{d.Recovery_Proporation}%
									</p>
								</li>
							</ol>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default memo(Country);
