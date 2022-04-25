import React from "react";
import PropTypes from "prop-types";

// MATERIAL COMPONENTS
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
// CUSTOM COMPONENTS
import CircularLoader from "./CircularLoader";

//CONSTANTS
import { LABELS } from "../constants/labels";

const CustomImageList = ({ keyValue, data, myRef, hasMore }) => {
	const hastItems = data && data.length;
	return (
		<>
			{!data ? (
				<CircularLoader
					keyValue={keyValue + "-circular-loader-image-list"}
					key={keyValue + "-circular-loader-image-list"}
				/>
			) : (
				<ImageList
					key={keyValue + "-image-list"}
					sx={{ height: 500 }}
					cols={hastItems ? 2 : 1}
				>
					{hastItems ? (
						data.map((item, index) => {
							if (data.length === index + 1 && hasMore) {
								return (
									<>
										<ImageListItem
											key={keyValue + `-image-list-item-${index}`}
											ref={myRef}
											style={{ height: 500 }}
										>
											<img
												key={keyValue + `-image-${index}`}
												src={`${item.src}?h=248w=248&fit=crop&auto=format`}
												srcSet={`${item.src}?w=248&fit=crop&auto=format&dpr=2 2x`}
												alt={`${item.tittle} ${item.id}`}
												loading="lazy"
											/>
											<ImageListItemBar
												key={keyValue + `-image-list-item-bar-${index}`}
												title={`${item.tittle} ${item.id}`}
												subtitle={item.subtitle}
												actionIcon={
													<IconButton
														key={keyValue + `-icon-button-${index}`}
														sx={{ color: "rgba(255, 255, 255, 0.54)" }}
														aria-label={`info about ${item.tittle} ${item.id}`}
													/>
												}
											/>
										</ImageListItem>
									</>
								);
							} else {
								return (
									<>
										<ImageListItem
											key={keyValue + `-image-list-item-${index}`}
											style={{ height: 500 }}
										>
											<img
												key={keyValue + `-image-${index}`}
												src={`${item.src}?h=248w=248&fit=crop&auto=format`}
												srcSet={`${item.src}?w=248&fit=crop&auto=format&dpr=2 2x`}
												alt={`${item.tittle} ${item.id}`}
												loading="lazy"
											/>
											<ImageListItemBar
												key={keyValue + `-image-list-item-bar-${index}`}
												title={`${item.tittle} ${item.id}`}
												subtitle={item.subtitle}
												actionIcon={
													<IconButton
														key={keyValue + `-icon-button-${index}`}
														sx={{ color: "rgba(255, 255, 255, 0.54)" }}
														aria-label={`info about ${item.tittle} ${item.id}`}
													/>
												}
											/>
										</ImageListItem>
									</>
								);
							}
						})
					) : (
						<Box
							key={keyValue + "-box"}
							display="flex"
							justifyContent="center"
							justifyItems="center"
							alignContent="center"
							alignItems="center"
						>
							<Typography
								key={keyValue + "-typograpy"}
								color="gray"
								variant="h1"
								component="h1"
							>
								{LABELS.NO_DATA}
							</Typography>
						</Box>
					)}
				</ImageList>
			)}
		</>
	);
};

CustomImageList.propTypes = {
	keyValue: PropTypes.string,
	data: PropTypes.arrayOf(PropTypes.object),
	myRef: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
	]),
	hasMore: PropTypes.bool,
};

export default CustomImageList;
