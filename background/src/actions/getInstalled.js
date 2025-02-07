const getInstalled = async () => {
    chrome.storage.local.get(['collection', 'version', 'uid'], ({collection, version, uid}) => {
        return {
            collections: collection,
            version: version,
            uid: uid,
            action: 'get_installed_collection'
        };
    });
}

export {getInstalled}
