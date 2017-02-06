import { Encrypt, Decrypt } from './aes.js';
import md5 from 'md5';
import $ from 'jquery';
const USER_TOKEN='';
const signkey='635D04C273EF49C343581715FB0D44BB';
const API=`http://121.12.92.65:9001/api/admin`;


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
    login:(_params,_success,_error)=>{
        let _p={"action":"login","user_name":_params.userName,"password":_params.password};
        var obj={'params':Tools._pars(_p), 'sign':Tools.sign(_p)};
        _request('POST',API,_succ=>{
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
                _success({result:succ.msg,status:false});
                UserModel.clearToken();
            }else if(succ.code=='1006'){
                _success({result:succ.msg,status:false});
                UserModel.clearToken();
            }else{
                _success({result:succ.msg,status:false});
            }
        },err=>{
            _error(err);
        },obj);
    }
};
let AdviceModel={
    adviceList:(_params,_success,_error)=>{
        let _p={"action":"getFeedBackList","page":_params.page,"limit":_params.pagesize};
        SettingModel.fetchData(_p,_success,_error);
    },
    adviceDetail:(_params,_success,_error)=>{
        let _p={"action":"getFeedBackDetail","feedback_id":_params.id};
        SettingModel.fetchData(_p,_success,_error);
    },
    adviceDele:(_params,_success,_error)=>{
        let _ps= {"action":"delFeedBacks","feedback_id_arr":`[${_params.ids}]`};
        SettingModel.fetchData(_ps,_success,_error);
    }
};

let LogModel={
    ActionList:(_params,_success,_error)=>{
        let _p=  {"action":"getOperationLogs","page":_params.page,"limit":_params.pagesize,"user_name":_params.username,"begin_time":_params.startTime,"end_time":_params.endTime, "modular":_params.modular};
        SettingModel.fetchData(_p,_success,_error);
    },
    ModularList:(_success,_error)=>{
        let _p=  {"action":"getConfig"};
        SettingModel.fetchData(_p,_success,_error);
    },
    MsgList:(_params,_success,_error)=>{
        let _p={"action":"getSmsLogs","page":_params.page,"limit":_params.pagesize,"mobile":_params.mobile,"user_name":_params.username,"content":_params.content,"begin_time":_params.startTime,"end_time":_params.endTime, "status":_params.status};
        SettingModel.fetchData(_p,_success,_error);
    }
};


let MemberModel={
    MemberList:(_params,_success,_error)=>{
        let _p=   {"action":"getAdminList","page":_params.page,"limit":_params.pagesize,"mobile":_params.mobile,"admin_name":_params.adminname,"real_name":_params.realname};
        SettingModel.fetchData(_p,_success,_error);
    },
    MemberDetail:(_params,_success,_error)=>{
        let _p=   {"action":"getAdminDetail","admin_id":_params.id};
        SettingModel.fetchData(_p,_success,_error);
    },
    MemberAdd:(_params,_success,_error)=>{
        let _p=   {"action":"addAdmin","admin_name":_params.adminname,"real_name":_params.realname,"mobile":_params.mobile,"password":_params.pwd};
        SettingModel.fetchData(_p,_success,_error);
    },
    MemberModify:(_params,_success,_error)=>{
        let _p=   {"action":"editAdmin","admin_id":_params.id,"real_name":_params.realname,"mobile":_params.mobile,"password":_params.pwd,"status":_params.status};
        SettingModel.fetchData(_p,_success,_error);
    },
    MemberDele:(_params,_success,_error)=>{
        let _p=   {"action":"editAdmin","admin_id":_params.id,"status":_params.status};
        SettingModel.fetchData(_p,_success,_error);
    }
};

let ArticleModel={
    ArticleList:(_params,_success,_error)=>{
        let _p={"action":"getPageCategoryLists","page":_params.page,"limit":_params.pagesize,"title":_params.title};
        SettingModel.fetchData(_p,_success,_error);
    },
    ArticleModify:(_params,_success,_error)=>{
        let _p={"action":"editPageCategory","cate_id":_params.ids,"title":_params.title,"status":_params.status,"order_number":_params.order_number!=undefined?_params.order_number:""};
        SettingModel.fetchData(_p,_success,_error);
    },
    ALists:(_params,_success,_error)=>{
        let _p={"action":"getPageListByCateId","title":_params.title,"page":_params.page,"limit":_params.pagesize,"cate_id":_params.id};
        SettingModel.fetchData(_p,_success,_error);
    },
    Adele:(_params,_success,_error)=>{
        let _p= {"action":"editPage","page_id":_params.ids,"status":"2"};
        SettingModel.fetchData(_p,_success,_error);
    },
    addListSort:(_params,_success,_error)=>{
        let _p=  {"action":"addPageCategory","title":_params.title};
        SettingModel.fetchData(_p,_success,_error);
    },
    addArticleSort:(_params,_success,_error)=>{
        let _p=  {"action":"editPage","title":_params.title,"page_cate":_params.ids};
        SettingModel.fetchData(_p,_success,_error);
    }
};
export {UserModel,AdviceModel,LogModel,MemberModel,ArticleModel}