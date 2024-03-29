const path = require("path")
const { existsSync, promises: fs } = require("fs")
const { faker } = require("@faker-js/faker")

const SEED_COUNT = 50

function toSlug(str) {
  return str
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
}

function getContent(date, i) {
  const title = faker.lorem.sentence()
  const content = `---
publish_date: ${date}
title: ${title}
description: ${faker.lorem.sentences(2)}
---
${faker.lorem.paragraphs(5)}
`

  return { title, content }
}

function getFileName(date, title, i) {
  const slug = toSlug(title)

  return `${date}--${slug}.md`
}

async function seed() {
  console.time("building-seeds")
  const seedPath = path.resolve(process.cwd(), ".seed/essays")

  if (!existsSync(seedPath)) {
    await fs.mkdir(seedPath, { recursive: true })
  }

  const promises = []
  const dates = faker.date.betweens(
    new Date("2020-01-01"),
    new Date(),
    SEED_COUNT
  )

  for (let i = 0; i < SEED_COUNT; i++) {
    const isoDate = dates[i].toISOString().slice(0, 10)
    const { title, content } = getContent(isoDate, i)
    const fileName = getFileName(isoDate, title, i)
    const fileTarget = path.resolve(seedPath, fileName)
    promises.push(async () =>
      fs.writeFile(fileTarget, content, { encoding: "utf8" })
    )
  }

  await Promise.all(promises).then((writeFns) => {
    writeFns.forEach((fn) => fn())
  })
  console.timeEnd("building-seeds")
}

seed()
