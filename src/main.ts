import './style.css'

// jQuery at home
const $ = document.querySelector.bind(document)

const form = $('form') as HTMLFormElement
const input = $('textarea') as HTMLTextAreaElement
const charCount = $('#char-count') as HTMLSpanElement
const postAll = $('#post-all') as HTMLButtonElement
const platforms = document.querySelectorAll(
 `button[type="submit"]`,
) as NodeListOf<HTMLButtonElement>

form.addEventListener('submit', (e) => {
 if (e.submitter) {
  e.preventDefault()
  visit(e.submitter as any)
 }
})

postAll.addEventListener('click', () => {
 for (const p of platforms) visit(p)
})
postAll.removeAttribute('disabled')

for (const p of platforms) p.removeAttribute('disabled')

input.addEventListener('input', () => {
 charCount.textContent = `${input.value.length}`
})

const visit = (button: HTMLButtonElement) => {
 const base = button.getAttribute('formaction')
 if (!base) throw Error('no url to visit')
 const url = new URL(base)
 const param = button.dataset.param || 'text'
 url.searchParams.set(param, input.value)
 window.open(url, '_blank')
}
