const addCollection = async ({slug, item}) => {
    chrome.storage.local.get(['collection', 'version', 'uid'], ({collection, version, uid}) => {
        if (Object.prototype.hasOwnProperty.call(collection, slug)) {
            collection[slug] = item;
        } else {
            collection[slug] = item;
        }
        chrome.storage.local.set({collection: collection}, () => {
            return {
                status: true,
                version: version,
                uid: uid,
                action: 'install_collection'
            }
        });
    });
}

export {addCollection}
