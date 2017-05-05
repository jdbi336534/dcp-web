import {
    baseUrl
} from './env'

export default async(type = 'GET', url = '', data = {}, method = 'fetch') => {
    type = type.toUpperCase();
    url = baseUrl + url;

    if (type === 'GET') {
        let dataStr = '';
        Object.keys(data).forEach(key => {
            dataStr += key + '=' + data[key] + '&';
        })

        if (dataStr !== '') {
            dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
            url = url + '?' + dataStr;
        }
    }

    if (window.fetch && method === 'fetch') {
        let requestConfig = {
            credentials: 'include',
            method: type,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            cache: 'force-cache'
        }

        if (type === 'POST') {
            Object.defineProperty(requestConfig, 'body', {
                value: JSON.stringify(data)
            })
        }
        if (type === 'PUT') {
            Object.defineProperty(requestConfig, 'body', {
                value: JSON.stringify(data)
            })
        }
        try {
            var response = await fetch(url, requestConfig);
            var responseJson = await response.json();
        } catch (error) {
            throw new Error(error);
        }
        if (responseJson.code === '200') {
            return responseJson.data;
        } else {
            console.log('请求出错，请联系管理员');
        }
    } else {
        let requestObj;

        requestObj = new XMLHttpRequest();

        let sendData = '';
        if (type === 'POST') {
            sendData = JSON.stringify(data);
        }

        requestObj.open(type, url, true);
        requestObj.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        requestObj.send(sendData);

        requestObj.onreadystatechange = () => {
            if (requestObj.readyState === 4) {
                if (requestObj.status === 200) {
                    let obj = requestObj.response
                    if (typeof obj !== 'object') {
                        obj = JSON.parse(obj);
                    }
                    if (obj.code === '200') {
                        return obj.data
                    } else {
                        console.log('请求出错，请联系管理员');
                    }
                    // return obj
                } else {
                    throw new Error(requestObj)
                }
            }
        }
    }
}
