## P3 Peer Review

+ Reviewer's name: Curtis Wilcox
+ Reviwee's name: Jeremy C. Southgate
+ URL to reviewee's Github repo: *<https://github.com/jeremysouthgate/e28>*

*Answer the following questions in regards to the student's project you are reviewing. Include context and code examples in your answers when relevant.*


### Are you able to produce any errors or unexpected results?

- CollectionsMenu.vue produces an error in console, 'TypeError: "t.collection is undefined"'
- There's an error navigating to MmPlayer.vue, 'Error: Request failed with status code 404'. It looks like the failing request URL is <https://my-json-server.typicode.com/jeremysouthgate/e28/collections/18a67fb5>. Tracking this down is when I realized the version deployed to production does not match the source in the GitHub repo. In production, this component's mounted property includes:
```JavaScript
axios.get("https://my-json-server.typicode.com/jeremysouthgate/e28/collections/18a67fb5")
.then(function(response){
	alert(response.data);
});
```
- Going to a URL other than the home page results in an Apache 404 response but that is expected because we hadn't covered how to configure Apache to work with Vue routes before P3.

### Were there any parts of the interface that you found confusing or unclear?

- The navigation is in the footer, which is set to `top: 100vh` so the top of the footer is at the very end of the viewport and scrolling is always necessary to use it. If you want the footer to always be visible at the bottom of the viewport, one way to do that would be to change the #app height from `calc(100vh + 110px)` to just `100vh` and set the footer's top to `calc(100vh - 110px)`. 
- The link to the Collections component is called "Discover" instead of "Collections."
- The Collections component lists a track but it is not clickable. The only way to get to the Play component is to discover the Play link in the off-screen footer.
- The README doesn't mention you can click anywhere on the Play progress bar to jump to that point in the track; it's a nice feature that could be more discoverable.

### Are there aspects of the code that you feel were not self-evident and would benefit from comments?

There are very few comments. In NavBar.vue, the scroll_top method's name is clear and it's bound to a click in the template but it's not clear why it's necessary.

In CollectionsMenu.vue, response initially has a Number value but Axios overwrites it with an array; it would be better to use a placeholder that indicates what it will actually contain.
```JavaScript
data: function() {
        return {
            response: 123
        }
    },
```

### Are there any parts of the code that you found interesting or taught you something new?

- In main.js, I don't recall including `{ path: '*', redirect: '/'}` as a catch-all route, seems like a good idea.

### Are there any best practices discussed in course material that you feel were not addressed in the code?

- In the footer, the link to the current component has the router-link-exact-active router-link-active classes but no styling has been applied to differentiate it from the other links.

### Do you have any additional comments not covered in the above questions?

- Saving the playback position is a good use of localStorage, it would be especially useful for longer recordings like a live show not divided into tracks or a podcast.

- It's a good practice to use responsive design practices so a site is usable on other screens. The footer and the Play component work on smaller screens (though the large Play image doesn't fit the width on my iPhone in portrait orientation) but Home and Discover do not.

- In the MmPlayer.vue component, I don't know what div#response is for. I was confused because the div isn't in the template source on GitHub. Once I realized the production code was different and looked at the sourcemap from the production server, I saw the div was there; maybe it was for debugging Axios requests to the JSON server?

- Is there a reason why the MP3 is in a <video> element instead of the <audio> element? On the desktop, it seems to work the same, I don't know if the presence of the video element makes the browser do anything unnecessary related to the computer's video hardware. On the iPhone, Safari wants to play the "video" in a separate window but it doesn't work; I don't know if using the <audio> element would make it work.

### Accessibility

We weren't asked to consider the accessibility of projects but it's something I'm familiar with.

- Color contrast is generally good.
- Enlarged text looks okay (except on mobile devices where Home and Collections require scrolling at their default size).
- Default outlining has not been overridden so focus is visible when navigating by keyboard.

#### HomePage.vue
- It's best to use CSS for styling text instead of HTML elements like `<b>` and `<u>` (because it's easier for users to override CSS to meet their needs).

#### NavBar.vue
- The footer contains an `<h1>` element. Headings are useful semantics but there should not be more than one level 1 heading on display at the same time.
- Navigation is within a `<nav>` element.
- The link text indicates where the links go.
- Color contrast of #legal text (#BBB on #FFF) is way too low.
- Clicking the links scrolls window to the top of the viewport but focus remains at the bottom, on the clicked link; there is no non-visual indication the window content has changed.

#### MmPlayer.vue
- The buttons contain appropriate names as text.
- The playback time is readable by keyboard
- There isn't a keyboard equivalent to clicking on the progress bar to change the playback.
- The large image has no alt text. Only the image of text indicates what is being played.
