// import jwtDecode from "jwt-decode";
import router from "@/router";
import {
  gethotplaceList,
  getRecommendhotplaceList,
  showhotplaceDetail,
  writehotplace,
  writehotplaceFile,
  modifyhotplace,
  deletehotplace,
  recommendhotplace,
} from "@/api/hotplace";
// import http from "@/api/http.js";
const hotplaceStore = {
  namespaced: true,
  state: {
    sort: "hotplace_no",
    pgno: "1",
    key: "",
    word: "",
    hotplaces: null,
    recList: null, // 유저가 추천한 핫플 리스트
    hotplace: {
      title: "",
      content: "",
      address: "",
      userId: "",
    },
    hotTop3: null,
    navigation: null,
  },
  getters: {
    checkhotplaces: function (state) {
      return state.hotplaces;
    },
  },
  mutations: {
    SET_SORT: (state, sort) => {
      state.sort = sort;
    },
    SET_PGNO: (state, pgno) => {
      state.pgno = pgno;
    },
    SET_KEY: (state, key) => {
      state.key = key;
    },
    SET_WORD: (state, word) => {
      state.word = word;
    },
    SET_HOTPLACES: (state, hotplaces) => {
      state.hotplaces = hotplaces;
    },
    SET_RECOMMENDLIST: (state, recList) => {
      state.recList = recList;
    },
    SET_HOTPLACE: (state, hotplace) => {
      state.hotplace = hotplace;
    },
    SET_HOTTOP3: (state, hotTop3) => {
      state.hotTop3 = hotTop3;
    },
    SET_NAVIGATION: (state, navigation) => {
      state.navigation = navigation;
    },
  },
  actions: {
    async gethotplaces({ commit }, { search }) {
      console.log(search);
      await gethotplaceList(
        { search },
        ({ data }) => {
          commit("SET_SORT", data.sort);
          commit("SET_PGNO", data.pgno);
          commit("SET_KEY", data.key);
          commit("SET_WORD", data.word);
          commit("SET_HOTTOP3", data.top3);
          commit("SET_HOTPLACES", data.list);
          commit("SET_NAVIGATION", data.navigation);
          console.log("3. getUsersInfo data >> ", data);
        },
        async (error) => {
          console.log(
            "gethotplaces() error code [] ::: ",
            error.response.status
          );
        }
      );
    },
    async getRecommendhotplaces({ commit }, userId) {
      await getRecommendhotplaceList(
        userId,
        ({ data }) => {
          commit("SET_RECOMMENDLIST", data.list);
          console.log("3. getUsersInfo data >> ", data);
        },
        async (error) => {
          console.log(
            "gethotplaces() error code [] ::: ",
            error.response.status
          );
        }
      );
    },
    async gethotplace({ commit }, hotplaceNo) {
      console.log(hotplaceNo);
      await showhotplaceDetail(
        hotplaceNo,
        ({ data }) => {
          commit("SET_HOTPLACE", data.hotplace);
          console.log("3. gethotplace data >> ", data);
        },
        async (error) => {
          console.log(
            "gethotplaces() error code [] ::: ",
            error.response.status
          );
        }
      );
    },
    async write({ commit, dispatch }, hotplace) {
      // let decodeToken = jwtDecode(token);
      // console.log("회원정보수정중2");
      // console.log("5. modifyUserInfo() decodeToken :: ", decodeToken);
      console.log(hotplace);
      await writehotplace(
        hotplace,
        async ({ data }) => {
          console.log(data);
          commit("SET_HOTPLACE", data);
        },
        async (error) => {
          console.log(
            "writehotplace() error code [] ::: ",
            error.response.status
          );
          //   commit("SET_IS_VALID_TOKEN", false);
          //   await dispatch("tokenRegeneration");
        }
      );
    },
    async writeFile({ commit, dispatch }, formData) {
      // let decodeToken = jwtDecode(token);
      // console.log("회원정보수정중2");
      // console.log("5. modifyUserInfo() decodeToken :: ", decodeToken);
      console.log(formData);
      await writehotplaceFile(
        formData,
        async ({ data }) => {
          const hotplace = {
            title: "",
            address: "",
          };
          commit("SET_HOTPLACE", hotplace);
          const search = {
            sort: "hotplace_no",
            pgno: "1",
            key: "",
            word: "",
          };
          await dispatch("gethotplaces", { search });
        },
        async (error) => {
          console.log(
            "writehotplaceFile() error code [] ::: ",
            error.response.status
          );
          //   commit("SET_IS_VALID_TOKEN", false);
          //   await dispatch("tokenRegeneration");
        }
      );
    },
    async modify({ commit, dispatch }, hotplace) {
      // let decodeToken = jwtDecode(token);
      // console.log("회원정보수정중2");
      // console.log("5. modifyUserInfo() decodeToken :: ", decodeToken);
      console.log(hotplace);
      await modifyhotplace(
        hotplace,
        ({ data }) => {
          if (data.message === "success") {
            commit("SET_hotplace", data.hotplace);
            // console.log("3. getUserInfo data >> ", data);
          } else {
            console.log("유저 정보 없음!!!!");
          }
        },
        async (error) => {
          console.log(
            "modifyhotplace() error code [토큰 만료되어 사용 불가능.] ::: ",
            error.response.status
          );
          //   commit("SET_IS_VALID_TOKEN", false);
          //   await dispatch("tokenRegeneration");
        }
      );
    },
    async deleteH({ state, commit, dispatch }, hotplaceNo) {
      // let decodeToken = jwtDecode(token);
      // console.log("회원정보수정중2");
      // console.log("5. modifyUserInfo() decodeToken :: ", decodeToken);
      console.log(hotplaceNo);
      await deletehotplace(
        hotplaceNo,
        async ({ data }) => {
          console.log(data);
          if (data.message === "success") {
            const hotplace = {
              title: "",
              address: "",
            };
            commit("SET_HOTPLACE", hotplace);
            const search = {
              sort: "hotplace_no",
              pgno: state.pgno,
              key: state.key,
              word: state.word,
            };
            await dispatch("gethotplaces", { search }); // 삭제 후 게시글 목록으로 이동
          } else {
            console.log("핫플 정보 없음!!!!");
          }
        },
        async (error) => {
          console.log(error);
          console.log(
            "delete hotplace() error code [] ::: "
            // error.response.status
          );
        }
      );
    },
    async recommend({ state, commit, dispatch }, { param }) {
      console.log(param);
      await recommendhotplace(
        { param },
        async ({ data }) => {
          const search = {
            sort: state.sort,
            pgno: state.pgno,
            key: state.key,
            word: state.word,
          };
          await dispatch("gethotplaces", { search }); // 게시글 다시 불러오기
          console.log("recommend hotplace>> ", param);
        },
        async (error) => {
          console.log(
            "recommend hotplace error code [] ::: ",
            error.response.status
          );
        }
      );
    },
  },
};

export default hotplaceStore;
