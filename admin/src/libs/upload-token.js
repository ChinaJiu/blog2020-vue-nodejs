const qiniu = require('qiniu')

// 自己可以到"www.qiniu.com" 申请自己的七牛空间
const ACCESS_KEY = "ZsPkzlIFxLoQu2Y0PX6IznYEsCjFvKnPUA-TW1IN";
const SECRET_KEY = "Kj83oDLoxIAhN4_Gt1FD1msslyUxb5LD01EY1vcW";
const bucket = 'admin-blog';

export default async function getUploadToken() {
  return new Promise((resolve, reject) => {
    let mac = new qiniu.auth.digest.Mac(ACCESS_KEY, SECRET_KEY);
    let options = {
      scope: bucket,
      expires: 7200
    };
    let putPolicy = new qiniu.rs.PutPolicy(options);
    let uploadToken = putPolicy.uploadToken(mac);

    if (uploadToken) {
      resolve({
        token: uploadToken
      })
    } else {
      reject()
    }
  })
}

