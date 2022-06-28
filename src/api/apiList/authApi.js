import myAxios from "@/api";

const method = "post";

export default {
  // 로그인 할 시 인풋으로 받는 아이디 비밀번호 값
  login({ adminId, adminPw }) {
    const url = "api/admin/common/admin_login";
    let data = {
      params: JSON.stringify([
        {
          ID: adminId,
          PW: adminPw,
        },
      ]),
    };
    return myAxios(url, method, data);
  },
  // 유저의 인덱스의 값
  chatRooms({ userId }) {
    const url = `${process.env.VUE_APP_CHAT_API}/get_chat_rooms`;
    let data = {
      params: JSON.stringify([
        {
          USER_ID: userId,
        },
      ]),
    };
    return myAxios(url, method, data);
  },
};
