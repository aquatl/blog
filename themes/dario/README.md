## Configuration

You can further configure how this site looks by editing your `config.toml` file. Here is an example of a configuration that works with this theme:

```toml
baseURL = "https://yoursite.com/"
languageCode = "en-us"
title = "log" # the title of your site

copyright = "Copyright © 2025 Your Name. All rights reserved."

theme = "dario"

[params]
  description = "A description of your site" # a description of your site that will be used in the meta tags

  [params.author]
    name = "Your Name" # the author of the site
    email = "you@example.com" # the site author's email address
    twitter = "@YourXHandle" # the site author's X/Twitter handle
```

To add intro text to your home page, create a file at `content/_index.md` with contents similar to the following:

```yaml
---
subtitle: "Home Page Subtitle" # the subtitle to display on the "/" homepage
description: "A minimal web log." # The description of the home page that will be used in the open graph meta tags
---

This is a minimal web log inspired by Dario Amodei's personal [website](https://darioamodei.com/). Add some more text here that will be displayed on your homepage (you can use markdown).
```

> Note: In the front matter yaml above, you can also set `homePageIsPost: true` to hydrate the landing page like a blog post. This is an alternate way to view the home page and is somewhat experimental.

### Optional Settings

By default, the theme shows a toggle for switching between light and dark modes. To follow the user's system preference instead, set the `colorScheme` parameter to `'system'`:

```toml
[params]
  colorScheme = 'system'
```

You can also set it to `'light'` or `'dark'` to keep it fixed. The default behavior is to have it set as `'toggle'` which displays a toggle and on first page load it defaults to the user's system preference.

The lowercase `posts` link in the header is disabled by default. Enable it on every page with:

```toml
[params]
  showPostsLink = true
```

The optional Copy Markdown control is disabled by default. Enable it on both the landing page and post pages with:

```toml
[params.copyMarkdown]
  enabled = true
```

To show it on only one page type, set `home` or `posts` explicitly. An omitted page switch defaults to enabled while the feature is enabled globally:

```toml
[params.copyMarkdown]
  enabled = true
  home = true
  posts = false
```

The control copies a Markdown heading and the page's raw Markdown body. Landing-page copies also include the generated section and post links, making the result ready to paste into an LLM prompt or another Markdown-aware tool.

The home page shows the top-level section with the most pages by default. To override this, set `mainSections` to select specific sections:

```toml
mainSections = ['posts', 'essays', 'notes']
```

You can add your own custom CSS in `assets/css/custom.css`:

```css
/* Use the black star as the bullet in unordered lists. */
.content-container ul {
  list-style: none;
  padding-left: 0;
}
.content-container ul > li::before {
  content: '★';
  margin-right: 0.5em;
}
```

If you override the default base font, you might also want to turn off font preloading:

```toml
[params]
  disableFontPreload = true
```

To override the generated `404.html`, create `content/_404.md` with your customized text. For example, the following file contains a Hindi version of the default message:

```yaml
---
subtitle: "४०४"

build:
  render: never
  list: never
---

पृष्ठ नहीं मिला।
```

Be sure to update the value of [`languageCode`](https://gohugo.io/configuration/all/#languagecode) in `config.toml` to match the primary language of your content.

Set the `disableSocialMeta` parameter to turn off HTML tags related to [Open Graph](https://ogp.me) and [X Cards](https://developer.x.com/en/docs/x-for-websites/cards/overview/abouts-cards):

```toml
[params]
  disableSocialMeta = true
```

If you wish to add your own non-standard meta tags for things like Bitcoin,
PGP, and so on, you can add them in `layouts/partials/nonstdmeta.html`:

```html
<meta name="email" content="mail@example.com">
<meta name="bitcoin" content="bc1...">

<link rel="pgpkey" href="/pgp/key.asc">
```

## Blog Posts

Creating a blog post follows the same general process as most Hugo blogging themes.

Posts have markdown "front matter" that looks like this:

```yaml
---
title: "An Example Writing"
author: ["hugo", "monalisa"] # can be an array or just a string
description: "On how to write an example blog post"

# The summary is for search engines
summary: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique placerat feugiat ac, facilisis vitae arcu. Proin eget egestas augue. Praesent ut sem nec arcu pellentesque aliquet. Duis dapibus diam vel metus tempus vulputate.

date: 2000-01-01T00:00:00-00:00 # date of creation

draft: false

ogTitle: Cool New Example Post # the title of the post that will be used in the open graph meta tags
ogDescription: "An example of using the Dario hugo theme" # the description of the post that will be used in the open graph meta tags
ogImage: /posts/example/og.png # the path to a png/jpg image in the ./posts/example directory to use as the open graph image
---

Here is where you write the content of your blog post in markdown!
```

> Here is a [live example](https://github.com/GrantBirki/log/blob/0893a8488426d0f910feefe0c69c49f3c10fc8c8/content/posts/example/index.md) to view the source of a blog post that uses this theme.
