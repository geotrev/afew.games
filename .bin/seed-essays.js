const path = require("path")
const fs = require("fs")
const { faker } = require("@faker-js/faker")

const iterations = 50

function toSlug(str) {
  return str
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
}

function getContent(i) {
  const title = faker.lorem.sentence()
  const content = `---
title: ${title}
description: ${faker.lorem.sentences(2)}
---
${faker.lorem.paragraphs()}
`

  return { title, content }
}

function getFileName(title, i) {
  const date = faker.date.past()
  if (i > 0) date.setDate(date.getDate() + i)
  const slug = toSlug(title)

  return `${date.toISOString().slice(0, 10)}--${slug}.md`
}

function writeEssays() {
  console.time("building-seeds")
  const seedPath = path.resolve(process.cwd(), ".seed/essays")

  if (!fs.existsSync(seedPath)) {
    fs.mkdirSync(seedPath, { recursive: true })
  }

  for (let i = 0; i < iterations; i++) {
    const { title, content } = getContent(i)
    const fileName = getFileName(title, i)
    const fileTarget = path.resolve(seedPath, fileName)
    fs.writeFileSync(fileTarget, content, "utf8")
  }

  console.timeEnd("building-seeds")
}

writeEssays()
