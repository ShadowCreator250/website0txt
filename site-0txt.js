// Define the FULL name of your *.txt file here, please.:
//var file_name = "txt.txt";
var dev_tst_mode = 1;
/*
		default is "0".
		set this to "1" for way more output in the console.(warning: it's a lot of output!!!)
		set this to "2" for some tests (require 3 <p></p> tags with tose id's: "tst1", "tst2" and "tst3").
*/
var leave_content = 0;
/*
	set this to "-1" to leave the content that is already in the #outputArea (default).
	set this to "0" to overwrite the content that is already in the #outputArea.
*/


/* <---Don't touch this code in case you know what you're doing!---> */
// Step 1: get the text from the text file
function insertText(file_name, outputAreaID) {
if (file_name.includes(".txt", 1)) {

var txt; //var for text from text file
var xhr = new XMLHttpRequest(); //get text file
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				console.info("Ajax XMLHttpRequest succeed!");

if (dev_tst_mode == 1) {
				console.log("Textfile text (in function): ");
				console.log(xhr.responseText);
};
				txt = xhr.responseText; //write text from text file in var


// Step 2: Split the text of every Object on "/n" and "\n"(normal line splitter = every line of the *.txt file) and stick them together with "<BR>"

				txt = txt.replace("/n","<BR>");
				txt = txt.replace(/(?:\r\n|\r|\n)/g, '<br>');

// replace ä, Ä, ö, Ö, ü, Ü, ß, &, <, > with the specific Unicode
				txt = txt.replace(/&/g,"&amp;");
				txt = txt.replace(/ä/g,"&auml;");
				txt = txt.replace(/Ä/g,"&Auml;");
				txt = txt.replace(/ö/g,"&ouml;");
				txt = txt.replace(/Ö/g,"&Ouml;");
				txt = txt.replace(/ü/g,"&uuml;");
				txt = txt.replace(/Ü/g,"&Uuml;");
				txt = txt.replace(/ß/g,"&szlig;");
				txt = txt.replace(/\$\$sc/g,"&nbsp;");
				// realizing code blocks
				txt = txt.replace(/\$\$</g,"&lt;")
				txt = txt.replace(/\$\$>/g,"&gt;")


if (dev_tst_mode == 1) {
				console.log( "txt: " );
				console.log( txt );
};


// Step 8: The Outputter:

			var outputArea = document.getElementById(outputAreaID);
			var outputText = "";
			outputText = outputArea.innerHTML;
			/**/
			if (leave_content == -1) {
				outputArea.innerHTML = outputText + txt;
			}
			else {
				outputArea.innerHTML = txt;
			};



// Back to Step 1: Error-responces and complete XMLHttpRequest (open and send request)

console.info("Outputting all the text is done.");

			} // end of "if (xhr.status == 200) {"

			else if (xhr.status == 404) {
				alert("Error 404! File not found!  \n Cotact the admin and/or look in the console!");
				console.error("Error 404! File not found!");
			}
			else {
				alert("There is an error!  \n Cotact the admin and/or look in the console!");
				console.error("Error number: " + xhr.status + " !")
			}; //some Error-responces if something went wrong with the XMLHttpRequest

		}; // end of "if (xhr.readyState == 4) {"

	}; // end of "xhr.onreadystatechange = function() {"

	xhr.open("get", file_name , true);
	xhr.send();

} //end of "if (file_name.includes(".txt", 1)) {"
else {
	alert("The text file is no *.txt file! Please use a *.txt file or contact the admin!");
	console.error("The Request failed because the text file is no *.txt file!\nPlease use a *.txt file or contact the admin!");
};
};
