/*import { Cookie, CookieJar } from 'tough-cookie';

const CookieManager: any = new CookieJar();

const useWebKit = true;

//const clearAll = () => CookieManager.clearAll(useWebKit)

//const clear = (name: string, uri: string = 'https://cloud.spamigor.ru') => CookieManager.clearByName(uri, name, useWebKit)

const get = (uri: string = 'https://cloud.spamigor.ru') => CookieManager.getCookies(uri)

const newCookie = {
	domain: 'https://cloud.spamigor.ru',
	path: '/',
	version: '1',
	expires: (new Date(Number(new Date()) + 1000 * 60 * 60 * 24 * 3)).toISOString()
};

const set = (name: string, value: string, uri: string = 'https://cloud.spamigor.ru/') => {
    CookieManager.setCookies(`${name}=${value}`, uri)
    // CookieManager.set(uri, {...newCookie, name, value}, useWebKit)
}

export default {
    set,
    get
}*/