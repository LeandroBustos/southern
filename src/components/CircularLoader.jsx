import React from "react";
import PropTypes from "prop-types";

// MATERIAL COMPONENTS
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

const CircularLoader = ({ keyValue }) => {
	return (
		<Stack
			key={keyValue + "-stack"}
			display="flex"
			justifyContent="center"
			alignContent="center"
			sx={{ color: "grey.500" }}
			spacing={2}
			direction="row"
		>
			<CircularProgress key={keyValue + "-circular-progress"} size={200} color="secondary" />
		</Stack>
	);
};

CircularLoader.propTypes = {
	keyValue: PropTypes.string,
};

export default CircularLoader;
