import './style.css'

// jQuery at home
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const form = $('form') as HTMLFormElement
const input = $('textarea') as HTMLTextAreaElement
const charCount = $('#char-count') as HTMLSpanElement
const postAll = $('#post-all') as HTMLButtonElement
const platforms = $$('button[type="submit"]') as NodeListOf<HTMLButtonElement>
const checkboxes = $$('input[type="checkbox"]') as NodeListOf<HTMLInputElement>

// Platform selection for post all
const STORAGE_KEY = 'platform-selection'
let selection = ['twitter', 'bluesky']

try {
 const saved = localStorage.getItem(STORAGE_KEY)
 if (saved) selection = JSON.parse(saved) as string[]
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
  visit(e.submitter as any)
 }
})

postAll.addEventListener('click', () => {
 for (const s of selection) visit(getUrl(s))
})
postAll.removeAttribute('disabled')

for (const p of platforms) p.removeAttribute('disabled')

input.addEventListener('input', () => {
 charCount.textContent = `${input.value.length}`
})

const getUrl = (buttonId: string) => {
 const button = $(`#${buttonId}`) as HTMLButtonElement
 if (button.disabled) return
 const base = button.getAttribute('formaction')
 if (!base) throw Error('no url to visit')
 const url = new URL(base)
 const param = button.dataset.param || 'text'
 url.searchParams.set(param, input.value)
 return url
}

const visit = (url?: URL) => window.open(url, '_blank')

// Check for text query parameter on load
const params = new URLSearchParams(window.location.search)
const text = params.get('text')
if (text) {
 input.value = text
 charCount.textContent = `${text.length}`
 const [first, ...rest] = selection.map(getUrl)
 for (const u of rest) visit(u)
 if (first) setTimeout(() => window.location.replace(first), 0)
}
