const getConfig =  () => {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get( (items) => {
            if (chrome.runtime.lastError) {
                return reject(chrome.runtime.lastError);
            }
            resolve(items);
        });
    });
}

const getRotator =  () => {
    /* eslint-disable */
    return new Promise((resolve, reject) => {
        /* eslint-disable */
        chrome.storage.local.get(['rotator'], ({rotator}) => {
            /* eslint-disable */
            if (chrome.runtime.lastError) {
                /* eslint-disable */
                return reject(chrome.runtime.lastError);
            }
            resolve(rotator);
        });
    });
}
const setConfig = (data) => {
    return new Promise((resolve, reject) => {
        try {
            chrome.storage.local.set(data, function() {
                resolve({
                    status: true,
                    data: data
                });
            });
        } catch (ex) {
            reject(ex);
        }
    });


}
export {getConfig, setConfig, getRotator}
