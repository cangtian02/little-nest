import ajax from 'isomorphic-fetch';

let fetch = url => {
  return new Promise((resolve, reject) => {
    ajax(url).then(res => res.json()).then(res => {
      resolve(res);
    }).catch(error => {
      reject(error);
    });
  });
}

export default fetch;
