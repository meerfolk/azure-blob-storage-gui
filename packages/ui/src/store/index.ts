import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';

import { getBlobList, BlobModel, getBlob } from '../business/azureBlobStorage/blob';

import {
  getConnectionList,
  saveConnection,
  ConnectionModel,
  getCurrentConnectionId,
  saveCurrentConnectionId,
} from '../business/localStorage/connection';

Vue.use(Vuex);

type RootState = {
  blobList: Array<BlobModel> | null;
  connectionList: Array<ConnectionModel>;
  currentConnection: ConnectionModel | null;
  currentBlobContent: string | null;
  prefix: string;
};

const store: StoreOptions<RootState> = {
  state: {
    blobList: null,
    connectionList: Array<ConnectionModel>(),
    currentConnection: null,
    currentBlobContent: null,
    prefix: '',
  },
  mutations: {
    setBlobList(state, blobs) {
      state.blobList = blobs;
    },

    addConnection(state, connection: ConnectionModel) {
      state.connectionList = [...state.connectionList, connection];
    },

    setConnectionList(state, connectionList: ConnectionModel[]) {
      state.connectionList = connectionList;
    },

    setCurrentConnection(state, connection: ConnectionModel) {
      state.currentConnection = connection;
    },

    setCurrentBlobContent(state, content: string) {
      state.currentBlobContent = content;
    },

    setPrefix(state, prefix: string) {
      state.prefix = prefix;
    }
  },
  actions: {
    getBlobList({ commit, state }) {
      if (state.currentConnection !== null) {
        commit('setBlobList', null);

        getBlobList(state.currentConnection, state.prefix)
          .then((blobs) => {
            commit('setBlobList', blobs);
          })
          .catch((error) => console.error(error));
      }
    },

    createNewConnection({ commit }, connectionModel: ConnectionModel) {
      saveConnection(connectionModel);
      commit('addConnection', connectionModel);

      this.dispatch('changeCurrentConnection', connectionModel.id);
    },

    getConnectionList({ commit }) {
      const connections = getConnectionList();

      commit('setConnectionList', connections);

      this.dispatch('changeCurrentConnection', getCurrentConnectionId());
    },

    changeCurrentConnection({ commit, state }, connectionId?: string) {
      let currentConnection: ConnectionModel = state.connectionList[0] || null;

      if (connectionId !== undefined) {
        currentConnection =
          state.connectionList.find((connection) => connection.id === connectionId) || currentConnection;
      }

      commit('setCurrentConnection', currentConnection);
      this.dispatch('getBlobList');

      if (currentConnection !== null) {
        saveCurrentConnectionId(currentConnection.id);
      }
    },

    getBlobContent({ commit, state }, blobName: string) {
      if (state.currentConnection === null) {
        console.error('Trying to set current blob without current connection');
        return;
      }

      getBlob(state.currentConnection, blobName).then(
        (blobContent: string) => {
          commit('setCurrentBlobContent', blobContent);
        }
      );
    },

    changePrefix({ commit, state, dispatch }, prefix: string) {
      if (prefix === state.prefix) {
        return;
      }

      commit('setPrefix', prefix);

      dispatch('getBlobList');
    }
  },
};

export default new Vuex.Store<RootState>(store);
