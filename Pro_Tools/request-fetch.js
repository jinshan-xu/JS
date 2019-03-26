import util from './util';

import config from '../config/common.js';

function request(options) {
    return fetch(options.url);
}

function _fetch(...params) {
    const _params = [...params];
    _params[0] = config.httpURL + (this.serverType || '') + _params[0];
    return fetch(..._params);
}

function _checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {     
        return {
            response: response,
            json: function () {
                return { statusText: response.statusText };
            },
        };
    }
}

// 接口返回数据适配器
/**
 * {
 *   data:Any,
 *   meta:{
 *      code:Number,
 *      desc:String,
 *      timestamp:Number
 *   }
 * }
 */
function formatReturnData(res) {
    const responseData = res;

    const statusMap = {
        '402': 502, 
        '200': 1, 
    };

    const returnData = {
        data: responseData.data,
        meta: {
            code: statusMap[responseData.status] || responseData.status,
            desc: responseData.msg,
            timestamp: responseData.time,
        },
    };
    return returnData;
}

/**
 * 
 */
function checkAuthStatus(res) {
    throw new Error("验证失败");
}

function _parseJSON(response) {
    return response.json();
}

function _processFectch(fetchHandle) {
    return fetchHandle
        .then(_checkStatus)
        .then(_parseJSON)
        .then(formatReturnData)   
}

request.get = function (options) {
    var url = options.url;
    if (typeof options.data === 'object' && options.data != null) {
        url += '?' + util.serialize(options.data);
    }
    var handle = _fetch.call(this, url, {
        headers: {
            ...options.headers,
        },
    });
    return _processFectch(handle);
};

request.post = function (options) {
    var handle = _fetch.call(this, options.url, {
        method: 'POST',
        body: util.serialize(options.data),
        headers: {
            ...options.headers,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
    return _processFectch(handle);
};

request.postJSON = function (options) {
    var handle = _fetch.call(this, options.url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...options.headers
        },
        body: JSON.stringify(options.data),
    });
    return _processFectch(handle);
};

request.getAuth = function () {
    return new Promise(resolve => {
        const userInfo = util.getLocalStorage('_user_info_') || {};
        if (userInfo.token) {
            resolve(userInfo);
        }
        else{
            resolve({})
        }
    });
};

request.tokenProcess = request.getAuth();

request.tokenProcess.then(info => {
    if (info.token) {
        //TODO        
    }
});

request.authRequest = function (options) {
    // TODO
    const userinfo = util.getLocalStorage('_ydbus_info') || {};
    options.headers = {
        ...options.headers,
        ...userinfo
    };
    if (/post/i.test(options.method)) {
        return this.postJSON(options);
    } else {
        return this.get(options);
    }
};

export default request;
