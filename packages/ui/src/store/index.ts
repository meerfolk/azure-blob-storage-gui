import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';

import { getBlob } from '../business/azureBlobStorage/blob';

import Connections from './Connections';
import Settings from './Settings';
import BlobList from './BlobList';

Vue.use(Vuex);

export interface RootState {
  currentBlobContent: string | null;
  blobName: string | null;
  settings?: Settings;
  connections?: Connections;
};

const store: StoreOptions<RootState> = {
  modules: {
    settings: Settings,
    connections: Connections,
    blobList: BlobList,
  },
  state: {
    currentBlobContent: null,
    blobName: null,
  },
  mutations: {
    setBlobName(state, blobName: string | null) {
      state.blobName = blobName;
    },

    setCurrentBlobContent(state, content: string) {
      state.currentBlobContent = content;
    },
  },
  actions: {
    init({ state, dispatch }): void {
      dispatch('settings/loadSettings');

      const reloadTime = state.settings?.settings?.reloadTime;

      if (reloadTime) {
        dispatch('blobList/startReload', reloadTime);
      } else {
        dispatch('blobList/reload');
      }
      dispatch('connections/loadList');
    },

    changeCurrentConnection({ commit, state, dispatch }, connectionId?: string) {
      commit('blobList/setList', null);
      commit('connections/setErrorMessage', null);

      dispatch('blobList/reload');
    },

    getBlobContent({ commit, state }, blobName: string) {
      if (!state.connections || !state.connections.current) {
        console.error('Trying to set current blob without current connection');
        return;
      }

      commit('setBlobName', blobName);

      getBlob(state.connections.current, blobName).then(
        (blobContent: string) => {
          commit('setCurrentBlobContent', blobContent);
        }
      );
    },
  },
};

export default new Vuex.Store<RootState>(store);
