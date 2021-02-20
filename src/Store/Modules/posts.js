/* eslint-disable */
import Vue from 'vue';

const posts = {
    namespaced: true,
    state:{
         homePosts: null,
         post: null
    },
    getters:{
          getAllPosts(state){
                return state.homePosts;
          },
          getPost(state){
                return state.post;
          }
    },
    mutations:{
        getAllPosts(state,posts){
         state.homePosts = posts;
        },
        getPost(state,post){
           state.post = post
        },
        clearPost(state){
           state.post = null
        }
    },
    actions:{
       getAllPosts({commit},payload){
               Vue.http.get(`posts.json?orderBy="$key"&limitToLast=${payload.limit}`)
               .then( response => response.json())
               .then( response => {
                   const posts = [];
                   for(let key in response){
                       posts.push({
                           ...response[key],
                           id: key
                        })
                   }
                   commit("getAllPosts",posts.reverse())
               })
       },
       getPost({commit},payload){
           Vue.http.get(`posts.json?orderBy="$key"&equalTo="${payload}"`)
           .then( response => response.json())
           .then( response =>{
               let post = {}
               for(let key in response){
                   post = {
                       ...response[key]
                   }
               }
               commit("getPost",post)
            })
       }
    }
}

export default posts;