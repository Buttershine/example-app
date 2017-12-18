var axios = require('axios');

export function getRequest(url){
  return axios.get(url);
}

function getUserInfo(username){
  return axios.get('https://api.github.com/users/' + username);
}

var helpers = {
  getGithubInfo: function(username){
    return axios.all([getTicker(), getUserInfo(username)])
      .then(function(arr){
        return {
          repos: arr[0].data,
          bio: arr[1].data
        }
      })
  }
}