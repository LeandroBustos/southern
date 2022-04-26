import React from "react";
import PropTypes from "prop-types";

// MATERIAL COMPONENTS
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// CUSTOM COMPONENTS
import CustomFormControl from "./CustomFormControl";

// UTILS
import { createKey } from "../utils/key";

const TabPanel = ({ keyValue, children, value, index, ...other }) => {
	return (
		<div
			key={keyValue + "-div"}
			role="tabpanel"
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box key={keyValue + "-box"} sx={{ p: 3 }}>
					<Typography key={keyValue + "-typography"} color="black" component="h1">
						{children}
					</Typography>
				</Box>
			)}
		</div>
	);
};

const TabPanelFormControl = ({
	keyValue,
	differential,
	componentIndicator,
	data,
	label,
	valueForm,
	valueTabPanel,
	index,
	dir,
	handleOnChange,
}) => {
	return (
		<TabPanel
			key={createKey(keyValue, differential, `tab-panel-form-control-${componentIndicator}`)}
			keyValue={createKey(
				keyValue,
				differential,
				`tab-panel-form-control-${componentIndicator}`,
			)}
			value={valueTabPanel}
			index={index}
			dir={dir}
		>
			<CustomFormControl
				keyValue={createKey(keyValue, differential, `form-control-${componentIndicator}`)}
				key={createKey(keyValue, differential, `form-control-${componentIndicator}`)}
				data={data}
				label={label}
				value={valueForm}
				onChange={(newValue) => handleOnChange(newValue)}
			/>
		</TabPanel>
	);
};

TabPanel.propTypes = {
	keyValue: PropTypes.string,
	children: PropTypes.node,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	index: PropTypes.number,
	other: PropTypes.object,
};

TabPanelFormControl.propTypes = {
	keyValue: PropTypes.string,
	differential: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	componentIndicator: PropTypes.string,
	data: PropTypes.arrayOf(PropTypes.object),
	label: PropTypes.string,
	valueForm: PropTypes.string,
	valueTabPanel: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	index: PropTypes.number,
	dir: PropTypes.string,
	handleOnChange: PropTypes.func,
};

export { TabPanel, TabPanelFormControl };
