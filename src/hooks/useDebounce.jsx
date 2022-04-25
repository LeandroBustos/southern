const useDebounce = (callback, shouldExecuteDebounce) => () => {
	if (shouldExecuteDebounce) {
		const delayDebounceFn = setTimeout(() => {
			callback();
		}, 1500);

		return () => clearTimeout(delayDebounceFn);
	}
};

export default useDebounce;
