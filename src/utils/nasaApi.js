import { NASA_API } from "../constants/nasaApi";

const getUrl = (endpoint = "", params = "") => `
    ${NASA_API.API_ROVERS_URL}${endpoint}?${NASA_API.PARAM_API_KEY_NAME}=${NASA_API.API_KEY}${params}
`;

export { getUrl };
