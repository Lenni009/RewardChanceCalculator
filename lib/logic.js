function parseXML(inputId, outputId) {
	const xml = document.getElementById(inputId).value;

	const parser = new DOMParser();
	const xmlDoc = parser.parseFromString(xml, "text/xml");

	const entries = Array.from(xmlDoc.querySelectorAll('[value="GcRewardTableItem.xml"]'));

	const IDs = [];
	const chances = [];

	for (const entry of entries) {
		const ID = entry.querySelector('[name="ID"]');
		if (ID) {
			IDs.push(ID.getAttribute("value"));
		} else {
			IDs.push(`Error ${entries.indexOf(entry)}`);
		}

		const chance = entry.querySelector('[name="PercentageChance"]');
		if (chance) {
			chances.push(chance.getAttribute("value"));
		} else {
			chances.push(`Error ${entries.indexOf(entry)}`);
		}
	}

	const data = {};

	for (let i = 0; i < IDs.length; i++) {
		data[IDs[i]] = chances[i];
	}

	for (let i = 0; i < Object.keys(data).length; i++) {
		const itemId = Object.keys(data)[i];
		const chance = Object.values(data)[i] / (Object.values(data).reduce((a, b) => a + b, 0) / 100);

		const output = `<div>${itemId}</div><div>${parseFloat(chance)}%</div>`;
		document.getElementById(outputId).insertAdjacentHTML("beforeend", output);
	}
	document.getElementById(outputId).style.display = '';
}