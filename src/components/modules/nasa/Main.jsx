import React from "react";

//MATERIAL COMPONENTS
import Box from "@mui/material/Box";
//CUSTOM COMPONENTS
import { SwipeableNasaCalendar } from "./SwipeableCalendar";
import CustomImageList from "../../CustomImageList";
import SwipeableTab from "../../SwipeableTab";
import CircularLoader from "../../CircularLoader";
import TabPanelFormCamera from "./TabPanels";
import { LinearProgress } from "@mui/material";

//HOOKS
import { useTheme } from "@emotion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
//CUSTOM HOOKS
import useFetchPhotos from "../../../hooks/useFetchPhotos";
import useFetchRoverData from "../../../hooks/useFetchRoverData";

//CONSTANTS
import { CAMERAS_CONSTANTS } from "../../../constants/cameras";
import { CALENDAR_CONSTANTS } from "../../../constants/calendars";
import { NASA_API } from "../../../constants/nasaApi";

const NasaModule = () => {
	const theme = useTheme();

	const [selectedRover, setSelectedRover] = useState(0);
	const [selectedCalendar, setSelectedCalendar] = useState(0);
	const [roverName, setRoverName] = useState("");

	//FETCH ROVERS
	const [
		{ queryParams, rovers, camerasByRover, dates, solMaxDate, selectedCamera },
		{ setQueryParams, setDates, setSelectedCamera },
	] = useFetchRoverData();

	//FETCH PHOTOS
	const {
		photos: photosByRover,
		hasMore,
		loading,
		shouldFetch,
		setPage,
		setResetFetch,
		setShouldFetch,
	} = useFetchPhotos(roverName, queryParams[roverName]);

	//SET ROVERNAME
	useEffect(() => {
		if (rovers.length) {
			setRoverName(rovers[selectedRover].name.toLowerCase());
		}
	}, [selectedRover, rovers]);

	//HANDLE SELECTION OF A CAMERA
	const handleChangeCamera = (newValue, rover, oldValue) => {
		const newSelectedCamera = { ...oldValue };
		newSelectedCamera[rover] = newValue;
		setSelectedCamera(newSelectedCamera);
	};

	//HANDLE SELECTION OF A DATE AND UPDATES PARAMS
	const handleChangeDate = (newValue, rover, calendar) => {
		if (dates[rover][calendar] !== newValue) {
			const newDates = { ...dates };
			newDates[rover][calendar] = newValue;
			setDates(newDates);
			const newQueryParams = { ...queryParams };
			newQueryParams[roverName] = [
				`&${NASA_API.PARAM_PAGE_NAME}=${NASA_API.DEFAULT_PAGE_VALUE}`,
				`${
					calendar === CALENDAR_CONSTANTS.SOL_CALENDAR_NAME
						? NASA_API.PARAM_SOL_CALENDAR_NAME
						: NASA_API.PARAM_EARTH_CALENDAR_NAME
				}=${newValue}`,
			];
			setQueryParams(newQueryParams);
			setResetFetch(true);
		}
	};

	//HANDLE PAGE UPDATE WHEN OBSERVER INTERSECT
	const handleObserverIntersection = useCallback(() => {
		setPage((prevPage) => {
			setQueryParams((prevQueryParams) => {
				const newQueryParams = { ...prevQueryParams };
				newQueryParams[roverName].shift();
				newQueryParams[roverName].unshift(`&${NASA_API.PARAM_PAGE_NAME}=${prevPage + 1}`);

				return newQueryParams;
			});
			return prevPage + 1;
		});
		setShouldFetch((preShouldFetch) => ({
			...preShouldFetch,
			[roverName]: true,
		}));
	}, [roverName, setPage, setQueryParams, setShouldFetch]);

	const photos = photosByRover[roverName];
	const camera = selectedCamera[roverName];
	const filteredPhotos = useMemo(() => {
		return photos && !!camera && camera !== CAMERAS_CONSTANTS.ALL_CAMERAS
			? photos.filter((photo) => photo.camera === camera)
			: photos;
	}, [photos, camera]);

	const observer = useRef();
	const lastElementRef = useCallback(
		(node) => {
			if (loading) return;
			if (observer.current) observer.current.disconnect();
			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && hasMore) {
					handleObserverIntersection();
				}
			});
			if (node) observer.current.observe(node);
		},
		[loading, hasMore, handleObserverIntersection],
	);

	return (
		<div style={{ width: "75%" }}>
			{rovers.length && camerasByRover && photosByRover ? (
				<Box sx={{ bgcolor: "background.paper" }}>
					<SwipeableTab
						data={rovers}
						selectedItem={selectedRover}
						setSelectedItem={setSelectedRover}
					>
						{rovers &&
							rovers.map((rover, index) => (
								<>
									<SwipeableNasaCalendar
										key={`sol-earth-${index}`}
										keyValue={`sol-earth-${index}`}
										differentiator={rover.name.toLowerCase()}
										dir={theme.direction}
										dataTab={Object.keys(dates[rover.name.toLowerCase()]).map(
											(date) => ({
												id: date,
												name: `${date} ${CALENDAR_CONSTANTS.CALENDAR_NAME}`,
											}),
										)}
										dataPicker={Object.keys(dates[rover.name.toLowerCase()])}
										datePickerValue={dates[rover.name.toLowerCase()]}
										maxDates={solMaxDate[rover.name.toLowerCase()]}
										selectedItem={selectedCalendar}
										setSelectedItem={setSelectedCalendar}
										handleOnChange={(newValue, calendar) =>
											handleChangeDate(
												newValue,
												rover.name.toLowerCase(),
												calendar,
											)
										}
									/>
									<TabPanelFormCamera
										key={selectedCamera[rover.name.toLowerCase()]}
										keyValue={selectedCamera[rover.name.toLowerCase()]}
										differential={rover.id}
										data={camerasByRover[rover.name]}
										label={CAMERAS_CONSTANTS.LABEL_FORM_CONTROL}
										valueTabPanel={selectedRover}
										valueForm={selectedCamera[rover.name.toLowerCase()]}
										index={index}
										dir={theme.direction}
										handleOnChange={(newValue) =>
											handleChangeCamera(
												newValue,
												rover.name.toLowerCase(),
												selectedCamera,
											)
										}
									/>
								</>
							))}
					</SwipeableTab>
					<CustomImageList
						key={`${roverName}-image-list`}
						keyValue={`${roverName}-image-list`}
						data={filteredPhotos}
						myRef={lastElementRef}
						hasMore={hasMore}
					/>
					{shouldFetch[roverName] ? (
						<LinearProgress style={{ top: -5, paddingTop: "5px" }} color="secondary" />
					) : (
						""
					)}
				</Box>
			) : (
				<CircularLoader
					key={`${roverName}-circular-loader-main`}
					keyValue={`${roverName}-circular-loader-main`}
				/>
			)}
		</div>
	);
};

export default NasaModule;
