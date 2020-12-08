import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';

import { getBlobList, BlobModel, getBlob } from '../business/azureBlobStorage/blob';

import {
  getConnectionList,
  saveConnections,
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
  blobName: string | null;
};

const store: StoreOptions<RootState> = {
  state: {
    blobList: null,
    connectionList: Array<ConnectionModel>(),
    currentConnection: null,
    currentBlobContent: null,
    prefix: '',
    blobName: null,
  },
  mutations: {
    setBlobList(state, blobs) {
      state.blobList = blobs;
    },

    setBlobName(state, blobName: string | null) {
      state.blobName = blobName;
    },

    addConnection(state, connection: ConnectionModel) {
      state.connectionList = [...state.connectionList, connection];
    },

    removeConnection(state, id: string) {
      const list = state.connectionList;

      const index = list.findIndex(
        (connection) => connection.id === id,
      );

      if (index < 0) {
        return;
      }

      state.connectionList = list.slice(0, index).concat(list.slice(index + 1, list.length));
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

    createNewConnection({ commit, state }, connectionModel: ConnectionModel) {
      commit('addConnection', connectionModel);

      saveConnections(state.connectionList);

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

      commit('setBlobName', blobName);

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
    },

    removeConnection({ commit, state, dispatch }, id: string) {
      commit('removeConnection', id);

      saveConnections(state.connectionList);

      if (id === state.currentConnection?.id) {
        dispatch('changeCurrentConnection');
      }
    }
  },
};

export default new Vuex.Store<RootState>(store);
