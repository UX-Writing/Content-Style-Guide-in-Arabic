// export default function slugify(string) {
//   return string
//     .toString() // Cast to string
//     .toLowerCase() // Convert the string to lowercase letters
//     .trim() // Remove whitespace from both sides of a string
//     .replace(/\s/g, '-') // Replace each space with -
//     .replace(
//       /[^\w\-\u00b4\u00C0-\u00C3\u00c7\u00C9-\u00CA\u00CD\u00D3-\u00D5\u00DA\u00E0-\u00E3\u00E7\u00E9-\u00EA\u00ED\u00F3-\u00F5\u00FA]+/g,
//       '',
//     ); // Removes all chars that aren't words, -, ´ or some latin characters (À Á Â Ã Ç É Ê Í Ó Ô Õ Ú à á â ã ç é ê í ó ô õ ú)
// }

// slug but keep Arabic letters
export default function slugify(string) {
	return (
		string
			.toString() // Cast to string
			.toLowerCase() // Convert the string to lowercase letters
			.trim() // Remove whitespace from both sides of a string
			.replace(/\s/g, "-") // Replace each space with -
			.replace(/[(|)|]/g, "") // Replace each brackets ")(" with nothing
			.replace(/[؟]/g, "") // Replace each question mark? with nothing
			.replace(/[،]/g, "") // Replace each question mark? with nothing
			// keep Arabic letters ا ب ت ث ج ح خ د ذ ر ز س ش ص ض ط ظ ع غ ف ق ك ل م ن ه و ي
      // .replace(/[A-Za-z[ء-يًٌٍَُِّ]+/, '')
	);
}
