{
	"path": "techniques",
	"posts_index": [
		{
			"id": 0,
			"slug": "orientation",
			"title": "Technique: Orientation",
			"tags": [
				"Blind",
				"Low vision",
				"Motor impairment",
				"Custom stylesheet",
				"Perceivable",
				"Data tables",
				"CSS"
			]
		},
		{
			"id": 1,
			"slug": "identify-input-purpose",
			"title": "Technique: Identify input purpose",
			"tags": [
				"Cognitive",
				"Keyboard",
				"Inputs",
				"Perceivable",
				"CSS"
			]
		},
		{
			"id": 2,
			"slug": "reflow",
			"title": "Technique: Reflow",
			"tags": [
				"Cognitive",
				"Attention deficit disorder",
				"Custom stylesheet",
				"Perceivable",
				"Alternatives",
				"CSS"
			]
		}
	],
	"posts": [
		{
			"id": 0,
			"title": "Technique: Orientation",
			"body": "<p>Content does not restrict its view and operation to a single display orientation, such as portrait or landscape, unless a specific display orientation is essential (i.e., bank check).</p>\n<p><img alt=\"Responsive design illustration\" src=\"//static.projects.iq.harvard.edu/files/styles/os_files_large/public/responsive-design-layout.png?m=1534632895&amp;itok=kT1WhfCq\" title=\"Responsive design examples\"></p>\n<p><sup>(Source: <a href=\"https://affinitybridge.com/blog/responsive-design-for-your-website\" title=\"\">Affinity Bridge on responsive design</a>)</sup></p>\n<p>\n\t<!--break-->\n</p>\n<div class=\"os-example\">\n<h3 class=\"os-expandable\">Examples</h3>\n<div class=\"os-sectionExpandable\" aria-hidden=\"true\" id=\"expandable-Badexamplelettheuser13f06bee\">\n<h4>✗ Bad example: let the user determine how best to access content</h4>\n<p>Non-responsive design forces users to make compromises, use extra time and exert additional effort to access information. And, in cases where users have mobility or other physical limitations, the information may be completely inaccessible.</p>\n<p><img alt=\"Screen capture of a non responsive HTML table\" height=\"541\" src=\"//static.projects.iq.harvard.edu/files/styles/os_files_large/public/accessibility-sandbox/files/1-3-4_6.png?m=1544705117&amp;itok=kkhYNGE9\" title=\"\" width=\"570\"></p>\n<p><sup>(Source: <a href=\"https://css-tricks.com/responsive-data-tables/\" title=\"\">CSS-TRICKS article on responsive tables</a>)</sup></p>\n<h4>✓ Good example: adopt a responsive front-end framework</h4>\n<p><img alt=\"Screen capture of a responsive HTML table\" src=\"//static.projects.iq.harvard.edu/files/styles/os_files_xxlarge/public/accessibility-sandbox/files/1-3-4_7.png?m=1545847572&amp;itok=PJImP5cY\" style=\"width:350px; height:619px\" title=\"\"></p>\n<p><sup>(Source: <a href=\"https://css-tricks.com/responsive-data-tables/\" title=\"\">CSS-TRICKS article on responsive tables</a>)</sup></p>\n<p>Use \"responsive design\" principles (CSS @media queries) to detect if the screen is smaller than the maximum width of the table. If it is, the table gets reformatted, by\n</p>\n<ol>\n<li>Hiding the table headers (although still accessible by screen readers)</li>\n<li>Creating a new column with table headers placed in table rows.</li>\n<li>Displaying the content of each row within a single column</li>\n</ol>\n<h5>HTML table:</h5>\n<pre><code>\n&lt;table&gt;\n &lt;thead&gt;\n  &lt;tr&gt;\n   &lt;th&gt;First Name&lt;/th&gt;\n   &lt;th&gt;Last Name&lt;/th&gt;\n   &lt;th&gt;Job Title&lt;/th&gt;\n  &lt;/tr&gt;\n &lt;/thead&gt;\n &lt;tbody&gt;\n  &lt;tr&gt;\n   &lt;td&gt;James&lt;/td&gt;\n   &lt;td&gt;Matman&lt;/td&gt;\n  &lt;td&gt;Chief Sandwich Eater&lt;/td&gt;\n  &lt;/tr&gt;\n  &lt;tr&gt;\n   &lt;td&gt;The&lt;/td&gt;\n   &lt;td&gt;Tick&lt;/td&gt;\n   &lt;td&gt;Crimefighter Sorta&lt;/td&gt;\n  &lt;/tr&gt;\n &lt;/tbody&gt;\n&lt;/table&gt;\n</code></pre>\n<h5><code>CSS:</code></h5>\n<pre><code>/* \nGeneric Styling, for Desktops/Laptops \n*/\ntable { \n  width: 100%; \n  border-collapse: collapse; \n}\n/* Zebra striping */\ntr:nth-of-type(odd) { \n  background: #eee; \n}\nth { \n  background: #333; \n  color: white; \n  font-weight: bold; \n}\ntd, th { \n  padding: 6px; \n  border: 1px solid #ccc; \n  text-align: left; \n}</code></pre>\n<h5>CSS for setting every table-related element to be block-level, then for each \"cell\", use CSS generated content (:before) to apply the column header to label the content originally shown in each row:</h5>\n<p>/* Max width will take effect for any screen smaller than 760px and also iPads specifically. */</p>\n<pre><code>\n@media\nonly screen and (max-width: 760px),\n(min-device-width: 768px) and (max-device-width: 1024px) {\n\n /* Force table to not be like tables anymore */\n  table, thead, tbody, th, td, tr {\n    display: block;\n    }\n\n/* Hide table headers (but not display: none;, for accessibility) */\nthead tr {\nposition: absolute;\ntop: -9999px;\nleft: -9999px;\n}\n\ntr { border: 1px solid #ccc; }\n\ntd {\n/* Behave like a \"row\" */\nborder: none;\nborder-bottom: 1px solid #eee;\nposition: relative; padding-left: 50%;\n}\n\ntd:before {\n/* Now like a table header */\nposition: absolute;\n/* Top/left values mimic padding */\ntop: 6px;\nleft: 6px;\nwidth: 45%;\npadding-right: 10px;\nwhite-space: nowrap;\n}\n\n/* Label the data */\ntd:nth-of-type(1):before { content: \"First Name\"; }\ntd:nth-of-type(2):before { content: \"Last Name\"; }\ntd:nth-of-type(3):before { content: \"Job Title\"; }\ntd:nth-of-type(4):before { content: \"Favorite Color\"; }\ntd:nth-of-type(5):before { content: \"Wars of Trek?\"; }\ntd:nth-of-type(6):before { content: \"Secret Alias\"; }\ntd:nth-of-type(7):before { content: \"Date of Birth\"; }\ntd:nth-of-type(8):before { content: \"Dream Vacation City\"; }\ntd:nth-of-type(9):before { content: \"GPA\"; }\ntd:nth-of-type(10):before { content: \"Arbitrary Data\"; }\n}</code></pre>\n</div>\n</div>"
		},
		{
			"id": 1,
			"title": "Technique: Identify input purpose",
			"body": "<p>Make it easier for people to complete input fields requesting personal information. People with mobility issues have difficulty entering data into the fields. People with cognitive disabilities may have difficulty remembering details. It may be hard for them to enter personal information due to memory loss, dyslexia, or other impairments.</p>\n<p>Developers should use autocomplete on fields that collect personal data to explicitly identify the data type. Use the list of <a href=\"https://www.w3.org/TR/html52/sec-forms.html#sec-autofill\">Input Purposes for User Interface Components</a> to select the correct value. Turn off autocomplete for sensitive information.\n</p>\n<p><sup>(Source: <a href=\"https://knowbility.org/blog/2018/WCAG21-135InputPurpose/\">Knowbility article on input purpose</a>)</sup></p>\n\n<p>\n\t<!--break-->\n</p>\n\n<div class=\"os-example\">\n\t<h3 class=\"os-expandable\">Examples</h3>\n\n\t<div class=\"os-sectionExpandable\" aria-hidden=\"true\" id=\"expandable-Badexamplethebrowser108912a3\">\n<h4>✗ Bad example: the browser does not offer to complete the form</h4>\n<p>When mouse is used to select fields without autocomplete, the browser does not offer to complete the form.</p>\n<p><img alt=\"Screen capture of an input form that is not auto filled\" src=\"//static.projects.iq.harvard.edu/files/styles/os_files_xxlarge/public/accessibility-sandbox/files/1-3-5_1.png?m=1545850956&amp;itok=KiNy5fll\" style=\"width:400px; height:171px\"></p>\n<p><sup>(Source: <a href=\"https://knowbility.org/blog/2018/WCAG21-135InputPurpose/\">Knowbility article on input purpose</a>)</sup></p>\n<h4>✓ Good example: the browser offers to complete the form</h4>\n<p>Since the autocomplete attribute has been added on the fields, the browser offers to enter the data.</p>\n<p><img alt=\"Screen capture of an input form that is auto filled\" src=\"//static.projects.iq.harvard.edu/files/styles/os_files_xxlarge/public/accessibility-sandbox/files/1-3-5_3.png?m=1545851227&amp;itok=sMO-jnJc\" style=\"width:400px; height:64px\"></p>\n<p><sup>(Source: <a href=\"https://knowbility.org/blog/2018/WCAG21-135InputPurpose/\">Knowbility article on input purpose</a>)</sup></p>\n</div>\n</div>"
		},
		{
			"id": 2,
			"title": "Technique: Reflow",
			"body": "<p>\n\tUse responsive design to allow your content to zoom and respond to various screen sizes.\n</p>\n\n<p>\n\tPresent content without loss of information or functionality, and without requiring scrolling in two dimensions, except for parts of the content which require two-dimensional layout for usage or meaning.\n</p>\n\n<p>\n\tExamples of content which require two-dimensional layout are images, maps, diagrams, video, games, presentations, data tables, and interfaces where it is necessary to keep toolbars in view while manipulating content.\n</p>\n\n<p>\n\t<sup>(Source: <a href=\"https://affinitybridge.com/blog/responsive-design-for-your-website\">Knowbility article on Reflow</a>)</sup><!--break--> \n</p>\n\n<div class=\"os-example\">\n\t<h3 class=\"os-expandable\">Examples</h3>\n\n\t<div class=\"os-sectionExpandable\" aria-hidden=\"true\" id=\"expandable-Badexampleincreasing297bbf18\"><h4>\n\t\t✗ Bad example: increasing the size of the view requires horizontal scroll\n\t</h4><p>\n\t\tWhen zoomed, the page requires both vertical and horizontal scrolling to access information. \n\t</p><p>\n\t\t<img alt=\"Screen capture of non responsive content\" src=\"https://static.projects.iq.harvard.edu/files/styles/os_files_xxlarge/public/accessibility-sandbox/files/1-4-10_2.png?m=1545855446&amp;itok=I-datsmG\" style=\"width:600px; height:223px\"></p><p>\n\t\t<sup>(Source: <a href=\"https://www.washington.edu/accesscomputing/AU/before.html\">Accessible University by University of Washington</a>)</sup></p><h4>\n\t\t✓ Good example: increasing the size of the view doesn't require horizontal scroll\n\t</h4><p>\n\t\tThis web site is zoomed from 100% to 400%. When zoomed, the page has a vertical arrangement for scrolling in one direction, up and down, to access information. \n\t</p><p>\n\t\tThe navigation menu across the top collapses into a menu button in the upper right as the screen size diminishes.\n\t</p><p>\n\t\t<img alt=\"Screen capture of responsive content\" src=\"https://static.projects.iq.harvard.edu/files/styles/os_files_xxlarge/public/accessibility-sandbox/files/1-4-10_1.png?m=1545854542&amp;itok=efaWLpDj\" style=\"width:600px; height:130px\"></p><p>\n\t\t<sup>(Source: <a href=\"https://affinitybridge.com/blog/responsive-design-for-your-website\">Knowbility article on Reflow</a>)</sup></p></div></div>"
		}
	]
}
