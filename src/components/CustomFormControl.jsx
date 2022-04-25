import React from "react";
import PropTypes from "prop-types";

// MATERIAL COMPONENTS
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const CustomFormControl = ({ keyValue, data, label, value, onChange }) => {
	return (
		<FormControl key={keyValue + "-form-control"} fullWidth>
			<InputLabel key={keyValue + "-input-label"} id="simple-select-label">
				{label}
			</InputLabel>
			<Select
				key={keyValue + "select"}
				style={{
					backgroundColor: "white",
				}}
				labelId="simple-select-label"
				id="simple-select"
				value={value}
				label={label}
				onChange={(e) => onChange(e.target.value)}
			>
				{data &&
					data.map((item) => (
						<MenuItem key={keyValue + `-menu-item-${item.id}`} value={item.name}>
							{item.name}
						</MenuItem>
					))}
			</Select>
		</FormControl>
	);
};

CustomFormControl.propTypes = {
	keyValue: PropTypes.string,
	data: PropTypes.arrayOf(PropTypes.object),
	label: PropTypes.string,
	value: PropTypes.string,
	onChange: PropTypes.func,
};

export default CustomFormControl;
