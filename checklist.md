# Neil's NC-news feedback

​
I have sorted it by importance:
​

## UX

​

- [ ] Basic styling added
- [ ] Responsive design
- [ ] Items aligned
- [ ] Content legible (not too wide, obstructed, etc)
- [ ] Refreshing doesn’t cause an issue on sub-pages
- [ ] No errors in the console --> At the moment is showing 2 errors
      ​

## README

​

- [ ] provide general info about app
- [ ] clear instructions on how to run locally
- [ ] link to API & back end repo
- [ ] specify minimum versions
- [ ] link to deployed version
      ​

## Functionality

## Error Handling

- [ ] Bad username in url --> Only needed if articles by specific user implemented
      ​

## Code

- [ ] Functions are DRY (`handleChange` for controlled components / api calls) --> use of api could be much nicer by helping yourself with axios tools, but it's up to you, as it is right now it's ok.
- [ ] The following is for you to double-check whenever you are happy with your code:
- object destructuring where possible
- No `console.log`s / comments
- Delete empty files
  ​

## MAKE SURE ALL TESTS ARE STILL PASSING IN BACK END

​

### Additional functionality:

​

- [ ] navigate over pages of articles (if implemented in back-end)
- [ ] navigate over pages of comments (if implemented in back-end)
- [ ] filter / display articles by specific user
- [ ] post new article
- [ ] delete logged in user's articles
      ​

## Once everything else is complete, here are some extra challenges:

​

- [ ] Use `aXe` extension to check for a11y issues
- [ ] Make sure any pure functions are extracted and tested with `Jest`
- [ ] Use Context API for sharing logged in user amongst components
