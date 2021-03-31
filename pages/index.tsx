import { useRef, useState } from 'react'

const options = ['drag', 'mattress', 'kiwi']

const Page = () => {
  const [optionsRef, paragraphsRef, textAreaRef] = [useRef(null), useRef(null), useRef(null)]
  const [loremIpsumText, setLoremIpsumText] = useState(null)

  const handleGenerate = async () => {
      const option = options[optionsRef?.current?.selectedIndex ?? 0]
      const paragraphs = +(paragraphsRef?.current?.value ?? 1)

      const loremIpsum = await fetch(`/api/get?paragraphs=${paragraphs}&ipsum=${option}`).then((res) => res.json())
      setLoremIpsumText(loremIpsum)
  }

  const handleCopy = () => {
    textAreaRef?.current?.select()
    textAreaRef?.current?.setSelectionRange(0, 9999)

    document.execCommand('copy')
    alert('Text copied!')
  }

  return (
    <div>
      <select ref={optionsRef}>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
      <input ref={paragraphsRef} type="text" placeholder="paragraphs" defaultValue={5}></input>
      <button onClick={handleGenerate}>Generate</button>
      {loremIpsumText && <div>
        <textarea ref={textAreaRef} style={{ width: 600, height: 300 }} value={loremIpsumText.join('\n\n')} readOnly/>
        <p>
          <button onClick={handleCopy}>Copy</button>
        </p>
      </div>}
    </div>
  )
}

export default Page
