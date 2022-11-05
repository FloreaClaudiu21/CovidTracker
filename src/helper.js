const BASE_URL =
	"https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data";
const EUROPE_LINK = BASE_URL + "/europe";
const AFRICAN_LINK = BASE_URL + "/africa";
const ASIAN_LINK = BASE_URL + "/asia";
const NORTHAMERICA_LINK = BASE_URL + "/northamerica";
const SOUTHAMERICA_LINK = BASE_URL + "/southamerica";
const AUSTRALIA_LINK = BASE_URL + "/australia";
const FETCH_OPTIONS = {
	method: "GET",
	headers: {
		"X-RapidAPI-Key": "ffd33ed36amsh227813079ff8b80p1bee33jsn3229ee047d4f",
		"X-RapidAPI-Host":
			"vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com",
	},
};

const ADD_VAL = (list, v, type) => {
	v.forEach((el) => {
		list.push({
			data: el,
			type: type,
			flag: "https://countryflagsapi.com/svg/" + el.TwoLetterSymbol,
		});
	});
};

const GET_DATA = (LINK) => {
	return fetch(LINK, FETCH_OPTIONS).then((r) => r.json());
};

const FILTER_DATA = (LIST, PARAM) => {
	return LIST.filter((v) => v.type === PARAM)
}

const GET_COUNTRIES = async () => {
	const list = [];
	const europe_c = GET_DATA(EUROPE_LINK).then((v) =>
		ADD_VAL(list, v, "europe")
	);
	const asia_c = GET_DATA(ASIAN_LINK).then((v) => ADD_VAL(list, v, "asia"));
	const africa_c = GET_DATA(AFRICAN_LINK).then((v) =>
		ADD_VAL(list, v, "africa")
	);
	const n_america = GET_DATA(NORTHAMERICA_LINK).then((v) =>
		ADD_VAL(list, v, "northamerica")
	);
	const s_america = GET_DATA(SOUTHAMERICA_LINK).then((v) =>
		ADD_VAL(list, v, "southamerica")
	);
	const australia_c = GET_DATA(AUSTRALIA_LINK).then((v) =>
		ADD_VAL(list, v, "australia")
	);
	await Promise.all([
		europe_c,
		asia_c,
		africa_c,
		australia_c,
		n_america,
		s_america,
	]);
	return list;
};

export {
	GET_DATA,
	FILTER_DATA,
	GET_COUNTRIES,
	EUROPE_LINK,
	AFRICAN_LINK,
	ASIAN_LINK,
	NORTHAMERICA_LINK,
	SOUTHAMERICA_LINK,
	AUSTRALIA_LINK,
};
