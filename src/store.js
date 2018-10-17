import Vue from 'vue'
import Vuex from 'vuex'
import {
	RECORD_ADDRESS,
	ADD_CART,
	REDUCE_CART,
	INIT_BUYCART,
	CLEAR_CART,
	RECORD_SHOPDETAIL,
	RECORD_USERINFO,
	GET_USERINFO,
	CONFIRM_REMARK,
	CONFIRM_INVOICE,
	CHOOSE_SEARCH_ADDRESS,
	SAVE_GEOHASH,
	CONFIRM_ADDRESS,
	CHOOSE_ADDRESS,
	NEED_VALIDATION,
	SAVE_CART_ID_SIG,
	SAVE_ORDER_PARAM,
	CHANGE_ORDER_PARAM,
	ORDER_SUCCESS,
	SAVE_SHOPID,
	SAVE_ORDER,
	OUT_LOGIN,
	RETSET_NAME,
	SAVE_AVANDER,
	SAVE_ADDRESS,
	SAVE_ADDDETAIL,
	SAVE_QUESTION,
	ADD_ADDRESS,
	BUY_CART,
} from './vuex/mutation-types.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: null, // 用户信息
    login: true, // 是否登录
    geohash: '31.22299,121.36025',//地址geohash值
    latitude: '', // 当前位置纬度
    longitude: '', // 当前位置经度
  },
  mutations: {
    // 记录用户信息
    [RECORD_USERINFO](state, info) {
      state.userInfo = info;
      state.login = true;
      setStore('user_id', info.user_id);
    },
    //保存geohash
    [SAVE_GEOHASH](state, geohash) {
      state.geohash = geohash;
    },
    // 记录当前经度纬度
    [RECORD_ADDRESS](state, {
      latitude,
      longitude
    }) {
      state.latitude = latitude;
      state.longitude = longitude;
    },
  },
  getters: {
    latitude: state => state.latitude,
    longitude: state => state.longitude
  },
  actions: {

  }
})
