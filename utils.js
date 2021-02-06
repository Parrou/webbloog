

function convertHtmlToMd(html) {
  let markdown = toMarkdown(html, {
    converters: [{
      filter: 'div',
      replacement: function (content) {
        return content
      }
    }]
  })
  return markdown
}

function getRawHTML(content, title) {
  let html =
    "<!DOCTYPE html>\n\
    <html>\n\
    <head>\n\
      <meta charset='utf-8'>\n\
      <meta name='viewport' content='width=device-width'>\n\
      <title>" +
    title +
    "</title>\n\
      <style> @import url(https://fonts.googleapis.com/earlyaccess/droidarabickufi.css); body { direction:rtl; font-family: 'Droid Arabic Kufi', 'Droid Sans', sans-serif; padding:1em; } </style>\n\
    </head>\n\
    <body>\n\
    " +
    content +
    '\n\
    </body>\n\
    </html>\n\
      '
  return html
}

function getContent(id) {
  var content = document.getElementById(id)
  return content.innerHTML
}

function getTitle(id) {
  var content = document.getElementById(id)
  var title = content.getElementsByTagName('strong')[0]
  return title.innerHTML
}

function loadInTextView(id, content) {
  document.getElementById(id).value = content
}
