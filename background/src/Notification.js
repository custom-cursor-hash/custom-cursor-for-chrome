Array.prototype.current = 0;
Array.prototype.next = function () {
    return this[++this.current];
};
Array.prototype.prev = function () {
    return this[--this.current];
};

const initAlarm = () => {
    chrome.alarms.create("noSleep", {periodInMinutes: 1});
    chrome.alarms.onAlarm.addListener(fetchDataNotification);
    checkAlarm()
}


const fetchDataNotification =  (alarm) => {}

function checkAlarm() {

}

export {initAlarm, checkAlarm, fetchDataNotification}
