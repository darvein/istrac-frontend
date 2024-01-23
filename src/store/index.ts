import { createStore } from 'vuex';
import axios from 'axios';

interface State {
  places: Record<string, Place[]>;
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
    places: {},
  },
  mutations: {
    setPlaces(state, { citySlug, data }: { citySlug: string; data: Place[] }) {
      state.places[citySlug] = data;
    },
  },
  actions: {
    async fetchPlaces({ commit, state }, citySlug: string) {
      const baseUrl = process.env.VUE_APP_API_BASE_URL;
      const url = `${baseUrl}/api/tplaces/?location=${citySlug}`;

      if (!citySlug) {
        return;
      }
      if (state.places[citySlug]) {
        return state.places[citySlug];
      }
      try {
        const response = await axios.get(url);
        commit('setPlaces', { citySlug, data: response.data });
      } catch (error) {
        console.error('There was an error fetching the places:', error);
      }
    },
  },
  getters: {
    getPlacesBySlug: (state) => (citySlug: string) => {
      return citySlug ? state.places[citySlug] || [] : [];
    },
  },
});
