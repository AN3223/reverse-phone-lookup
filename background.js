function parseNumber(string) {
    return string.replace(/\D/g, "")
}

function prepareURL(url, phoneNumber) {
    return url + encodeURI(parseNumber(phoneNumber))
}

function parsePrepareAndGo(url, info) {
    url = prepareURL(url, info.selectionText)
    browser.tabs.create({ url })
}

function createChild(name, url, onclick) {
    if (!onclick) {
        onclick = (info) => parsePrepareAndGo(url, info)
    }
    return browser.contextMenus.create(
        {
            id: name.toLowerCase(),
            title: name,
            parentId: "reverse-phone-lookup",
            onclick
        }
    )
}

browser.contextMenus.create(
    {
        id: "reverse-phone-lookup",
        title: "Reverse Phone Lookup",
        contexts: ["selection"],
        icons: {
            64: "phone.png"
        }
    }
)

createChild("TruePeopleSearch", "https://www.truepeoplesearch.com/results?phoneno=")
createChild("WhitePages", "https://www.whitepages.com/phone/")
createChild("AnyWho", "https://www.anywho.com/phone/")
