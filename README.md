# HedgeDoc 1.x Note-URL-to-UUID tool

HedgeDoc 1.x stores notes with a UUID in the database (column `id`).
However, the note URL is generated from that UUID but not stored in the database itself.
When looking for a specific note in the database, this tool can help you convert the note URL to the UUID and vice-versa.

## Usage

Just open the webpage of this tool (<https://hedgedoc.org/note-id-tool/>) and paste the link to a HedgeDoc note into the
upper field. The corresponding UUID will be autofilled in the bottom field.

You can also paste an UUID into the bottom field and then a link will be created in the upper field. Note that in this case
all generated links will point to <https://demo.hedgedoc.org>, since the instance can not be determined from the UUID alone.

### Relevant SQL queries

To fetch a note by its UUID from a HedgeDoc 1.x instance using postgresql:

```sql
SELECT * FROM "Notes" WHERE id = '00000000-0000-0000-0000-000000000000';
```

To fetch a note by its alias (the custom URL when using FreeURL-mode):

```sql
SELECT * FROM "Notes" WHERE alias = 'example-note';
```

To fetch a note by its short id (obtained from the URL of the "published" view or the slide presentation):

```sql
SELECT * FROM "Notes" WHERE shortid = 'abcdef123';
```

## Technical details

There is no magic in the encoded note URL. In fact the database UUID for the note is just taken as binary (not the hexadecimal
representation!) and then transformed into an URL-safe base64 variant.

## Development

This web tool uses [TypeScript](https://www.typescriptlang.org/) and [Vite](https://vite.dev/).
The used CSS framework is [simple.css](https://simplecss.org/).

After installing the dependencies with `npm install`, you can build the tool using `npm run build`.
The build output is placed into `dist` directory.

For linting and formatting, [biome](https://biomejs.dev/) is used. You can check the code using `npm run check`.
To fix any errors run `npm run fix`.

For a hot-reloading development webserver, listening on <http://localhost:5173>, run `npm run dev`.

## License

Licensed under MIT. However, when doing improvements, we're happy about contributions back.

© 2025 The HedgeDoc authors
