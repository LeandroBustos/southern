export const parseQueryToString = (query) => {
	let parsed = "";
	if (query) {
		parsed = `${query.join("&")}`;
	}

	return parsed;
};
