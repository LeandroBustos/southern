// HOOKS
import { useEffect, useState } from "react";
import useDebounce from "./useDebounce";

// UTILS
import axios from "axios";
import { getUrl } from "../utils/nasaApi";
import { parseQueryToString } from "../utils/query";

export default function useBookSearch(rover, query) {
	const [page, setPage] = useState(1);
	const [photos, setPhotos] = useState({});
	const [hasMore, setHasMore] = useState(false);
	const [resetFetch, setResetFetch] = useState(false);
	const [shouldFetch, setShouldFetch] = useState({});
	const [loading, setLoading] = useState(false);

	const queryParsed = parseQueryToString(query);

	useEffect(() => {
		if (!(((rover && !photos[rover]) || resetFetch) && !loading)) return;
		axios
			.get(getUrl(`/${rover}/photos`, queryParsed))
			.then((res) => {
				setLoading(true);
				setPhotos((prevPhotos) => ({
					...prevPhotos,
					[rover]: res.data.photos.map((photo) => ({
						id: photo.id,
						src: photo.img_src,
						tittle: photo.camera.full_name,
						subtitle: photo.rover.name,
						camera: photo.camera.name,
					})),
				}));

				setHasMore(res.data.photos.length > 24);
				setResetFetch(false);
				setShouldFetch((preShouldFetch) => ({
					...preShouldFetch,
					[rover]: false,
				}));
				setPage(1);
				setLoading(false);
			})
			.catch(console.error);
	}, [rover, photos, queryParsed, resetFetch, loading]);

	const fetchByParams = () => {
		setLoading(true);
		if (!shouldFetch && !shouldFetch[rover] && (resetFetch || loading)) return;
		axios
			.get(getUrl(`/${rover}/photos`, queryParsed))
			.then((res) => {
				setPhotos((prevPhotos) => ({
					...prevPhotos,
					[rover]: [
						...prevPhotos[rover],
						...res.data.photos.map((photo) => ({
							id: photo.id,
							src: photo.img_src,
							tittle: photo.camera.full_name,
							subtitle: photo.rover.name,
							camera: photo.camera.name,
						})),
					],
				}));

				if (!loading) {
					const newShouldFetch = {
						...shouldFetch,
					};
					newShouldFetch[rover] = false;
					setShouldFetch(newShouldFetch);

					setHasMore(res.data.photos.length > 24);
					setLoading(false);
				}
			})
			.catch(console.error);
	};

	const shouldExecuteDebounce = shouldFetch && shouldFetch[rover] && !resetFetch && !loading;
	const fetchByParamsDebounce = useDebounce(fetchByParams, shouldExecuteDebounce);
	useEffect(() => {
		fetchByParamsDebounce();
	}, [fetchByParamsDebounce]);

	return {
		page,
		photos,
		hasMore,
		shouldFetch,
		loading,
		setPage,
		setResetFetch,
		setShouldFetch,
		setLoading,
	};
}
