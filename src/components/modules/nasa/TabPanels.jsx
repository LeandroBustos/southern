import React from "react";

import PropTypes from "prop-types";

//CUSTOM COMPONENTS
import { TabPanelFormControl } from "../../TabPanels";

const TabPanelFormCamera = ({
	keyValue,
	differential,
	data,
	label,
	valueTabPanel,
	valueForm,
	index,
	dir,
	handleOnChange,
}) => {
	return (
		<TabPanelFormControl
			key={keyValue + "-tab-panel-form-control-camera"}
			keyValue={keyValue}
			differential={differential}
			componentIndicator="camera"
			data={data}
			label={label}
			valueForm={valueForm}
			valueTabPanel={valueTabPanel}
			index={index}
			dir={dir}
			handleOnChange={handleOnChange}
		/>
	);
};

TabPanelFormCamera.propTypes = {
	keyValue: PropTypes.string,
	differential: PropTypes.string,
	data: PropTypes.arrayOf(PropTypes.object),
	label: PropTypes.string,
	valueTabPanel: PropTypes.string,
	valueForm: PropTypes.string,
	index: PropTypes.number,
	dir: PropTypes.string,
	handleOnChange: PropTypes.func,
};

export default TabPanelFormCamera;
