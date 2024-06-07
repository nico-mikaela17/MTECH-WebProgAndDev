class StringUtils {
	capitalize(str) {
		return str.replace(/.+?[\.\?\!](\s|$)/g, (txt) => {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		});
	 }

	format(formatString) {
		/*Should format a string replacing placeholders.
		e.g.:
			format("I love {0}", "soccer") -> I love soccer
			format("I love {0}, it is {1}.", "soccer", "fun") -> I love soccer, it is fun.
		 */
	 }

};