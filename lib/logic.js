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
		} else if (entry.querySelector('[name="ProductList"]')) {
			const amount = entry.querySelector('[name="ProductList"]').childElementCount;
			IDs.push(`ProductList (${amount} entries) [${entries.indexOf(entry)}]`);
		} else if (entry.querySelector('[name="Currency"]')) {
			IDs.push(entry.querySelectorAll('[name="Currency"]')[1].getAttribute("value"));
		} else if (entry.querySelector('[name="ProceduralProductCategory"]')) {
			IDs.push(`ProcProd: ${entry.querySelector('[name="ProceduralProductCategory"]').getAttribute("value")}`);
		} else if (entry.querySelector('[name="Group"]')) {
			IDs.push(`ProcTech: ${entry.querySelector('[name="Group"]').getAttribute("value")}`);
		} else if (entry.querySelector('[name="Reward"]')) {
			IDs.push(`${entry.querySelector('[name="Reward"]').getAttribute("value")} [${entries.indexOf(entry)}]`);
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

	document.getElementById(outputId).innerHTML = '';

	for (let i = 0; i < Object.keys(data).length; i++) {
		const itemId = Object.keys(data)[i];
		const chance = Object.values(data)[i] / (Object.values(data).reduce((a, b) => parseFloat(a) + parseFloat(b), 0) / 100);

		const output = `<div>${i + 1}.</div><div>${itemId}</div><div>${chance.toFixed(3)}%</div>`;
		document.getElementById(outputId).insertAdjacentHTML("beforeend", output);
	}
	document.getElementById(outputId).style.display = '';
}