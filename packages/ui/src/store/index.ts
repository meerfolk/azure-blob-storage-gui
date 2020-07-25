import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';

import getBlobList from '../business/azureBlobStorage/blob/getBlobList';

import {
  getConnectionList,
  saveConnection,
  ConnectionModel,
  getCurrentConnectionId,
} from '../business/localStorage/connection';
import BlobModel from '../business/azureBlobStorage/blob/blob.model';

Vue.use(Vuex);

type RootState = {
  blobList: Array<BlobModel> | null;
  connectionList: Array<ConnectionModel>;
  currentConnection: ConnectionModel | null;
};

const store: StoreOptions<RootState> = {
  state: {
    blobList: null,
    connectionList: Array<ConnectionModel>(),
    currentConnection: null,
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
  },
  actions: {
    getBlobList({ commit, state }) {
      if (state.currentConnection !== null) {
        commit('setBlobList', null);

        getBlobList(state.currentConnection)
          .then((blobs) => {
            commit('setBlobList', blobs);
          })
          .catch((error) => console.error(error));
      }
    },

    createNewConnection({ commit, state }, connectionModel: ConnectionModel) {
      saveConnection(connectionModel);
      commit('addConnection', connectionModel);

      if (state.currentConnection === null) {
        state.currentConnection = connectionModel;
      }
    },

    getConnectionList({ commit }) {
      const connections = getConnectionList();

      commit('setConnectionList', connections);

      this.dispatch('changeCurrentConnection');
    },

    changeCurrentConnection({ commit, state }) {
      const currentConnectionId = getCurrentConnectionId();

      let currentConnection: ConnectionModel = state.connectionList[0] || null;

      currentConnection =
        state.connectionList.find((connection) => connection.id === currentConnectionId) || currentConnection;

      if (currentConnection !== undefined) {
        commit('setCurrentConnection', currentConnection);
        this.dispatch('getBlobList');
        return;
      }

      console.warn(`Can't find connection with currentConnectionId`);
    },
  },
};

export default new Vuex.Store<RootState>(store);
