import {getConfig} from "../actions/getConfig";
import ApplySelectedCursor from "./Cursors/ApplySelectedCursor";

Array.prototype.current = 0;
Array.prototype.next = function () {
    return this[++this.current];
};
Array.prototype.prev = function () {
    return this[--this.current];
};
Array.prototype.cycle = function (str) {
    const i = this.indexOf(str);
    if (i === -1) return undefined;
    return this[(i + 1) % this.length];
};
const startRotator = () => {
    try{
    chrome.alarms.getAll( (alarms) => {
        var hasAlarm = alarms.some(function(a) {
            return a.name == "rotationTime";
        });
        if(hasAlarm){
            chrome.alarms.clear("rotationTime")
        }

            getConfig().then(({rotator}) => {
                if(rotator.status && rotator.type == 'time') {
                    chrome.alarms.create("rotationTime", {periodInMinutes: (rotator.value / 60) });
                }
            });

    })
    } catch (e) {
    }
};
const stopRotator = () => {
    chrome.alarms.getAll((alarms) => {
        var hasAlarm = alarms.some(function (a) {
            return a.name == "rotationTime";
        });
        if (hasAlarm) {
            chrome.alarms.clear("rotationTime")
        }
    })
};

const FindCursorPack = ({collections: collections, packId: packId, size: size}) => {
    return new Promise( (resolve, reject) => {
        let pack = null;
        for (const coll of collections) {
            const pack = coll.items.find((item) => item.id === packId);
            if (pack) {
                if (!pack.cursor.originalPath) {
                    pack.cursor.originalPath = pack.cursor.path;
                }
                if (!pack.pointer.originalPath) {
                    pack.pointer.originalPath = pack.pointer.path;
                }
                resolve(pack)
                break;
            } else {
            }
        }
        reject(pack)
    })
}
const NextCursorPack = () => {
    getConfig().then(({favorites, selected, collection, size}) => {
        const favoritePack = favorites.cycle(selected.id)
        FindCursorPack({collections: Object.values(collection), packId: favoritePack}).then((p) => {
                ApplySelectedCursor(p, size)
            }
        )
    }).catch(e => {
        /*console.log(e)*/
    });


}
const counterTab =  (tabId, changeInfo, tab) => {
    try {
        if (changeInfo && changeInfo.status == 'complete' && tab.status == 'complete') {
            getConfig().then(({counterTab, rotator}) => {
                if(rotator.status && rotator.type == 'request') {
                    if (!Number.isInteger(parseInt(counterTab))) {
                        counterTab = 0;
                    }
                    if(rotator.value > parseInt(counterTab)) {
                        NextCursorPack();
                        chrome.storage.local.set({
                            counterTab: 0
                        })
                    }
                    chrome.storage.local.set({
                        counterTab: parseInt(counterTab)+1
                    })
                }
            });
        }

    } catch (e) {

    }
};

export {startRotator, stopRotator, counterTab, NextCursorPack}
