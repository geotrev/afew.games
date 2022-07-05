---
title: Decoding Modern Nintendo Print Variants
description: Gone are the days of memorizing every dot on a box; in are the days
  of standardized print data!
---

With the release of the Nintendo Wii and DS, Nintendo made identifying game prints much easier. While they still use(d) major revision differences in "player's choice," they also introduced two new data points in the form of UPC satellite codes and print (variant) codes. These are typically positioned very close to the game's primary UPC on the back of a case/box.

Thankfully, these codes have persisted even to the most recent generation of games (Nintendo Switch).

In this article, I'll show you how to read this information on your game to identify the exact print run you own, including its region of manufacture and intended locale. It's taken me some time to understand the nuances of how Nintendo annotates their games, and now that I think I have a decent grasp of it, I'm here to share the goodness.

## Game Data Breakdown

Let's start with _Hyrule Warriors_ on the Switch as a reference:

![Hyrule Warriors for Nintendo Switch game case showing model part number, satellite, and print codes.](/uploads/hyrule-warriors.jpg)

Let's explain these details a bit:

- **Print (variant) code:** This is a unique identifier for the specific iteration of a game. For first and second party Nintendo games, this is a numerical value (five to six digits) representing the form of the game (e.g., retail standalone, limited edition, etc), followed by a single letter suffix, indicating the production revision. The revision suffix will always be in order, starting at `A` (first print), then to `B`, and so on.
- **Satellite code**: A simple five-digit code denoting the region of production (third digit) and iteration of the game (0, 1, 2, etc). You'll often see the revision suffix in the print code correlate to this value, but not always.
- **Model Part # (MPN)**: Similar to the print code, this is a custom code used to track the game on the open market. What's useful for our purposes is that it also denotes the intended region of distribution, e.g., `USA` (USA specific), `USZ` (USA and Canada/Mexico), or `CAN` (Canada).
- **Region of manufacture**: The physical location the game was manufactured in. For many games, that's Japan. This should match the middle digit of the satellite code, although there are exceptions (we'll cover that in a few moments).

## A Note About "First Prints"

In media, the concept of a "first print" typically refers to the _original_ release of an item on its release date.

While it might seem intuitive to say a "lower" print code (excluding the suffix) is the "earliest print" form of a given game, that's sadly not accurate.

The most important factor in the print is noting how the game was distributed and cross referencing that info to any dates on the packaging. For instance, if a game was distributed as part of a bundle at release, its print code won't match its correlating retail release form. As a result, both will have separate print codes and still be considered "first print."

A great example of this is The Legend of Zelda: Breath of the Wild, which had three separate versions during its release in 2016: retail, Special Edition, and Master Edition. All of these are "first print."

At the end of the day, the print code is ultimately a function of identifying a product, _not_ in keeping chronological reference between variants.

## Examples

First, let's take a look at the anatomy of a UPC label on modern Nintendo games.

![Pokemon UltraMoon manufacturing and product info, highlighting the satellite and print codes.](/uploads/pokemon-ultra-moon-revision.jpg)

You would read this as: **retail second print, made in Japan, distributed in USA.**

Here are additional examples on various Nintendo consoles. It's always the same combination of data, but laid out slightly different.

### Nintendo DS

![Nintendo DS print details aligned completely to the right of the UPC](/uploads/pokemon_white_2.jpg)

Pokemon White 2 Version, retail first print, made in Japan, distributed in USA.

### Nintendo 3DS

![Nintendo 3DS print details aligned completely to the right of the UPC](/uploads/pokemon-ultra-moon.jpg)

_Pokemon UltraMoon_, retail first print, made in Japan, distributed in USA.

### Nintendo Wii

![Nintendo Wii print details with print code on the left of the UPC, and satellite code on the right.](/uploads/skyward-sword.jpg)

_The Legend of Zelda: Skyward Sword_ for Nintendo Wii, retail first print, made in USA, distributed in USA and Canada (English, French, and Spanish packaging).

### Nintendo Wii U

![Nintendo Wii U print details just above the UPC.](/uploads/super-smash-wii-u.jpg)

_Super Smash Bros for Wii U_, retail first print, made in USA, distributed in USA and Canada (English, French, and Spanish packaging).

### Switch

![Nintendo Switch print details above and to the right of the UPC.](/uploads/smash_ultimate.jpg)

_Super Smash Bros Ultimate_ for Switch, retail first print, Made in Japan, distributed in Canada (see `CAN` MPN suffix). Notice that the print code here ends with `2A`, whereas on the USA print, it ends with `1A`.

## Errors, Inconsistencies, and Bundles

Like all things, there have been and will be exceptions/mistakes where...

- A game is produced with the wrong info but the error was noticed too late in the production process, resulting in "error" copies. This can affect not just packaging details but the manufacturing data too (see examples below).
- The "first print" never actually hits the open market because of a production issue, resulting in the "second" print being the true "first" print.
- Third parties don't always respect Nintendo's print/satellite code pattern.

Let's look at some examples.

### Third-Party UPC

![Shows third-party published game missing satellite code and revision suffix on print code](/uploads/kingdom-hearts.jpg)

On _Kingdom Hearts: 358/2 Days_ for DS (third party developed and published), Square Enix omitted the revision suffix in the print code and entirely omitted the satellite code.

### "Missing" Print Code

![Shows Metroid Prime: Hunters second print; first print never left the factory, likely due to an error.](/uploads/metroid_prime_hunters.jpg)

On _Metroid Prime: Hunters_ for DS, Nintendo never printed a version of the game with the print code `57096A`, which means `57096B` is the "first" print.

### Incorrect Codes

![Bayonetta 2 on Wii U has mismatching satellite code versus country of manufacture](/uploads/bayonetta-2-wii-u.jpg)

On _Bayonetta 2_ for Wii U (2nd party developed), there is a `00000` satellite code accompanied by "Made in USA." According to [ModernDB](https://www.instagram.com/Moderndatabase/), it was common for the developer to make this mistake on their games.

### Bundles

![Boxed Wii U game bundle has locale text and print code, but no satellite code](/uploads/super-smash-bros-wii-u-bundle.jpg)

On _Super Smash Bros_ for Wii U (the controller bundle version) there is no satellite code, however the game on the inside _will_ have a satellite code along with a **matching** print code and "Not For Resale" printed somewhere near the UPC.

The above isn't a fast and hard rule for all bundles, though. For instance, Pokemon HeartGold and SoulSilver (Pokewalker bundle) have all the critical info on the outer box, but the game inside simply says "Not For Resale" and no UPCs or print codes to be seen, just an MPN. So like most things in the world of commerce, your mileage may vary. To make matters more complicated, this information is likely to change in the future as inventory/product indexing methods advance.

## Conclusion

I hope this has been a helpful introduction to the concept of modern Nintendo game print variants. There really isn't any magic here; it's all about understanding the data distributors and even Nintendo use to track their products. Huge shoutout to the fine folks at [VideoGameSage](https://videogamesage.com) and in [SACK](https://discord.gg/BkSBeMMZ) (Sealed and Collectibles Knowledge) as well for helping me understand this finicky subject.

Lastly, one more tip: I recommend perusing eBay to compile a list of print codes/variant data. There is a high chance the game you're interested in researching has dozens, if not hundreds of online listings.

---

Have questions or comments about corrections? Feel free to email me at [contact@afew.games](mailto:contact@afew.games).
