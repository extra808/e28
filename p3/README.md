# Project 3
+ By: Curtis Wilcox
+ Production URL: <https://p3.dgmde28.cognize.org>

## Outline of features
- Home page lists posts and all tags found on posts
- Post pages list tags on that post
- Tag links go to page listing only posts with that tag
- Posts can be saved to localStorage for offline reading (and removed from localStorage)

## Outside resources
- Post content and tags from [Online Accessibility Techniques](https://accessibility.huit.harvard.edu/techniques)
- [JSON Editor Online](https://jsoneditoronline.org)
- [JSON Stringify Text](https://onlinetexttools.com/json-stringify-text)
- [Communication between sibling components in VueJs 2.0](https://stackoverflow.com/questions/38616167/communication-between-sibling-components-in-vuejs-2-0/47004242#47004242)

## Notes for instructor
- To test offline posts locally, save a post, return to home page, stop server, click on post link.
- To test offline posts with production server, do the same except turn off your Internet connection instead of stopping the server (Apache is configured to set a no-cache header on the "API" data source, techniques.js)
