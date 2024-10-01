import Store from "beedle";
import { get, post } from "./requests.ts";

let _saveUrl: any;
let _onPost: any;
let _onLoad: any;

const store = new Store({
  actions: {
    setData(context: any, data: any, saveData?: any) {
      context.commit("setData", data);
      if (saveData) this.save(data);
    },

    load(context: any, { loadUrl, saveUrl, data, saveAlways }: any) {
      _saveUrl = saveUrl;
      const saveA = saveAlways || saveAlways === undefined;
      context.commit("setSaveAlways", saveA);
      if (_onLoad) {
        _onLoad().then((x: any) => {
          if (data && data.length > 0 && x.length === 0) {
            data.forEach((y: any) => x.push(y));
          }
          this.setData(context, x);
        });
      } else if (loadUrl) {
        get(loadUrl).then((x: any) => {
          if (data && data.length > 0 && x.length === 0) {
            data.forEach((y: any) => x.push(y));
          }
          this.setData(context, x);
        });
      } else {
        this.setData(context, data);
      }
    },

    create(context: any, element: any) {
      const { data, saveAlways } = context.state;
      data.push(element);
      this.setData(context, data, saveAlways);
    },

    delete(context: any, element: any) {
      const { data, saveAlways } = context.state;
      data.splice(data.indexOf(element), 1);
      this.setData(context, data, saveAlways);
    },

    deleteLastItem(context: any) {
      const { lastItem } = context.state;
      if (lastItem) {
        this.delete(context, lastItem);
        context.commit("setLastItem", null);
      }
    },

    resetLastItem(context: any) {
      const { lastItem } = context.state;
      if (lastItem) {
        context.commit("setLastItem", null);
        // console.log('resetLastItem');
      }
    },

    post(context: any) {
      const { data } = context.state;
      this.setData(context, data, true);
    },

    updateOrder(context: any, elements: any) {
      const { saveAlways } = context.state;
      const newData = elements.filter((x: any) => x && !x.parentId);
      elements
        .filter((x: any) => x && x.parentId)
        .forEach((x: any) => newData.push(x));
      this.setData(context, newData, saveAlways);
    },

    insertItem(context: any, item: any) {
      // console.log('insertItem', item);
      context.commit("setLastItem", item.isContainer ? null : item);
    },

    save(data: any) {
      if (_onPost) {
        _onPost({ task_data: data });
      } else if (_saveUrl) {
        post(_saveUrl, { task_data: data });
      }
    },
  },

  mutations: {
    setData(state: any, payload: any) {
      // eslint-disable-next-line no-param-reassign
      state.data = payload;
      return state;
    },
    setSaveAlways(state: any, payload: any) {
      // eslint-disable-next-line no-param-reassign
      state.saveAlways = payload;
      return state;
    },
    setLastItem(state: any, payload: any) {
      // eslint-disable-next-line no-param-reassign
      state.lastItem = payload;
      // console.log('setLastItem', payload);
      return state;
    },
  },

  initialState: {
    data: [],
    saveAlways: true,
    lastItem: null,
  },
});

store.setExternalHandler = (onLoad: any, onPost: any) => {
  _onLoad = onLoad;
  _onPost = onPost;
};

export default store;
