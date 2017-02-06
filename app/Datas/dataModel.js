import { Encrypt, Decrypt } from './aes.js';
import md5 from 'md5';
import $ from 'jquery';
const USER_TOKEN='user_token';
const signkey='635D04C273EF49C343581715FB0D44BB';
const API=`http://121.12.92.65:9001/api/admin`;
const goobleApi="http://121.12.92.65:9001/";
let Tools = {
    checkStates: function (response) {
        if(response.ok){
            return response
        }else{
            let error = new Error(response.statusText);
            error.state = response.status;
            error.response = response;
            throw error;
        }
    },
    parseJSON:function (response) {
        return response.json();
    },
    _getSearchFromObject:function(param) {
        if(param == null) return '';
        let _search = '?';
        for (let key in param) {
            _search += `${key}=${encodeURIComponent(param[key])}&`
        }
        return _search.slice(0, -1);
    },
    parStr:function(_params){
        let _p='';
        let newObj=Object.keys(_params).sort();
        newObj.map((item,index)=>{
            _p+=`${item}=${_params[item]}&`;
        });
        return _p.slice(0, -1);
    },
    sign:function(_params){
        return md5(`${signkey}&${this.parStr(_params)}&${signkey}`).toUpperCase();
    },
    _pars:function(_par){
        return encodeURIComponent(Encrypt(_par));
    },
    url:function(_par){
        return `${API}params=${this._pars(_par)}&sign=${this.sign(_par)}`;
    }
};

/**
 * fetch请求数据Model
 * @param _method
 * @param _api
 * @param _params
 * @param _onSuccess
 * @param _onError
 * @private
 */


function _request(_method,_api,_onSuccess,_onErr,_obj){
    let _options = {
        headers:{
             'Accept':'application/json',
             'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    $.ajax({
        url:_api,
        type:_method,
        dataType:'json',
        data:_obj,
        success:function(data){
            _onSuccess(data);
        },
        error:function(data){
            _onErr(data);
        }
    });

}
const USER_NAME="user_name";

let UserModel = {
    storeToken:(token)=>{
        var tk=JSON.parse(Decrypt(token));
        localStorage.setItem(USER_TOKEN,tk.token);
    },
    fetchToken:()=>{
        return localStorage.getItem(USER_TOKEN);
    },
    clearToken:()=>{
        localStorage.removeItem(USER_TOKEN);
    },
    storeUserName:(uname)=>{
        localStorage.setItem(USER_NAME,uname);
    },
    fetchUserName:()=>{
        return localStorage.getItem(USER_NAME);
    },
    login:(_params,_success,_error)=>{
        let _p={"action":"login","user_name":_params.userName,"password":_params.password};
        var obj={'params':Tools._pars(_p), 'sign':Tools.sign(_p)};
        _request('POST',API,_succ=>{
            UserModel.storeUserName(_params.userName);
            if(_succ.code=='1000'){
                if(_succ.result!=""){
                    UserModel.storeToken(_succ.result);
                    _success(true);
                }else{
                    _success(false);
                }
            }else{
                _success(false);
            }
        },_error,obj);
    }
};

let SettingModel={
    fetchData:(_params,_success,_error)=>{
        var obj={'params':Tools._pars(_params), 'sign':Tools.sign(_params),'token':encodeURIComponent((UserModel.fetchToken()))};
        //console.log(obj);
        _request('POST',API,succ=>{
            //console.log(succ);
            if(succ.code=='1000'){
                if(succ.result!=""){
                    _success({result:JSON.parse(Decrypt(succ.result)),status:true});
                }else{
                    _success({result:'',status:true});
                }
            }else if(succ.code=='1005'){
                _success({result:"登录超时，请重新登录",status:false});
                UserModel.clearToken();
                location.hash="/login";
            }else if(succ.code=='1006'){
                _success({result:"重复登录，请退出重新登录",status:false});
                UserModel.clearToken();
                location.hash="/login";
            }else{
                _success({result:succ.msg,status:false});
            }
        },err=>{
            _error(err,'error');
        },obj);
    }
};

export {SettingModel,UserModel,goobleApi}