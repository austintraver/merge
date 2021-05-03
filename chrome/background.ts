
// @ts-ignore
const promisify = (fn, ...args) => new Promise(resolve => fn(...args, resolve));

const mergeWindows = async () => {
	let [currentWindow, ...tabs] = await Promise.all([
		promisify(chrome.windows.getCurrent),
		promisify(chrome.tabs.query, {
			currentWindow: false,
			windowType: 'normal'
		}), promisify(chrome.tabs.query, {
			currentWindow: false,
			windowType: 'popup'
		})
	])

	// @ts-ignore
	tabs = Array.prototype.concat.apply([], tabs)

	// @ts-ignore
	await promisify(chrome.tabs.move, tabs.map(tab => tab.id), {
		// @ts-ignore
		windowId: currentWindow.id,
		index: -1
	})

	for (const tab of tabs) {
		// @ts-ignore
		if (tab.pinned) {
			// @ts-ignore
			chrome.tabs.update(tab.id, {pinned: true})
		}
	}
}
chrome.browserAction.onClicked.addListener(mergeWindows);
