import './style.css'

// jQuery at home
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const form = $('form')
const input = $('textarea')
const pre = $('pre span')
const charCount = $('#char-count')
const postAll = $('#post-all')
const platforms = $$('button[type="submit"]')
const checkboxes = $$('input[type="checkbox"]')

// Platform selection for post all
const STORAGE_KEY = 'platform-selection'
let selection = ['twitter', 'bluesky']

try {
 const saved = localStorage.getItem(STORAGE_KEY)
 if (saved) selection = JSON.parse(saved)
} catch {
 // ignore read error
}

function saveSelection() {
 try {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(selection))
 } catch {
  // Ignore storage errors
 }
}

// Initialize checkboxes and buttons
platforms.forEach((button, i) => {
 const platform = button.id
 if (platform) {
  checkboxes[i].checked = selection.includes(platform)
  checkboxes[i].addEventListener('change', () => {
   if (checkboxes[i].checked) {
    selection.push(platform)
   } else {
    selection = selection.filter((s) => s !== platform)
   }
   saveSelection()
  })
 }
})

form.addEventListener('submit', (e) => {
 if (e.submitter) {
  e.preventDefault()
  visit(getUrl(e.submitter))
 }
})

postAll.addEventListener('click', () => {
 for (const s of selection) visit(getUrl($(`#${s}`)))
})
postAll.removeAttribute('disabled')

for (const p of platforms) p.removeAttribute('disabled')

input.addEventListener('input', () => {
 pre.textContent = input.value
 charCount.textContent = `${input.value.length}`
})

const getUrl = (button) => {
 if (button.disabled) return
 const base = button.getAttribute('formaction')
 if (!base) throw Error('no url to visit')
 const url = new URL(base)
 const param = button.dataset.param || 'text'
 url.searchParams.set(param, input.value)
 return url
}

const visit = (url) => window.open(url, '_blank')

// Check for text query parameter on load
const params = new URLSearchParams(window.location.search)
const text = params.get('text')
if (text) {
 input.value = text
 pre.textContent = text
 charCount.textContent = `${text.length}`
}
