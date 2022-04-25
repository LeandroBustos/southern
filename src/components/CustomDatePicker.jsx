import React from "react";
import PropTypes from "prop-types";

// MATERIAL COMPONENTS
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

// UTILS
import moment from "moment";

const CustomDatepicker = ({ id, name, value, mask, format, views, onChange }) => {
	return (
		<>
			<LocalizationProvider dateAdapter={AdapterMoment}>
				<DatePicker
					key={id + "-date-picker"}
					label={name}
					value={value}
					mask={mask}
					inputFormat={format}
					views={views}
					onChange={(newValue) => {
						onChange(moment(newValue._d).format(format));
					}}
					renderInput={(params) => <TextField {...params} />}
				/>
			</LocalizationProvider>
		</>
	);
};

CustomDatepicker.propTypes = {
	id: PropTypes.string,
	name: PropTypes.string,
	value: PropTypes.string,
	mask: PropTypes.string,
	format: PropTypes.string,
	views: PropTypes.arrayOf(PropTypes.string),
	onChange: PropTypes.func,
};

export default CustomDatepicker;
