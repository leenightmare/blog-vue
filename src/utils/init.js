export default {
    setLocalUserCommentInfo: ({ userNickName, userEmail, qqNum }) => {
        localStorage.setItem("commentUserInfo", JSON.stringify({ userNickName, userEmail, qqNum }));
    },

    getLocalUserCommentInfo: () => {
        let commentUserInfo = localStorage.getItem("commentUserInfo");
        return JSON.parse(commentUserInfo);
    },

    initCommentInfo(form) {
        let commentUser = this.getLocalUserCommentInfo();
        if (commentUser) {
            form.userNickName = commentUser.userNickName;
            form.userEmail = commentUser.userEmail;
            form.qqNum = commentUser.qqNum;
        }
    },
}