function parseXML(inputId, outputId) {
	const xml = document.getElementById(inputId).value;

	const parser = new DOMParser();
	const xmlDoc = parser.parseFromString(xml, "text/xml");

	const IDs = xmlDoc.querySelectorAll('[name="ID"]');
	const chances = xmlDoc.querySelectorAll('[name="PercentageChance"]');

	console.log(IDs, chances)

	const data = {};

	for (let i = 0; i < IDs.length; i++) {
		data[IDs[i].getAttribute("value")] = chances[i].getAttribute("value");
	}

	console.log(data)


	//document.getElementById(outputId).innerHTML = xmlDoc.getElementsByTagName("title")[0].childNodes[0].nodeValue;


	//const output = `<div>${itemId}</div><div>${chance}</div>`


}