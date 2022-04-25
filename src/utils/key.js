const createKey = (key, differentiator = "", componentIndicator) => {
	return `${differentiator ? `${differentiator}-` : differentiator}${key}-${componentIndicator}`;
};

export { createKey };
