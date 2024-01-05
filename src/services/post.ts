import axios from 'axios';

// Constants
import { API_ROUTES } from '../constants/api-routes';

export const getLatestPosts = async (page?: number): Promise<any> => {
	try {
		const response = await axios.get(
			`${API_ROUTES.LATEST_POST}?tags=story&page=${page}`
		);
		if (response.status === 200) {
			return response.data;
		}
	} catch (error) {
		console.error('getLatestPostsError', error);
	}
};
