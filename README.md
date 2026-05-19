# eats-lazy-canvas

Lazy Canvas implementation for easy-api.ts

## Good practices

Use variables to store long paths/URLs.
Example:

```eats
$let[url;https://example.com/image.png]
$addEllipseImageLayer[$get[url];100;100;100;100;50]
```

Better than writing long paths multiple times.

```eats
$addEllipseImageLayer[https://example.com/image.png;100;100;100;100;50]
```
