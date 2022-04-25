// HOOKS
import { useEffect, useState } from "react";

// UTILS
import axios from "axios";
import { getUrl } from "../utils/nasaApi";
// CONSTANTS
import { CAMERAS_CONSTANTS } from "../constants/cameras";
import { CALENDAR_CONSTANTS } from "../constants/calendars";
import { NASA_API } from "../constants/nasaApi";

export default function useFetchRoverData(url) {
	const [queryParams, setQueryParams] = useState({});
	const [rovers, setRovers] = useState([]);
	const [camerasByRover, setCamerasByRover] = useState({});
	const [dates, setDates] = useState({});
	const [solMaxDate, setSolMaxDate] = useState({});
	const [shouldFetchByRover, setShouldFetchByRover] = useState({});
	const [selectedCamera, setSelectedCamera] = useState({});

	useEffect(() => {
		axios
			.get(getUrl())
			.then((res) => {
				const queryParamsData = {};
				const camerasByRoverData = {};
				const roverDatesData = {};
				const solMaxDateData = {};
				const selectedCameras = {};
				const firstFetchData = {};
				const roversData = res.data.rovers.map((rover) => ({
					id: rover.id,
					name: rover.name,
				}));
				roversData.pop();

				res.data.rovers.forEach((rover) => {
					queryParamsData[rover.name.toLowerCase()] = [
						`&${NASA_API.PARAM_PAGE_NAME}=${NASA_API.DEFAULT_PAGE_VALUE}`,
						`${NASA_API.PARAM_EARTH_CALENDAR_NAME}=${rover.max_date}`,
					];
					rover.cameras.unshift({
						id: 0,
						name: CAMERAS_CONSTANTS.ALL_CAMERAS,
					});
					camerasByRoverData[rover.name] = rover.cameras;
					roverDatesData[rover.name.toLowerCase()] = {
						[CALENDAR_CONSTANTS.SOL_CALENDAR_NAME]: rover.max_sol,
						[CALENDAR_CONSTANTS.EARTH_CALENDAR_NAME]: rover.max_date,
					};
					solMaxDateData[rover.name.toLowerCase()] = {
						[CALENDAR_CONSTANTS.SOL_CALENDAR_NAME]: rover.max_sol,
					};
					selectedCameras[rover.name.toLowerCase()] =
						CAMERAS_CONSTANTS.DEFAULT_CAMERA_VALUE;
					firstFetchData[rover.name.toLowerCase()] = true;
				});

				setQueryParams(queryParamsData);
				setCamerasByRover(camerasByRoverData);
				setRovers(roversData);
				setDates(roverDatesData);
				setSolMaxDate(solMaxDateData);
				setShouldFetchByRover(firstFetchData);
				setSelectedCamera(selectedCameras);
			})
			.catch(console.error);
	}, [url]);

	const values = {
		queryParams,
		rovers,
		camerasByRover,
		dates,
		solMaxDate,
		shouldFetchByRover,
		selectedCamera,
	};
	const setValues = {
		setQueryParams,
		setRovers,
		setCamerasByRover,
		setDates,
		setShouldFetchByRover,
		setSelectedCamera,
	};

	return [values, setValues];
}
