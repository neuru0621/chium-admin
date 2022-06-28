import myAxios from "@/api";

const method = "post";

export default {

  insertNote({ rootState , noteDetails}) {
    const userId = rootState.auth.userId;
    const url = "api/admin/common/sp_admin_insert_note";
    let data = {
      params: JSON.stringify([
        {
          ADMIN_ID : userId,
          NOTE_DETAILS : [noteDetails]
        },
      ]),
    };
    console.log(noteDetails)
    return myAxios(url, method, data);
  },



  // 유저의 인덱스의 값

};









