const DEFAULT_PARAGRAPHS = 5
const PARAGRAPH_LENGTH = 10

const get = async (req, res) => {
  try {
    const { paragraphs = DEFAULT_PARAGRAPHS, ipsum } = req.query
  
    const data = await import(`../../data/${ipsum}`).then((mod) => mod[ipsum])
  
    const loremIpsum = Array(+paragraphs).fill(0).map(() => {
      return Array(PARAGRAPH_LENGTH).fill(0).map(() => {
        const i = Math.floor(Math.random() * data.length);
        return data[i]
  
      }).join(' ')
    })
    
    res.json(loremIpsum)
  }
  catch {
    res.json([])
  }
}

export default get
