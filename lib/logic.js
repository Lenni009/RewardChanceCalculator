function parseXML(inputId, outputId) {
	const xml = document.getElementById(inputId).value;

	if (!xml) return;

	const parser = new DOMParser();
	const xmlDoc = parser.parseFromString(xml, "text/xml");

	const entries = Array.from(xmlDoc.querySelectorAll('[value="GcRewardTableItem.xml"]'));

	const IDs = [];
	const chances = [];
	const rewards = [];

	for (const entry of entries) {
		const ID = entry.querySelector('[name="ID"]');
		if (ID) {
			IDs.push(ID.getAttribute("value"));
		} else if (entry.querySelector('[name="ProductList"]')) {
			const amount = entry.querySelector('[name="ProductList"]').childElementCount;
			IDs.push(`List (${amount} entries)`);
		} else if (entry.querySelector('[name="Items"]')) {
			const amount = entry.querySelector('[name="Items"]').childElementCount;
			IDs.push(`List (${amount} entries)`);
		} else if (entry.querySelector('[name="ProductIds"]')) {
			const amount = entry.querySelector('[name="ProductIds"]').childElementCount;
			IDs.push(`List (${amount} entries)`);
		} else if (entry.querySelector('[name="Currency"]')) {
			IDs.push(entry.querySelectorAll('[name="Currency"]')[1].getAttribute("value"));
		} else if (entry.querySelector('[name="ProceduralProductCategory"]')) {
			IDs.push(`ProcProd: ${entry.querySelector('[name="ProceduralProductCategory"]').getAttribute("value")}`);
		} else if (entry.querySelector('[name="Group"]')) {
			IDs.push(`ProcTech: ${entry.querySelector('[name="Group"]').getAttribute("value")}`);
		} else if (entry.querySelector('[name="TechId"]')) {
			IDs.push(entry.querySelector('[name="TechId"]').getAttribute("value"));
		} else if (entry.querySelector('[name="Event"]')) {
			IDs.push(entry.querySelector('[name="Event"]').getAttribute("value"));
		} else if (entry.querySelector('[name="Reward"]')) {
			IDs.push(entry.querySelector('[name="Reward"]').getAttribute("value"));
		} else {
			IDs.push("Error");
		}

		const chance = entry.querySelector('[name="PercentageChance"]');
		if (chance) {
			chances.push(chance.getAttribute("value"));
		} else {
			chances.push("Error");
		}

		const reward = entry.querySelector('[name="Reward"]');
		if (reward) {
			rewards.push(reward.getAttribute("value"));
		} else {
			rewards.push("Error");
		}
	}

	if (!(IDs.length === chances.length && IDs.length === rewards.length)) {
		console.log("ERROR");
		document.getElementById(outputId).style.display = 'block';
		document.getElementById(outputId).innerText = "[ERROR: Array length doesn't match] Something went wrong. Please send the Reward Id to Lenni#4423 on Discord.";
		return;
	}

	document.getElementById(outputId).innerHTML = '';

	for (let i = 0; i < IDs.length; i++) {
		const itemId = IDs[i];
		const chance = chances[i] / (chances.reduce((a, b) => parseFloat(a) + parseFloat(b), 0) / 100);
		const reward = rewards[i];

		const output = `<div>${i + 1}.</div><div>${reward}</div><div>${itemId}</div><div>${chance.toFixed(3)}%</div>`;
		document.getElementById(outputId).insertAdjacentHTML("beforeend", output);
	}


	if (entries.length > 0) {
		document.getElementById(outputId).style.display = '';
	} else {
		document.getElementById(outputId).style.display = 'none';
	}
}