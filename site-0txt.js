/**
 *
 *	default is "0".
 *	set this to "1" for way more output in the console.(warning: it's a lot of output!!!)
 *	set this to "2" for some tests (require 3 <p></p> tags with those id's: "tst1", "tst2" and "tst3").
 */
var dev_tst_mode = 0;

/* <---Don't touch this code in case you know what you're doing!---> */
/**
 * The main function
 * @param {String} file_name - the name of the file with the *.txt ending
 * @param {String} outputAreaID - the id of the html element where the content should go
 * @param {Boolean} leave_content - set to 'true' if the content in the output area should be left and not replaced
 */
function insertText(file_name, outputAreaID, leave_content) {
	if (file_name.includes(".txt", 1)) {

		// Step 1: get the text from the text file

		var txt; //var for text from text file
		var xhr = new XMLHttpRequest(); //get text file
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4) {
				if (xhr.status == 200) {
					console.info("Ajax XMLHttpRequest succeed!");

					if (dev_tst_mode == 1) {
						console.log("raw text in text file:");
						console.log(xhr.responseText);
					};
					txt = xhr.responseText; //write text from text file in var

					// Step 2: Split the text of every Object on "/n" and "\n"(normal line splitter = every line of the *.txt file) and stick them together with "<BR>"

					txt = txt.replace("/n", "<BR>");
					txt = txt.replace(/(?:\r\n|\r|\n)/g, '<br>');

					// replace ä, Ä, ö, Ö, ü, Ü, ß, &, <, > with the specific HTML chars
					txt = txt.replace(/&/g, "&amp;");// &
					txt = txt.replace(/ä/g, "&auml;");// ä
					txt = txt.replace(/Ä/g, "&Auml;");// Ä
					txt = txt.replace(/ö/g, "&ouml;");// ö
					txt = txt.replace(/Ö/g, "&Ouml;");// Ö
					txt = txt.replace(/ü/g, "&uuml;");// ü
					txt = txt.replace(/Ü/g, "&Uuml;");// Ü
					txt = txt.replace(/ß/g, "&szlig;");// ß
					txt = txt.replace(/\$\$sc/g, "&nbsp;");//space chars
					// realizing code blocks
					txt = txt.replace(/\$\$</g, "&lt;")// <
					txt = txt.replace(/\$\$>/g, "&gt;")// >

					if (dev_tst_mode == 1) {
						console.log("txt: ");
						console.log(txt);
					};

					// Step 3: The Outputter:

					var outputArea = document.getElementById(outputAreaID);
					var outputText = "";
					outputText = outputArea.innerHTML;
					/**/
					if (leave_content === true) {
						outputArea.innerHTML = outputText + txt;
					} else {
						outputArea.innerHTML = txt;
					};



					// Back to Step 1: Error-responses and complete XMLHttpRequest (open and send request)

					console.info("Outputting all the text is done.");

				} // end of "if (xhr.status == 200) {"
				else if (xhr.status == 404) {
					alert("Error 404! File not found!  \n Contact the admin and/or look in the console!");
					console.error("Error 404! File not found!");
				} else {
					alert("There is an error!  \n Contact the admin and/or look in the console!");
					console.error("Error number: " + xhr.status + " !")
				}; //some Error-responses if something went wrong with the XMLHttpRequest

			}; // end of "if (xhr.readyState == 4) {"

		}; // end of "xhr.onreadystatechange = function() {"

		xhr.open("get", file_name, true);
		xhr.send();

	} //end of "if (file_name.includes(".txt", 1)) {"
	else {
		alert("The text file is no *.txt file! Please use a *.txt file or contact the admin!");
		console.error("The Request failed because the text file is no *.txt file!\nPlease use a *.txt file or contact the admin!");
	};
};