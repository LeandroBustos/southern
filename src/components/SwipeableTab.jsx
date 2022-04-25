import React from "react";
import PropTypes from "prop-types";

// MATERIAL COMPONENTS
import AppBar from "@mui/material/AppBar";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import SwipeableViews from "react-swipeable-views/lib/SwipeableViews";

// HOOKS
import { useTheme } from "@emotion/react";

const a11yProps = (index) => {
	return {
		id: `full-width-tab-${index}`,
		"aria-controls": `full-width-tabpanel-${index}`,
	};
};

const SwipeableTab = ({ keyValue, data, selectedItem, setSelectedItem, children }) => {
	const theme = useTheme();

	const handleChange = (event, newValue) => {
		setSelectedItem(newValue);
	};

	const handleChangeIndex = (index) => {
		setSelectedItem(index);
	};

	return (
		<>
			<AppBar key={keyValue + "-app-bar"} position="static">
				<Tabs
					key={keyValue + "-tabs"}
					value={selectedItem}
					onChange={handleChange}
					style={{
						backgroundColor: "black",
					}}
					indicatorColor="secondary"
					textColor="inherit"
					variant="fullWidth"
					aria-label="full width tabs"
				>
					{data &&
						data.map((item, index) => (
							<Tab
								key={`${keyValue}-${item.id}-${index}-tab`}
								label={item.name}
								{...a11yProps(index)}
							/>
						))}
				</Tabs>
			</AppBar>
			<SwipeableViews
				key={keyValue + "-swipeable-views"}
				axis={theme.direction === "rtl" ? "x-reverse" : "x"}
				index={selectedItem}
				onChangeIndex={handleChangeIndex}
			>
				{children}
			</SwipeableViews>
		</>
	);
};

SwipeableTab.propTypes = {
	keyValue: PropTypes.string,
	data: PropTypes.arrayOf(PropTypes.object),
	selectedItem: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	setSelectedItem: PropTypes.func,
	children: PropTypes.node,
};

export default SwipeableTab;
