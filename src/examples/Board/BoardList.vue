<script setup>
import { ref } from "vue";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import MaterialButton from "@/components/MaterialButton.vue";
// import MaterialSwitch from "@/components/MaterialSwitch.vue";
import { computed } from "vue";
import { useStore } from "vuex";
import http from "@/api/http.js";

const router = useRouter();
const store = useStore();

//검색에 필요한 pgno, key, word
// const search = reactive({
//   type: computed(() => store.state.boardStore.type),
//   pgno: "1",
//   key: "",
//   word: "",
// });
const selectedItem = reactive({
  type: computed(() => store.state.boardStore.type),
  sort: store.state.boardStore.sortName,
  pgno: "1",
  key: "",
  word: "",
});
const sortValue = ref({
  기본: "article_no",
  추천수: "recommendation",
  댓글수: "comment",
  조회수: "hit",
  작성일: "date",
});
const keyValue = ref({
  제목: "subject",
  작성자: "username",
  내용: "content",
});

const sortItems = ref(["기본", "추천수", "댓글수", "조회수", "작성일"]);
const searchItems = ref(["제목", "작성자", "내용"]);

// getUsers로 받은 데이터 맵
// const map = ref("");
const navigation = computed(() => store.state.boardStore.navigation);
const articles = computed(() => store.state.boardStore.boards);

// const showTime = computed(() => map.users.user);
// getUsers();
// //회원 목록 가져오는 함수
// async function getUsers() {
//   console.log(search);
//   await http.get(`/admin/users`, search).then(({ data }) => {
//     map = data;
//     console.log(map.navigation.navigator);
//   });
// }

//한글 입력 바인딩 처리
function changeWord(e) {
  selectedItem.word = e.target.value;
  console.log(selectedItem);
}
// 회원 검색
async function searchBoard() {
  const search = {
    type: selectedItem.type,
    sort: sortValue.value[selectedItem.sort],
    pgno: selectedItem.pgno,
    key: keyValue.value[selectedItem.key],
    word: selectedItem.word,
  };
  if (search.key == undefined) search.key = "";
  await store.dispatch("boardStore/getBoards", { search });
}
//게시글 상세보기
async function detail(articleNo) {
  console.log(articleNo);
  await store.dispatch("boardStore/getBoard", articleNo);
  await store.dispatch("commentStore/getComments", articleNo);
  router.push("/board/detail");
}
//페이지 이동
async function pageClick(pgno, key) {
  console.log(pgno, key);
  console.log(navigation.value.startRange);
  if (key == "before") {
    if (navigation.value.startRange) {
      pgno = 1;
    } else pgno = pgno - 1;
  }
  if (key == "next") {
    if (!navigation.value.endRange) {
      pgno = pgno + 1;
    }
  }
  // search.pgno = pgno;
  selectedItem.pgno = pgno;
  console.log(selectedItem);
  const search = {
    type: selectedItem.type,
    sort: sortValue.value[selectedItem.sort],
    pgno: selectedItem.pgno,
    key: keyValue.value[selectedItem.key],
    word: selectedItem.word,
  };
  if (search.key == undefined) search.key = "";
  console.log(search);
  await store.dispatch("boardStore/getBoards", { search });
}
//글작성
function writeBoard() {
  router.push("/board/write");
}

//마우스 커서 바꾸기
function changeCursor() {
  document.body.style.cursor = "pointer";
}

