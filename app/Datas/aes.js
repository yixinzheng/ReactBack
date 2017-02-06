import * as CryptoJS from 'crypto-js';
let AuthTokenKey = CryptoJS.enc.Latin1.parse("94D3329F20A751B6"); //AES密钥
let AuthTokenIv = CryptoJS.enc.Latin1.parse('94D3329F20A751B6'); //AES向量
//let AuthTokenIv = CryptoJS.enc.Latin1.parse('44912970DE5A09F5'); //AES向量

/*AES加密*/

export function Encrypt(data) {
    //let dataObj=CryptoJS.enc.Utf8.parse(data);//字符串解密
    //let dataObj=CryptoJS.enc.Utf8.parse(JSON.stringify(data));//对象解密
    let dataObj = JSON.stringify(data);
    let encrypted = CryptoJS.AES.encrypt(dataObj,AuthTokenKey, {
        iv: AuthTokenIv,
        mode: CryptoJS.mode.CBC,
        //padding: CryptoJS.pad.Pkcs7
        padding:CryptoJS.pad.ZeroPadding
    });
    return encrypted.toString();
}

/*AES解密*/
export function Decrypt(data) {
        let data2 = data.replace(/\s/gm, "").toString();
        let decrypted = CryptoJS.AES.decrypt(data2, AuthTokenKey, {
            iv: AuthTokenIv,
            mode: CryptoJS.mode.CBC,
            //padding: CryptoJS.pad.Pkcs7
            padding:CryptoJS.pad.ZeroPadding
        });
        var result=decrypted.toString(CryptoJS.enc.Utf8);
        return result;
}

