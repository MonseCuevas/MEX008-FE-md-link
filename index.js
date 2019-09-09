const fs = require('fs');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function urlExists(url){ 
  var http = new XMLHttpRequest();

  http.open('HEAD', url, false);
  http.send();

  return http.status;
}

module.exports
 = (path, options) => {
  return new Promise((resolve, reject) => {
    try{
      const md = fs.readFileSync(path).toString();
      const regex = /\[([\w|\s]+)\]\((\S+)\)/g;
      const regex2 = /\[([\w|\s]+)\]\((\S+)\)/;
      var urls = md.match(regex);

      let objetos = urls.map(item => {
        let registro = item.match(regex2);
        let result;
        let status_result = urlExists(registro[2]);
        let ok_result = status_result === 200 ? "ok" : "fail";

        if(options !== undefined){
          if(options.validate){
            result = {href: registro[2], text: registro[1], file: path, status: status_result, ok: ok_result}
          }else{
            result = {href: registro[2], text: registro[1], file: path}
          }
        }else{
          result = {href: registro[2], text: registro[1], file: path}
        }

        return result;
      });

      resolve(objetos);
    }catch(error){
      reject(Error(error));
    }
  });
};