function restoreCursor() {
  document.body.style.cursor = "auto";
}
function showTime(date) {
  const year = date.substring(0, 4);
  const month = date.substring(5, 7);
  const day = date.substring(8, 10);
  if (
    year == store.state.boardStore.now.year &&
    month == store.state.boardStore.now.month &&
    day == store.state.boardStore.now.day
  ) {
    return date.substring(10, date.length - 3);
  } else {
    return date.substring(0, 10);
  }
}
</script>
<template>
  <div class="container" data-aos="fade-up">
    <div class="row no-gutters" style="background-color: white">
      <div class="text-center">
        <h3 class="my-5 fw-bold">여행정보공유</h3>
        <!-- <div class="row w-75 mx-auto mb-3">
          <div class="col-md-2 m-0" v-if="store.state.userStore.isLogin">
            <button
              id="btn-search"
              class="btn btn-success"
              type="button"
              v-on:click="writeBoard"
            >
              글쓰기
            </button>
          </div>
          <div class="col-md-3"></div>
          <div class="col-md-7 m-0">
            <form
              class="d-flex justify-content-center"
              id="form-search"
              @submit.prevent
            >
              <select
                v-model="search.key"
                id="key"
                class="form-select form-select-sm ms-5 me-1 w-50"
                aria-label="검색조건"
              >
                <option selected>검색조건</option>
                <option value="subject">제목</option>
                <option value="username">작성자</option>
                <option value="content">내용</option>
              </select>
              <div
                class="input-group input-group-sm justify-conent-center"
                style="width: 300px"
              >
                <input
                  type="text"
                  :value="search.word"
                  @input="changeWord"
                  id="word"
                  class="form-control border border-dark mr-3"
                  placeholder="검색어..."
                />
                <button
                  id="btn-search"
                  class="btn btn-success"
                  type="button"
                  v-on:click="searchBoard()"
                >
                  검색
                </button>
              </div>
            </form>
          </div>
        </div> -->
        <div class="row m-0">
          <div
            class="col-lg-2 offset-lg-1"
            v-if="store.state.userStore.isLogin"
          >
            <button
              id="btn-search"
              class="btn btn-success"
              type="button"
              v-on:click="writeBoard"
            >
              등록
            </button>
          </div>
          <!-- <div class="col-lg-3"></div> -->
          <div class="col-lg-5 offset-lg-3 align-self-end">
            <div class="row">
              <div class="col-lg-3 m-0 p-0">
                <v-select
                  v-model="selectedItem.sort"
                  :items="sortItems"
                  label="정렬 기준"
                  required
                  @input="searchBoard"
                ></v-select>
              </div>
              <div class="col-lg-3 m-0 p-0">
                <v-select
                  v-model="selectedItem.key"
                  :items="searchItems"
                  label="검색 조건"
                  required
                ></v-select>
              </div>
              <div class="col-lg-6">
                <form
                  class="d-flex justify-content-center"
                  id="form-search"
                  @submit.prevent
                >
                  <!-- <input type="hidden" name="pgno" value="1" /> -->
                  <!-- <select
                    v-model="search.key"
                    id="key"
                    class="form-select form-select-sm mr-5 w-20"
                    aria-label="검색조건"
                  >
                    <option selected>검색조건</option>
                    <option value="title">장소</option>
                    <option value="username">작성자</option>
                    <option value="content">내용</option>
                  </select> -->
                  <div
                    class="input-group input-group-sm justify-conent-center"
                    style="width: 300px"
                  >
                    <input
                      type="text"
                      :value="selectedItem.word"
                      @input="changeWord"
                      id="word"
                      class="form-control border border-dark"
                      placeholder="검색어..."
                    />
                    <v-btn
                      color="green-darken-1"
                      class="mx-3"
                      v-on:click="searchBoard()"
                    >
                      검색
                    </v-btn>
                    <!-- <button
                  id="btn-search"
                  class="btn btn-primary"
                  type="button"
                  v-on:click="searchHotPlace()"
                >
                  검색
                </button> -->
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <table class="table table-hover w-75 m-auto mb-3">
          <colgroup>
            <col width="15%" />
            <col width="40%" />
            <col width="15%" />
            <col width="10%" />
            <col width="10%" />
            <col width="10%" />
          </colgroup>
          <thead class="table-success">
            <tr>
              <th>글번호</th>
              <th>제목</th>
              <th>작성자</th>
              <th>조회수</th>
              <th>추천수</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody id="articleinfo">
            <tr v-for="(article, index) in articles" :key="article.articleNo">
              <!-- <td v-text="index + 1"></td> -->
              <td
                v-text="
                  index + 1 + (selectedItem.pgno - 1) * navigation.countPerPage
                "
              ></td>
              <td
                @mouseover="changeCursor"
                @mouseout="restoreCursor"
                v-on:click="detail(article.articleNo)"
                class="text-left"
              >
                <div class="d-inline">
                  <span v-if="article.isnotice" class="font-weight-bold"
                    >[공지]</span
                  >
                  {{ article.subject }}&nbsp;
                </div>
                <div class="d-inline text-danger">[{{ article.comment }}]</div>
              </td>
              <td v-text="article.userName"></td>
              <td v-text="article.hit"></td>
              <td v-text="article.recommendation"></td>
              <td>{{ showTime(article.date) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <ul class="pagination justify-content-center">
        <li class="page-item">
          <a href="#" class="page-link" v-on:click="pageClick('1', 'first')"
            >처음</a
          >
        </li>
        <li class="page-item">
          <a
            href="#"
            class="page-link"
            v-on:click="pageClick(navigation.navigator[0], 'before')"
            >이전</a
          >
        </li>
        <li
          v-for="(page, index) in navigation.navigator"
          :key="index"
          class="page-item"
        >
          <a
            href="#"
            class="page-link bg-success text-white"
            v-on:click="pageClick(page, '')"
            v-if="page == navigation.currentPage"
            >{{ page }}</a
          >
          <a
            href="#"
            class="page-link"
            v-on:click="pageClick(page, '')"
            v-if="page != navigation.currentPage"
            >{{ page }}</a
          >
        </li>
        <li class="page-item">
          <a
            href="#"
            class="page-link"
            v-on:click="
              pageClick(
                navigation.navigator[navigation.navigator.length - 1],
                'next'
              )
            "
            >다음</a
          >
        </li>
        <li class="page-item">
          <a
            href="#"
            class="page-link"
            v-on:click="pageClick(navigation.totalPageCount, 'last')"
            >끝</a
          >
        </li>
      </ul>
      <!-- <div v-html="navigation.navigator"></div> -->
    </div>
  </div>
  <!-- <form id="form-param" method="get" action="">
    <input type="hidden" name="pgno" id="pgno" :value="search.pgno" />
    <input type="hidden" name="key" :value="search.key" />
    <input type="hidden" name="word" :value="search.word" />
  </form> -->
  <!-- <form id="form-no-param" method="get">
    <input type="hidden" name="pgno" id="pgno" :value="search.pgno" />
    <input type="hidden" name="key" :value="search.key" />
    <input type="hidden" name="word" :value="search.word" />
    <input type="hidden" id="userid" name="userId" value="" />
  </form> -->
</template>
