function parseXML(inputId, outputId) {
	const xml = document.getElementById(inputId).value;

	const parser = new DOMParser();
	const xmlDoc = parser.parseFromString(xml, "text/xml");
console.log(xmlDoc)
	//document.getElementById(outputId).innerHTML = xmlDoc.getElementsByTagName("title")[0].childNodes[0].nodeValue;
}