import React from "react";
import PropTypes from "prop-types";

//CUSTOM COMPONENTS
import SwipeableTab from "../../SwipeableTab";
import { DatePickerEarth, DatePickerSol } from "./DatePickers";
import { TabPanel } from "../../TabPanels";

//UTILS
import { createKey } from "../../../utils/key";
//CONSTANTS
import { CALENDAR_CONSTANTS } from "../../../constants/calendars";

const SwipeableTabNasaCalendar = ({
	keyValue,
	differentiator,
	dir,
	dataTab,
	dataPicker,
	datePickerValue,
	maxDates,
	selectedItem,
	setSelectedItem,
	handleOnChange,
}) => {
	return (
		<SwipeableTab
			key={createKey(keyValue, differentiator, "swipeable-tab-calendar")}
			keyValue={createKey(keyValue, differentiator, "swipeable-tab-calendar")}
			data={dataTab}
			selectedItem={selectedItem}
			setSelectedItem={setSelectedItem}
		>
			{dataPicker.map((item, index) => (
				<TabPanel
					key={createKey(keyValue, differentiator, `tab-panel-calendar-${index}`)}
					keyValue={createKey(keyValue, differentiator, "tab-panel-calendar")}
					value={selectedItem}
					index={index}
					dir={dir}
				>
					{item === CALENDAR_CONSTANTS.SOL_CALENDAR_NAME ? (
						<DatePickerSol
							key={createKey(
								keyValue,
								differentiator,
								`date-picker-calendar-${item}-${index}`,
							)}
							keyValue={createKey(
								keyValue,
								differentiator,
								`date-picker-calendar-${item}-${index}`,
							)}
							id={createKey(index, item, differentiator)}
							name={`${item.toUpperCase()} DATE`}
							value={datePickerValue[item]}
							maxDate={maxDates[item]}
							onChange={(newValue) => handleOnChange(newValue, item)}
						/>
					) : (
						<DatePickerEarth
							key={createKey(
								keyValue,
								differentiator,
								`date-picker-calendar-${item}`,
							)}
							keyValue={createKey(
								keyValue,
								differentiator,
								`date-picker-calendar-${item}`,
							)}
							id={createKey(index, item, differentiator)}
							name={`${item.toUpperCase()} DATE`}
							value={datePickerValue[item]}
							onChange={(newValue) => handleOnChange(newValue, item)}
						/>
					)}
				</TabPanel>
			))}
		</SwipeableTab>
	);
};

SwipeableTabNasaCalendar.propTypes = {
	keyValue: PropTypes.string,
	differentiator: PropTypes.string,
	dir: PropTypes.string,
	dataTab: PropTypes.arrayOf[PropTypes.object],
	dataPicker: PropTypes.arrayOf[PropTypes.object],
	datePickerValue: PropTypes.string,
	maxDates: PropTypes.object,
	selectedItem: PropTypes.string,
	setSelectedItem: PropTypes.func,
	handleOnChange: PropTypes.func,
};

export { SwipeableTabNasaCalendar };
