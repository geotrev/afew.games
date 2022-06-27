const path = require("path")
const fs = require("fs")

const iterations = 70

function getContent(i) {
  return `---
title: Example article title ${i}
description: A description that's only a placeholder
---
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Neque gravida in fermentum et sollicitudin ac orci phasellus. Facilisi etiam dignissim diam quis. Molestie nunc non blandit massa enim nec dui. Non nisi est sit amet facilisis magna etiam tempor. Quis enim lobortis scelerisque fermentum dui faucibus. Tristique risus nec feugiat in fermentum posuere. Vulputate sapien nec sagittis aliquam malesuada. Dolor sit amet consectetur adipiscing. Neque egestas congue quisque egestas diam. Pellentesque habitant morbi tristique senectus et. Adipiscing bibendum est ultricies integer quis auctor elit. Hendrerit dolor magna eget est lorem ipsum dolor sit amet. Vel orci porta non pulvinar neque laoreet suspendisse interdum consectetur. Pellentesque adipiscing commodo elit at imperdiet. Donec massa sapien faucibus et molestie. Lectus quam id leo in. Enim praesent elementum facilisis leo vel fringilla. Integer feugiat scelerisque varius morbi enim nunc faucibus.

Nisl nunc mi ipsum faucibus vitae aliquet nec. Lobortis elementum nibh tellus molestie nunc non blandit massa. Risus commodo viverra maecenas accumsan lacus. Convallis tellus id interdum velit laoreet id donec ultrices. Amet nisl purus in mollis nunc sed id. Sit amet luctus venenatis lectus magna fringilla urna. Vitae et leo duis ut diam quam nulla. Quis enim lobortis scelerisque fermentum dui faucibus in ornare. Mattis molestie a iaculis at erat pellentesque adipiscing commodo. Lobortis scelerisque fermentum dui faucibus in ornare quam viverra orci. Eget est lorem ipsum dolor sit.
`
}

function getFileName(i) {
  const startingDate = 14
  const date = new Date(`2022-01-01`)
  if (i > 0) date.setDate(date.getDate() + i)
  const slug = `example-article-title-${i}`

  return `${date.toISOString().slice(0, 10)}--${slug}.md`
}

function writeEssays() {
  for (let i = 0; i < iterations; i++) {
    const content = getContent(i)
    const fileName = getFileName(i)
    const fileTarget = path.resolve(process.cwd(), "public/essays", fileName)
    fs.writeFileSync(fileTarget, content, "utf8")
  }
}

writeEssays()
