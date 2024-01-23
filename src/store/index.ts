import { createStore } from 'vuex';
import axios from 'axios';

interface State {
  placesList: Record<string, Place[]>;
  placeDetails: Record<number, Place>;
}

interface Place {
  id: number;
  name: string;
  description: string;
  photos: Photo[];
}

interface Photo {
  id: number;
  image: string;
  image_url: string;
}

export default createStore<State>({
  state: {
    placesList: {},
    placeDetails: {},
  },
  mutations: {
    setPlaces(state, { citySlug, data }: { citySlug: string; data: Place[] }) {
      state.placesList[citySlug] = data;
    },
    setPlaceDetail(state, { placeId, data }: { placeId: number; data: Place }) {
      state.placeDetails[placeId] = data;
    },
  },
  actions: {
    async fetchPlaces({ commit, state }, citySlug: string) {
      const baseUrl = process.env.VUE_APP_API_BASE_URL;
      const url = `${baseUrl}/api/tplaces/?location=${citySlug}`;

      if (!citySlug) {
        return;
      }
      if (state.placesList[citySlug]) {
        return state.placesList[citySlug];
      }
      try {
        const response = await axios.get(url);
        commit('setPlaces', { citySlug, data: response.data });
      } catch (error) {
        console.error('There was an error fetching the places:', error);
      }
    },

    async fetchPlaceDetail({ commit, state }, placeId: number) {
      // New action to fetch individual place details
      const baseUrl = process.env.VUE_APP_API_BASE_URL;
      const url = `${baseUrl}/api/tplaces/${placeId}`;

      if (state.placeDetails[placeId]) {
        return state.placeDetails[placeId];
      }
      try {
        const response = await axios.get(url);
        commit('setPlaceDetail', { placeId, data: response.data });
      } catch (error) {
        console.error('There was an error fetching the place details:', error);
      }
    },
  },
  getters: {
    getPlacesBySlug: (state) => (citySlug: string) => {
      return state.placesList[citySlug] || [];
    },
    getPlaceDetail: (state) => (placeId: number) => {
      return state.placeDetails[placeId] || null;
    },
  },
});
