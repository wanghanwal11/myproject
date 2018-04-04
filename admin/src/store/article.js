/**
 * Created by bk on 2017/5/31.
 */
export default {
    state: {
        articleauthor: "",
        articletitle: "",
        articlecontent: "",
        id: "",
        def1: '',
        sendArticle: ''
    },
    mutations: {
        updateAuthor (state,author) {
            state.articleauthor = author;
        },
        updateTitle (state,title) {
            state.articletitle = title;
        },
        updateContent (state,content) {
            state.articlecontent = content;
        },
        updateId (state,id) {
            state.id = id;
        },
        updateDef1(state,def1) {
            state.def1 = def1;
        }
        ,
        updateSendArticle(state,sendArticle) {
            state.sendArticle = sendArticle;
        }
    }
}