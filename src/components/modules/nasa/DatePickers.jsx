import React from "react";
import PropTypes from "prop-types";

//MATERIAL COMPONENTS
import EventIcon from "@mui/icons-material/Event";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Icon from "@mui/material/Icon";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";

//CUSTOM COMPONENTS
import CustomDatepicker from "../../CustomDatePicker";

//HOOKS
import { useState } from "react";

//CONSTANTS
import { CALENDAR_CONSTANTS } from "../../../constants/calendars";
import { REGEX_PATTERNS } from "../../../constants/patterns";

const DatePickerEarth = ({ keyValue, id, name, value, onChange }) => {
	return (
		<CustomDatepicker
			key={keyValue + "custom-date-picker"}
			id={id}
			name={name}
			value={value}
			mask={CALENDAR_CONSTANTS.FULL_DATE_MASK}
			format={CALENDAR_CONSTANTS.FULL_DATE_FORMAT}
			views={[CALENDAR_CONSTANTS.DAY_VIEW]}
			onChange={onChange}
		></CustomDatepicker>
	);
};

const DatePickerSol = ({ keyValue, id, name, value, maxDate, onChange }) => {
	const [selectedValue, setSelectedValue] = useState(value);
	const [error, setError] = useState(false);

	const handleChange = (newValue) => {
		const numberValue = newValue.replace(REGEX_PATTERNS.ONLY_NUMBERS, "").slice(0, 4);

		if (numberValue) {
			if (numberValue < 1 || numberValue > maxDate) {
				if (!error) {
					setError(true);
				}
			}
			if (selectedValue !== numberValue) {
				setSelectedValue(numberValue);
				onChange(numberValue);
				if (error) {
					setError(false);
				}
			}
		} else {
			setSelectedValue("");
		}
	};

	return (
		<FormControl key={keyValue + "-form-control"} sx={{ width: "30ch" }} variant="outlined">
			<InputLabel key={keyValue + "-input-label"} error={error}>
				{name}
			</InputLabel>
			<OutlinedInput
				id={id}
				type="text"
				pattern="[0-9]"
				autoComplete="off"
				onChange={(e) => handleChange(e.target.value)}
				value={selectedValue}
				error={error}
				endAdornment={
					<InputAdornment key={keyValue + "-input-adornment"} position="end">
						<Icon
							key={keyValue + "-icon"}
							aria-label="toggle password visibility"
							// onClick={handleClickShowPassword}
							// onMouseDown={handleMouseDownPassword}
							edge="end"
						>
							<EventIcon key={keyValue + "-event-icon"}></EventIcon>
						</Icon>
					</InputAdornment>
				}
				label={name}
			/>
			<FormHelperText
				key={keyValue + "-form-helper-text"}
				error={error}
				id="filled-weight-helper-text"
			>
				{error
					? CALENDAR_CONSTANTS.INVALID_DATE
					: `${CALENDAR_CONSTANTS.TEXT_HELPER_DATE} ${maxDate}`}
			</FormHelperText>
		</FormControl>
	);
};

DatePickerSol.propTypes = {
	keyValue: PropTypes.string,
	id: PropTypes.string,
	name: PropTypes.string,
	value: PropTypes.string,
	maxDate: PropTypes.number,
	onChange: PropTypes.func,
};

DatePickerEarth.propTypes = {
	keyValue: PropTypes.string,
	id: PropTypes.string,
	name: PropTypes.string,
	value: PropTypes.string,
	onChange: PropTypes.func,
};

export { DatePickerSol, DatePickerEarth };
