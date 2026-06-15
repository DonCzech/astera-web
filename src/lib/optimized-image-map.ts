export type OptimizedImageEntry = {
  webp: string;
  fallback: string;
  webpSrcSet?: string;
  fallbackSrcSet?: string;
  width: number;
  height: number;
  lqip?: string;
};

export const OPTIMIZED_IMAGE_MAP: Record<string, OptimizedImageEntry> = {
  "/images/3rd-part-logo-asset-11.jpg": {
    "webp": "/optimized/images/3rd-part-logo-asset-11.webp",
    "fallback": "/optimized/images/3rd-part-logo-asset-11.jpg",
    "webpSrcSet": "/optimized/images/3rd-part-logo-asset-11-331w.webp 331w, /optimized/images/3rd-part-logo-asset-11-480w.webp 480w, /optimized/images/3rd-part-logo-asset-11-662w.webp 662w, /optimized/images/3rd-part-logo-asset-11-664w.webp 664w",
    "fallbackSrcSet": "/optimized/images/3rd-part-logo-asset-11-331w.jpg 331w, /optimized/images/3rd-part-logo-asset-11-480w.jpg 480w, /optimized/images/3rd-part-logo-asset-11-662w.jpg 662w, /optimized/images/3rd-part-logo-asset-11-664w.jpg 664w",
    "width": 664,
    "height": 122,
    "lqip": "data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAACwAgCdASoUAAQAPzmGuVOvKSWisAgB4CcJaQAAeyAA/u6arQAAAA=="
  },
  "/images/3rd-part-logo-asset-22.jpg": {
    "webp": "/optimized/images/3rd-part-logo-asset-22.webp",
    "fallback": "/optimized/images/3rd-part-logo-asset-22.jpg",
    "webpSrcSet": "/optimized/images/3rd-part-logo-asset-22-331w.webp 331w, /optimized/images/3rd-part-logo-asset-22-480w.webp 480w, /optimized/images/3rd-part-logo-asset-22-662w.webp 662w, /optimized/images/3rd-part-logo-asset-22-664w.webp 664w",
    "fallbackSrcSet": "/optimized/images/3rd-part-logo-asset-22-331w.jpg 331w, /optimized/images/3rd-part-logo-asset-22-480w.jpg 480w, /optimized/images/3rd-part-logo-asset-22-662w.jpg 662w, /optimized/images/3rd-part-logo-asset-22-664w.jpg 664w",
    "width": 664,
    "height": 122,
    "lqip": "data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAACwAgCdASoUAAQAPzmGuVQvKSWjMAgB4CcJaQAAeyAA/u7F1IAAAA=="
  },
  "/images/408x410-OracleSecretsWebinar-Event-Promo.jpg": {
    "webp": "/optimized/images/408x410-OracleSecretsWebinar-Event-Promo.webp",
    "fallback": "/optimized/images/408x410-OracleSecretsWebinar-Event-Promo.jpg",
    "webpSrcSet": "/optimized/images/408x410-OracleSecretsWebinar-Event-Promo-331w.webp 331w, /optimized/images/408x410-OracleSecretsWebinar-Event-Promo-408w.webp 408w",
    "fallbackSrcSet": "/optimized/images/408x410-OracleSecretsWebinar-Event-Promo-331w.jpg 331w, /optimized/images/408x410-OracleSecretsWebinar-Event-Promo-408w.jpg 408w",
    "width": 408,
    "height": 410,
    "lqip": "data:image/webp;base64,UklGRk4AAABXRUJQVlA4IEIAAABQAwCdASoUABQAPzmQwVcvKaejqAqp4CcJZQDDcA2G5clNgAD8ceiZnKnDNL4BqWfvWlwdL3X9h06A49ww2CjyAAA="
  },
  "/images/CBR-logo-black.png": {
    "webp": "/optimized/images/CBR-logo-black.webp",
    "fallback": "/optimized/images/CBR-logo-black.png",
    "webpSrcSet": "/optimized/images/CBR-logo-black-102w.webp 102w",
    "fallbackSrcSet": "/optimized/images/CBR-logo-black-102w.png 102w",
    "width": 102,
    "height": 94,
    "lqip": "data:image/webp;base64,UklGRuYAAABXRUJQVlA4WAoAAAAQAAAAEwAAEQAAQUxQSI0AAAABuTJE9D80ciNJciQJPNZfXPy/QAY/AdKWHwt67AS45yMmYAK+ffHR5QfH4bdfHj/89N376/tBSjybmfYmpTVspityubH4JBUZxvish+Ryrv/nsYS1GyW5nOtvUq7GLo72QBf3NlrXGiLWdHH1lWFBF3NuNo0gds5mLqPhdHA4yIo455iZFcJ5zLZhqQgAVlA4IDIAAADwAgCdASoUABIAPzmQwFevKacjqAqp4CcJaQAAPn7KAAD+7QITBbfl+pmWLdG26h8AAA=="
  },
  "/images/Live-Event.png": {
    "webp": "/optimized/images/Live-Event.webp",
    "fallback": "/optimized/images/Live-Event.png",
    "webpSrcSet": "/optimized/images/Live-Event-119w.webp 119w",
    "fallbackSrcSet": "/optimized/images/Live-Event-119w.png 119w",
    "width": 119,
    "height": 25,
    "lqip": "data:image/webp;base64,UklGRooAAABXRUJQVlA4WAoAAAAQAAAAEwAAAwAAQUxQSDEAAAABuTJE9D8cDiJJkpQ7QAj+Tf54yI6KICImYALuH37rpDE3JGjN138tMq31cWEPQRYGAFZQOCAyAAAA0AIAnQEqFAAEAD85hrpULyklozAIAeAnCUAVgAWkgAD+h9Qa7v1Z+vuRt9UzfaUAAAA="
  },
  "/images/Membership.png": {
    "webp": "/optimized/images/Membership.webp",
    "fallback": "/optimized/images/Membership.png",
    "webpSrcSet": "/optimized/images/Membership-147w.webp 147w",
    "fallbackSrcSet": "/optimized/images/Membership-147w.png 147w",
    "width": 147,
    "height": 25,
    "lqip": "data:image/webp;base64,UklGRn4AAABXRUJQVlA4WAoAAAAQAAAAEwAAAgAAQUxQSCgAAAABuTJE9D8cjNpGkjRDa/nTurdBuFSfiAnI42lcbu22zAYhZmgIYkQDVlA4IDAAAADQAgCdASoUAAMAPzmEuVOvKKWisAgB4CcJQBWABaSAAP5TGDXek+L8RdPd/5ug4AA="
  },
  "/images/Oracle-Circle.png": {
    "webp": "/optimized/images/Oracle-Circle.webp",
    "fallback": "/optimized/images/Oracle-Circle.jpg",
    "webpSrcSet": "/optimized/images/Oracle-Circle-331w.webp 331w, /optimized/images/Oracle-Circle-408w.webp 408w",
    "fallbackSrcSet": "/optimized/images/Oracle-Circle-331w.jpg 331w, /optimized/images/Oracle-Circle-408w.jpg 408w",
    "width": 408,
    "height": 410,
    "lqip": "data:image/webp;base64,UklGRlQAAABXRUJQVlA4IEgAAAAQBACdASoUABQAPzmMu1WvKSYjKA1R4CcJZQDI1A9UQv8OkJ1GjTUt0AD+sKsCBh6TZJapcoqD6DhHNprtXWUDT2gvnLqAAAA="
  },
  "/images/about/art-of-manifesting.jpg": {
    "webp": "/optimized/images/about/art-of-manifesting.webp",
    "fallback": "/optimized/images/about/art-of-manifesting.jpg",
    "webpSrcSet": "/optimized/images/about/art-of-manifesting-240w.webp 240w",
    "fallbackSrcSet": "/optimized/images/about/art-of-manifesting-240w.jpg 240w",
    "width": 240,
    "height": 291,
    "lqip": "data:image/webp;base64,UklGRlgAAABXRUJQVlA4IEwAAABQAwCdASoUABgAPzmEvFa0p6WksBgIApAnCWQAdwAC9D5K0AD+4W+2Dnv/19fUnOX/ybziwUiVQgo8gaKAAJcXEAcDEI1gS3wRvoAA"
  },
  "/images/about/astera-sofa.png": {
    "webp": "/optimized/images/about/astera-sofa.webp",
    "fallback": "/optimized/images/about/astera-sofa.png",
    "webpSrcSet": "/optimized/images/about/astera-sofa-331w.webp 331w, /optimized/images/about/astera-sofa-480w.webp 480w, /optimized/images/about/astera-sofa-579w.webp 579w",
    "fallbackSrcSet": "/optimized/images/about/astera-sofa-331w.png 331w, /optimized/images/about/astera-sofa-480w.png 480w, /optimized/images/about/astera-sofa-579w.png 579w",
    "width": 579,
    "height": 816,
    "lqip": "data:image/webp;base64,UklGRg4BAABXRUJQVlA4WAoAAAAQAAAAEwAAGwAAQUxQSJ8AAAANuS5E9D80ciNJciQJnzKnv0YnwZGP8ZPPxggQVvSWhQBDv40AERMwAa/fPHqwfPHJ9cHtdruuYff8/+4rmHsgLwQoNxtp0zZHOxkIR9pkR4SEnN0k5dyBEVtmc7NyFso0nW0/K0cESWZzzsMRsNSMto5zBBYYweLaBAESCrj2WPoFMJvUcdbyy3RMrzPkt2k7lvxpeiwjfx4b8dfxjwsAVlA4IEgAAABQBACdASoUABwAPxl2sVO/p6Sit+gD8CMJaQAAb8kI2/HsdYQ2hbAC3pf4AP7TlTYoqYjlpWQbDBBmx4B7j1W1uqZM1odoKAA="
  },
  "/images/about/audio-chakras.png": {
    "webp": "/optimized/images/about/audio-chakras.webp",
    "fallback": "/optimized/images/about/audio-chakras.png",
    "webpSrcSet": "/optimized/images/about/audio-chakras-255w.webp 255w",
    "fallbackSrcSet": "/optimized/images/about/audio-chakras-255w.png 255w",
    "width": 255,
    "height": 255,
    "lqip": "data:image/webp;base64,UklGRtwAAABXRUJQVlA4WAoAAAAQAAAAEwAAEwAAQUxQSG0AAAAFuQpE9D8cjhtJUqRd3499Xj62IFP5iZiACTh9mKG6mAyYpDLqpsHTACGBGaMOb5oGkE+S48QGZAKZYIUJAXLMGaOMty3iY2d88zv/O/lKX5l8NqKADIEQwokNTAIkEAoyBEKOASQBkq8ynpsAAFZQOCBIAAAAMAMAnQEqFAAUAD85grtXPqelqbAYCAPQJwlAAAdKLeB2AAD8Jg9/EP/BskHJz/8XdiOMv0ZVn2lulJmnI6Gd30HSoDAAAAAA"
  },
  "/images/about/audio-energies.png": {
    "webp": "/optimized/images/about/audio-energies.webp",
    "fallback": "/optimized/images/about/audio-energies.png",
    "webpSrcSet": "/optimized/images/about/audio-energies-255w.webp 255w",
    "fallbackSrcSet": "/optimized/images/about/audio-energies-255w.png 255w",
    "width": 255,
    "height": 255,
    "lqip": "data:image/webp;base64,UklGRtwAAABXRUJQVlA4WAoAAAAQAAAAEwAAEwAAQUxQSG0AAAAFuQpE9D8cjhtJUqRd3499Xj62IFP5iZiACTh9mKG6mAyYpDLqpsHTACGBGaMOb5oGkE+S48QGZAKZYIUJAXLMGaOMty3iY2d88zv/O/lKX5l8NqKADIEQwokNTAIkEAoyBEKOASQBkq8ynpsAAFZQOCBIAAAAkAMAnQEqFAAUAD85iLpTrymmIrAYDAHgJwlAE6ACHVFjE1xl0AD+dmBpEw1JauhkpNusTWgKFzNI1dekdSsEKUIz/f6PG/AA"
  },
  "/images/about/audio-more-messages.png": {
    "webp": "/optimized/images/about/audio-more-messages.webp",
    "fallback": "/optimized/images/about/audio-more-messages.png",
    "webpSrcSet": "/optimized/images/about/audio-more-messages-255w.webp 255w",
    "fallbackSrcSet": "/optimized/images/about/audio-more-messages-255w.png 255w",
    "width": 255,
    "height": 255,
    "lqip": "data:image/webp;base64,UklGRtwAAABXRUJQVlA4WAoAAAAQAAAAEwAAEwAAQUxQSG0AAAAFuQpE9D8cjhtJUqRd3499Xj62IFP5iZiACTh9mKG6mAyYpDLqpsHTACGBGaMOb5oGkE+S48QGZAKZYIUJAXLMGaOMty3iY2d88zv/O/lKX5l8NqKADIEQwokNTAIkEAoyBEKOASQBkq8ynpsAAFZQOCBIAAAAcAMAnQEqFAAUAD85jLxVvqkmIzAYCAPQJwlAGN6AMVqyyV8AAOQodZDs0GD+HbmyAtU8cjfWmR1LfqUg2HxvFz+N7JSBdgAA"
  },
  "/images/about/audio-uncharted.png": {
    "webp": "/optimized/images/about/audio-uncharted.webp",
    "fallback": "/optimized/images/about/audio-uncharted.png",
    "webpSrcSet": "/optimized/images/about/audio-uncharted-255w.webp 255w",
    "fallbackSrcSet": "/optimized/images/about/audio-uncharted-255w.png 255w",
    "width": 255,
    "height": 255,
    "lqip": "data:image/webp;base64,UklGRtgAAABXRUJQVlA4WAoAAAAQAAAAEwAAEwAAQUxQSG0AAAAFuQpE9D8cjhtJUqRd3499Xj62IFP5iZiACTh9mKG6mAyYpDLqpsHTACGBGaMOb5oGkE+S48QGZAKZYIUJAXLMGaOMty3iY2d88zv/O/lKX5l8NqKADIEQwokNTAIkEAoyBEKOASQBkq8ynpsAAFZQOCBEAAAAUAMAnQEqFAAUAD85jrxVryomIzAYCAHgJwlAF2AC1NJhrgAA/unB7kaDuFMZ2rbHZuLzbnW4sBq4+wUNaWyw+hOAAAA="
  },
  "/images/about/crystal-spirits.png": {
    "webp": "/optimized/images/about/crystal-spirits.webp",
    "fallback": "/optimized/images/about/crystal-spirits.png",
    "webpSrcSet": "/optimized/images/about/crystal-spirits-275w.webp 275w",
    "fallbackSrcSet": "/optimized/images/about/crystal-spirits-275w.png 275w",
    "width": 275,
    "height": 275,
    "lqip": "data:image/webp;base64,UklGRvYAAABXRUJQVlA4WAoAAAAQAAAAEwAAEwAAQUxQSJAAAAAJuYzof1jg1LbtWhn/K8K/DiSgIof7SA5WtW51Fqn7VcQETMDVGyc+eXTvzuX//9alHXp2TUXPHDRq7w06og4YSyMyKgrt9gZlUAWp3U4GZDGiDQIiIsCGHSIghkRxLICsUQdfm59x3NLSkUiEUUImGlFGBIhCERWxOlpUUZSoThUdQujM0Eq1IR3Ho0MCnRlWUDggQAAAAHADAJ0BKhQAFAA/OYS7U7+vpiKwGAwD8CcJYwDMHBZ49rjktAD+4Gv5Dbc/0o7/DMKfDlSz8beSobkQxQC2AAA="
  },
  "/images/about/dream-weavers.png": {
    "webp": "/optimized/images/about/dream-weavers.webp",
    "fallback": "/optimized/images/about/dream-weavers.png",
    "webpSrcSet": "/optimized/images/about/dream-weavers-275w.webp 275w",
    "fallbackSrcSet": "/optimized/images/about/dream-weavers-275w.png 275w",
    "width": 275,
    "height": 275,
    "lqip": "data:image/webp;base64,UklGRgQBAABXRUJQVlA4WAoAAAAQAAAAEwAAEwAAQUxQSJkAAAANuYzof2ggxbYtO0kCcvCvBQWY6NsRBnYE7LrzW3ucQsAXEDEBE/DwydnFm3cvjuPZ7XZMKfvolYFh4VDCzAaOwFgWV2ejjYxxtOH3IMu4SjsmjDA7VGaSs5GjwWyGGYRBGGD8nMVfTvJbAm0mCJkkgFk7SzILaWzAMhs7sLWOzr0wHBFMQ3fkR5ONrTtt7WgISvJPOpKCIAAAVlA4IEQAAABQAwCdASoUABQAPzWAt1O+LyUkN/VYA8AmiWMAwNwWYVovAAD+3+rB6lP6U+g+Jqaz06qaMcJSIiX9DdCWP4sxwAAAAA=="
  },
  "/images/about/goddess-power.png": {
    "webp": "/optimized/images/about/goddess-power.webp",
    "fallback": "/optimized/images/about/goddess-power.png",
    "webpSrcSet": "/optimized/images/about/goddess-power-275w.webp 275w",
    "fallbackSrcSet": "/optimized/images/about/goddess-power-275w.png 275w",
    "width": 275,
    "height": 275,
    "lqip": "data:image/webp;base64,UklGRvAAAABXRUJQVlA4WAoAAAAQAAAAEwAAEwAAQUxQSJgAAAANuYzof2ggRZLkSNo9Aef4QzkGB0Lr1xGIARBW/7J4ry2MiAmYgIdPzvzw7s2LV5fLs2MGu+GjA2cDHPDg5wGOGETOH38HZTSkY1sWkBySkGHkWGN7bDsYBBg5m2EAGQQGGL9m8V/bSEgggZYQTEiSn1KbmSFpAt0KZ5PYWkDcMADpOmLdGfnddq4k7AbtaLYgdG/kT7EFAFZQOCAyAAAAEAMAnQEqFAAUAD85lMBaLymmpCgIAeAnCWUAxzAZibeQAP7orF6OCP/owWP8xg6iQAA="
  },
  "/images/about/good-tarot.png": {
    "webp": "/optimized/images/about/good-tarot.webp",
    "fallback": "/optimized/images/about/good-tarot.png",
    "webpSrcSet": "/optimized/images/about/good-tarot-275w.webp 275w",
    "fallbackSrcSet": "/optimized/images/about/good-tarot-275w.png 275w",
    "width": 275,
    "height": 275,
    "lqip": "data:image/webp;base64,UklGRiIBAABXRUJQVlA4WAoAAAAQAAAAEwAAEwAAQUxQSLIAAAABuTJE9D80cmvbVrbK3aUL+q/L3eH7pYVFzh4Hyc5YBZA+i14SMQETcHjPgff3X1tWLZlz78qZE8eOfH+f+r+g6VlJJw3w5FHVg3/pjCJBy7f6lyQdOiFQVtW8AR06gFjlT0hCQiKxtJqEUQbBIokhEAKoqUAAwvgKk0cgTjHSTGHAIOBARgcUAcERCSlExFGBplQUxUE6eVMKVXCQ7r8qRUnBoDNiZCGE7h6USqlAp7sBVlA4IEoAAAAwAwCdASoUABQAPzGCtVOuqLYisAwCwCYJQBhQAxYpI4egAPU9P2n2va1fjP5RbviRptmmdyv4nrDL5fvNMaTZaTAjuLlXPpAAAA=="
  },
  "/images/about/hidden-realms.png": {
    "webp": "/optimized/images/about/hidden-realms.webp",
    "fallback": "/optimized/images/about/hidden-realms.png",
    "webpSrcSet": "/optimized/images/about/hidden-realms-275w.webp 275w",
    "fallbackSrcSet": "/optimized/images/about/hidden-realms-275w.png 275w",
    "width": 275,
    "height": 275,
    "lqip": "data:image/webp;base64,UklGRgIBAABXRUJQVlA4WAoAAAAQAAAAEwAAEwAAQUxQSJwAAAANuYzof2ggRbbtWol28C8FBZjI6QcLCwGrzvzUGlNfwBcQMQET8PjZnVsf5t2bV9cX1+t8Srz3ZAIDHKAg/3c2MLIIaGbj4AH6xfGAMviThHYcCaCSkJyNjILZDDMyjDBH42jGyUZybjvbobQDtLUlkJAcNMCEJAEz28wM+W3SJQwz0zRwwwATtpYejBwWYAF2O5ZsEhegHWnBFgBWUDggQAAAAPACAJ0BKhQAFAA/OYi8VL+opiMoDVPwJwllAAA9mDBwAP6rmTTykC7Fovtk70sPnFVprRoJYwKimQrDy5jUAAA="
  },
  "/images/about/logos-1.jpg": {
    "webp": "/optimized/images/about/logos-1.webp",
    "fallback": "/optimized/images/about/logos-1.jpg",
    "webpSrcSet": "/optimized/images/about/logos-1-331w.webp 331w, /optimized/images/about/logos-1-480w.webp 480w, /optimized/images/about/logos-1-662w.webp 662w, /optimized/images/about/logos-1-664w.webp 664w",
    "fallbackSrcSet": "/optimized/images/about/logos-1-331w.jpg 331w, /optimized/images/about/logos-1-480w.jpg 480w, /optimized/images/about/logos-1-662w.jpg 662w, /optimized/images/about/logos-1-664w.jpg 664w",
    "width": 664,
    "height": 122,
    "lqip": "data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAACwAgCdASoUAAQAPzmGuVOvKSWisAgB4CcJaQAAeyAA/u6arQAAAA=="
  },
  "/images/about/logos-2.jpg": {
    "webp": "/optimized/images/about/logos-2.webp",
    "fallback": "/optimized/images/about/logos-2.jpg",
    "webpSrcSet": "/optimized/images/about/logos-2-331w.webp 331w, /optimized/images/about/logos-2-480w.webp 480w, /optimized/images/about/logos-2-662w.webp 662w, /optimized/images/about/logos-2-664w.webp 664w",
    "fallbackSrcSet": "/optimized/images/about/logos-2-331w.jpg 331w, /optimized/images/about/logos-2-480w.jpg 480w, /optimized/images/about/logos-2-662w.jpg 662w, /optimized/images/about/logos-2-664w.jpg 664w",
    "width": 664,
    "height": 122,
    "lqip": "data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAACwAgCdASoUAAQAPzmGuVQvKSWjMAgB4CcJaQAAeyAA/u7F1IAAAA=="
  },
  "/images/about/messages-spirit.png": {
    "webp": "/optimized/images/about/messages-spirit.webp",
    "fallback": "/optimized/images/about/messages-spirit.png",
    "webpSrcSet": "/optimized/images/about/messages-spirit-240w.webp 240w",
    "fallbackSrcSet": "/optimized/images/about/messages-spirit-240w.png 240w",
    "width": 240,
    "height": 291,
    "lqip": "data:image/webp;base64,UklGRjABAABXRUJQVlA4WAoAAAAQAAAAEwAAFwAAQUxQSLsAAAABuTJE9D8csiPZVu1G54jN8Of8E2T2eSBWBDM1gogJmIBP33jv4aOHd147d2Lit5++++r5sy8eGsyyog1Y+s/pwFBWGm7UYsOkVqZueMGJC6SJG7TkIOpEorARiwwyoagbBpUgoohBEQgIAghxUwPoBkDmDTK5/3k9CTBC6LKMgigQRCJaqLg4OLURS+GFGC5OGyylZTHklLFs5MUMBp0OtdGi+Z9eMvVYG7X4H2EXfPRRFlP/SS9MHnkEAFZQOCBOAAAA0AMAnQEqFAAYAD85irtUP6mmIzAIA/AnCWIAuwAs3ASwxcPee6owAMz/tbwJxFWTFAPm3IukeNzoMOhfLMvOjhL3IsOOBQlGtViWVBAA"
  },
  "/images/about/mystical-shaman.png": {
    "webp": "/optimized/images/about/mystical-shaman.webp",
    "fallback": "/optimized/images/about/mystical-shaman.png",
    "webpSrcSet": "/optimized/images/about/mystical-shaman-275w.webp 275w",
    "fallbackSrcSet": "/optimized/images/about/mystical-shaman-275w.png 275w",
    "width": 275,
    "height": 275,
    "lqip": "data:image/webp;base64,UklGRvIAAABXRUJQVlA4WAoAAAAQAAAAEwAAEwAAQUxQSJMAAAAJuYzof2ggRZIkybkAiT8QMRCK+5jZlwjEAgirf1m8ZQIgABETMAEPn9y59W7evHj1++z/98MA3nukuqyK0ExXDizuAkxdB8VlFSVmmmRRdAGqmRRRBc8AURA5FpNICghEcSog51GHH9shoAsiERDQQSQiIgIQlQqqgNDVioqKBN3tlKEiXVdOYopsXf8uDBOh7i4AVlA4IDgAAAAQAwCdASoUABQAPzmOwVavKaekqAqp4CcJZwDO7BgP4cAA/uq2F5jgwPGg16IWRcP4uvcQUigAAA=="
  },
  "/images/about/right-place.jpg": {
    "webp": "/optimized/images/about/right-place.webp",
    "fallback": "/optimized/images/about/right-place.jpg",
    "webpSrcSet": "/optimized/images/about/right-place-240w.webp 240w",
    "fallbackSrcSet": "/optimized/images/about/right-place-240w.jpg 240w",
    "width": 240,
    "height": 291,
    "lqip": "data:image/webp;base64,UklGRloAAABXRUJQVlA4IE4AAAAQAwCdASoUABgAPzmSu1i/qiWjqAqr8CcJQBibArWMiwAA/qukdOE3MXP4Ez9h5WzbSQ3t0DpJtqIPdAfRjnaohWEZAPbQ2Quvm7a+wAA="
  },
  "/images/about/spirit-animal.png": {
    "webp": "/optimized/images/about/spirit-animal.webp",
    "fallback": "/optimized/images/about/spirit-animal.png",
    "webpSrcSet": "/optimized/images/about/spirit-animal-275w.webp 275w",
    "fallbackSrcSet": "/optimized/images/about/spirit-animal-275w.png 275w",
    "width": 275,
    "height": 275,
    "lqip": "data:image/webp;base64,UklGRvoAAABXRUJQVlA4WAoAAAAQAAAAEwAAEwAAQUxQSJUAAAANuYzof2ggRZLkSNoTdI4/lGNwILR+HYEYAGH1L4v32sCImIAJePjkBrx78+LV9frsmPGD+ujAACxj+HkAzq2ACPrjz6CMBmhHyMIBDskEAhihsR3DDAKInE1mA5IkMMD4NYv/nOSP/M0Adsx2TDNpw8zQWtLWwGDHFnC6FzgboNmd4+QE2hEEtB1W/jQFgTOhLRGRFgBWUDggPgAAAFADAJ0BKhQAFAA/OZC9WDSppqOoCqqQJwljALUbL8JIXRAAAP7l16mPj5kohq/K26wFCJ4Vl5tqYak8VOAA"
  },
  "/images/about/the-map.jpg": {
    "webp": "/optimized/images/about/the-map.webp",
    "fallback": "/optimized/images/about/the-map.jpg",
    "webpSrcSet": "/optimized/images/about/the-map-240w.webp 240w",
    "fallbackSrcSet": "/optimized/images/about/the-map-240w.jpg 240w",
    "width": 240,
    "height": 291,
    "lqip": "data:image/webp;base64,UklGRlgAAABXRUJQVlA4IEwAAAAQBACdASoUABgAPzmOwVavKaejqAqp4CcJQBdgAhn13o1Sftxm1XxQAAD60tJfU7g125WC3cnW517FWdSea8RSe7eho7nHOEQ6BYAA"
  },
  "/images/about/wisdom-oracle.png": {
    "webp": "/optimized/images/about/wisdom-oracle.webp",
    "fallback": "/optimized/images/about/wisdom-oracle.png",
    "webpSrcSet": "/optimized/images/about/wisdom-oracle-275w.webp 275w",
    "fallbackSrcSet": "/optimized/images/about/wisdom-oracle-275w.png 275w",
    "width": 275,
    "height": 275,
    "lqip": "data:image/webp;base64,UklGRhQBAABXRUJQVlA4WAoAAAAQAAAAEwAAEwAAQUxQSJkAAAANuS5E9D8skCLbdq38T5CDfykowETOycEarTM6i2QgYgIm4OKVE3Dvxp3/W//Xhjk6eHDKSxNgeC5gjByNgAwMTEeDBAJnc2Q22gGzjREccbAcMzMhLcwsgAwCJFtytjCwkSwSICAEkS9vo41sRyAx3YBsM010FmkzMwRmEcoMMHNJhBzLMUmNcMyJ5FWDgHiZtq2Qji8ShAAAVlA4IFQAAAAwBACdASoUABQAPzV+t1OvJ6Uit/VYAeAmiWIAvzgFVLYB7bi7Z2k0UAAA+ZmjQwBNyUKFIH3Z2sDL5m7m4eSh/C6mJZJ7Szvn0dgQFDy+bg/PFAA="
  },
  "/images/art-of-manifesting.jpg": {
    "webp": "/optimized/images/art-of-manifesting.webp",
    "fallback": "/optimized/images/art-of-manifesting.jpg",
    "webpSrcSet": "/optimized/images/art-of-manifesting-331w.webp 331w, /optimized/images/art-of-manifesting-480w.webp 480w, /optimized/images/art-of-manifesting-662w.webp 662w, /optimized/images/art-of-manifesting-702w.webp 702w",
    "fallbackSrcSet": "/optimized/images/art-of-manifesting-331w.jpg 331w, /optimized/images/art-of-manifesting-480w.jpg 480w, /optimized/images/art-of-manifesting-662w.jpg 662w, /optimized/images/art-of-manifesting-702w.jpg 702w",
    "width": 702,
    "height": 702,
    "lqip": "data:image/webp;base64,UklGRlYAAABXRUJQVlA4IEoAAAAwAwCdASoUABQAPzmUwVmvKicqqAgB4CcJQBYj5fhJT1qoAP7ZK9vdeodpQn8jlq7PtYRkFZJHCpZJgBddwope5kHLAMoGAYAAAA=="
  },
  "/images/astera-VV.webp": {
    "webp": "/optimized/images/astera-VV.webp",
    "fallback": "/optimized/images/astera-VV.webp",
    "webpSrcSet": "/optimized/images/astera-VV-331w.webp 331w, /optimized/images/astera-VV-480w.webp 480w",
    "fallbackSrcSet": "/optimized/images/astera-VV-331w.webp 331w, /optimized/images/astera-VV-480w.webp 480w",
    "width": 480,
    "height": 676,
    "lqip": "data:image/webp;base64,UklGRg4BAABXRUJQVlA4WAoAAAAQAAAAEwAAGwAAQUxQSJsAAAANuS5E9D80Umvbdu0mqxj1X5JKEMrZhqbrF7DGwf+MVYCxAo+YgAm4fuPCqXPPevBz53g8/vzUf3+/bj3x0ZlArgjtwfkdsiQFTXZhHD53dpAYyHfCZjuQ0NICwmbtiGnibBWOfN6GQ9rS0saGHTB3dsFxR2NSWoBkJPzZMN8BkcwBdpYP09lZpo3Pk5w9LP4BmUz8ZWR/BcS/LQBWUDggTAAAAJADAJ0BKhQAHAA/KXi1U64nJSK3+qgBwCUJZQC+SCzDrZtQVgwA/uVULzuGJLHy8wcUL+Z2R/Id1Mu5Ded22TbrEbJbh+FpJXwQgAA="
  },
  "/images/astera-about-home.png": {
    "webp": "/optimized/images/astera-about-home.webp",
    "fallback": "/optimized/images/astera-about-home.png",
    "webpSrcSet": "/optimized/images/astera-about-home-331w.webp 331w, /optimized/images/astera-about-home-480w.webp 480w, /optimized/images/astera-about-home-579w.webp 579w",
    "fallbackSrcSet": "/optimized/images/astera-about-home-331w.png 331w, /optimized/images/astera-about-home-480w.png 480w, /optimized/images/astera-about-home-579w.png 579w",
    "width": 579,
    "height": 816,
    "lqip": "data:image/webp;base64,UklGRgwBAABXRUJQVlA4WAoAAAAQAAAAEwAAGwAAQUxQSJoAAAANuS5E9D80cmrbdu0mS2TEn5AYqAzOqXS7HoA1Tv3PWKXDgxExAfn02a0by0cfvHl1uVz+HcPu+efFJ8S3a4/4NraBg0gssXhC4Wxqyjgb4WxL2M7OCdmYae6oAaN8X8vsVHsstrQQG9POQqbZFns4AgqUYb1TQICEDCbnDPluJDnsHORbymwMhnyf7cjBxk9ygOTnYcQv4zcHVlA4IEwAAADQAwCdASoUABwAPyl2tVOuJyUit/qoAcAlCWUAsswex1vZSLZl7RwA/hzeGfyGrb+Lu4Qfkxq4WCFWjLnUXM9mEFTEGKoVk0d31AAA"
  },
  "/images/astera-fm.jpg": {
    "webp": "/optimized/images/astera-fm.webp",
    "fallback": "/optimized/images/astera-fm.jpg",
    "webpSrcSet": "/optimized/images/astera-fm-331w.webp 331w, /optimized/images/astera-fm-480w.webp 480w, /optimized/images/astera-fm-565w.webp 565w",
    "fallbackSrcSet": "/optimized/images/astera-fm-331w.jpg 331w, /optimized/images/astera-fm-480w.jpg 480w, /optimized/images/astera-fm-565w.jpg 565w",
    "width": 565,
    "height": 329,
    "lqip": "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAADQAgCdASoUAAwAPzmEuVO0qKWisAgCkCcJZwAAe/QAAP7s9BZbaxMKFqjAwPAA"
  },
  "/images/astera-hero-image-mobile.jpg": {
    "webp": "/optimized/images/astera-hero-image-mobile.webp",
    "fallback": "/optimized/images/astera-hero-image-mobile.jpg",
    "webpSrcSet": "/optimized/images/astera-hero-image-mobile-331w.webp 331w, /optimized/images/astera-hero-image-mobile-480w.webp 480w, /optimized/images/astera-hero-image-mobile-662w.webp 662w, /optimized/images/astera-hero-image-mobile-828w.webp 828w, /optimized/images/astera-hero-image-mobile-900w.webp 900w",
    "fallbackSrcSet": "/optimized/images/astera-hero-image-mobile-331w.jpg 331w, /optimized/images/astera-hero-image-mobile-480w.jpg 480w, /optimized/images/astera-hero-image-mobile-662w.jpg 662w, /optimized/images/astera-hero-image-mobile-828w.jpg 828w, /optimized/images/astera-hero-image-mobile-900w.jpg 900w",
    "width": 900,
    "height": 1100,
    "lqip": "data:image/webp;base64,UklGRlgAAABXRUJQVlA4IEwAAAAwBACdASoUABgAPzl+vVQvJ6ajMBgMAeAnCWUAv+wPSree8TxdwRubsdAA/tOEaM1VngXiAHjY1x3gnSuCLeU5cO68UZBCvoGHxwAA"
  },
  "/images/astera-hero-image.jpg": {
    "webp": "/optimized/images/astera-hero-image.webp",
    "fallback": "/optimized/images/astera-hero-image.jpg",
    "webpSrcSet": "/optimized/images/astera-hero-image-331w.webp 331w, /optimized/images/astera-hero-image-480w.webp 480w, /optimized/images/astera-hero-image-662w.webp 662w, /optimized/images/astera-hero-image-828w.webp 828w, /optimized/images/astera-hero-image-1200w.webp 1200w, /optimized/images/astera-hero-image-1600w.webp 1600w, /optimized/images/astera-hero-image-1788w.webp 1788w",
    "fallbackSrcSet": "/optimized/images/astera-hero-image-331w.jpg 331w, /optimized/images/astera-hero-image-480w.jpg 480w, /optimized/images/astera-hero-image-662w.jpg 662w, /optimized/images/astera-hero-image-828w.jpg 828w, /optimized/images/astera-hero-image-1200w.jpg 1200w, /optimized/images/astera-hero-image-1600w.jpg 1600w, /optimized/images/astera-hero-image-1788w.jpg 1788w",
    "width": 1788,
    "height": 880,
    "lqip": "data:image/webp;base64,UklGRkAAAABXRUJQVlA4IDQAAABQAwCdASoUAAoAPzmKulQ/qaWjMAgD8CcJZQC06C0H4jzvAAD+5dumvhaSzZbZA7pggAAA"
  },
  "/images/astera-home-bottom.jpg": {
    "webp": "/optimized/images/astera-home-bottom.webp",
    "fallback": "/optimized/images/astera-home-bottom.jpg",
    "webpSrcSet": "/optimized/images/astera-home-bottom-331w.webp 331w, /optimized/images/astera-home-bottom-480w.webp 480w, /optimized/images/astera-home-bottom-579w.webp 579w",
    "fallbackSrcSet": "/optimized/images/astera-home-bottom-331w.jpg 331w, /optimized/images/astera-home-bottom-480w.jpg 480w, /optimized/images/astera-home-bottom-579w.jpg 579w",
    "width": 579,
    "height": 511,
    "lqip": "data:image/webp;base64,UklGRkIAAABXRUJQVlA4IDYAAABQAwCdASoUABIAPzmKu1a/sSWpMBgIA/AnCWkAAB+6V7LaAAD+UuWNjY8vcH2i2s3sYau4AAA="
  },
  "/images/astera-home-top.png": {
    "webp": "/optimized/images/astera-home-top.webp",
    "fallback": "/optimized/images/astera-home-top.png",
    "webpSrcSet": "/optimized/images/astera-home-top-331w.webp 331w, /optimized/images/astera-home-top-480w.webp 480w, /optimized/images/astera-home-top-579w.webp 579w",
    "fallbackSrcSet": "/optimized/images/astera-home-top-331w.png 331w, /optimized/images/astera-home-top-480w.png 480w, /optimized/images/astera-home-top-579w.png 579w",
    "width": 579,
    "height": 305,
    "lqip": "data:image/webp;base64,UklGRtYAAABXRUJQVlA4WAoAAAAQAAAAEwAACgAAQUxQSHQAAAANuS5E9D80kCNJkqTsAUiC/oLBj+etRqwAYfWmLN5jI0bEBMTrNzd3V/yaL8en/+OYwXPffdjhjyEvJMdYBwhSsBNYCGiDth12zsFxzpFsR2exof1haklCAYmUgESQWApgOYnEBsTG9jBpS1JmiQe2oiDhaFZQOCA8AAAAsAMAnQEqFAALAD85jr5TryqnIrAIAeAnCWcAAFvss0GXc1mjjAAA/sNU4qogIRlK+NwbpNiUzNYoAAAA"
  },
  "/images/astera-logo.png": {
    "webp": "/optimized/images/astera-logo.webp",
    "fallback": "/optimized/images/astera-logo.png",
    "webpSrcSet": "/optimized/images/astera-logo-184w.webp 184w",
    "fallbackSrcSet": "/optimized/images/astera-logo-184w.png 184w",
    "width": 184,
    "height": 184,
    "lqip": "data:image/webp;base64,UklGRsYAAABXRUJQVlA4WAoAAAAQAAAAEwAAEwAAQUxQSHoAAAABuTJE9D8cjts2kiR0T/4p71U9sylI0CdiAibgumyZCry9ZNZiMo1ziDgyjKSNKQ9fWETwzUaGpEDmIAkEBGgYnP4/dTKBuM0kATwkZHJsZGBmYAaZ3JsRZDeS8LKEAZgkQEEODAMc5EgA4WUJCMxAwLIAM5kW8VzaAFZQOCAmAAAA0AIAnQEqFAAUAD85mMNaLyqnpCgIAeAnCWkAAD2joAD+73JAAAA="
  },
  "/images/astera-pick-card.png": {
    "webp": "/optimized/images/astera-pick-card.webp",
    "fallback": "/optimized/images/astera-pick-card.png",
    "webpSrcSet": "/optimized/images/astera-pick-card-331w.webp 331w, /optimized/images/astera-pick-card-480w.webp 480w, /optimized/images/astera-pick-card-579w.webp 579w",
    "fallbackSrcSet": "/optimized/images/astera-pick-card-331w.png 331w, /optimized/images/astera-pick-card-480w.png 480w, /optimized/images/astera-pick-card-579w.png 579w",
    "width": 579,
    "height": 816,
    "lqip": "data:image/webp;base64,UklGRgwBAABXRUJQVlA4WAoAAAAQAAAAEwAAGwAAQUxQSJoAAAANuS5E9D80cmrbdu0mS2TEn5AYqAzOqXS7HoA1Tv3PWKXDgxExAfn02a0by0cfvHl1uVz+HcPu+efFJ8S3a4/4NraBg0gssXhC4Wxqyjgb4WxL2M7OCdmYae6oAaN8X8vsVHsstrQQG9POQqbZFns4AgqUYb1TQICEDCbnDPluJDnsHORbymwMhnyf7cjBxk9ygOTnYcQv4zcHVlA4IEwAAADQAwCdASoUABwAPyl2tVOuJyUit/qoAcAlCWUAsswex1vZSLZl7RwA/hzeGfyGrb+Lu4Qfkxq4WCFWjLnUXM9mEFTEGKoVk0d31AAA"
  },
  "/images/astera-with-computer.jpg": {
    "webp": "/optimized/images/astera-with-computer.webp",
    "fallback": "/optimized/images/astera-with-computer.jpg",
    "webpSrcSet": "/optimized/images/astera-with-computer-331w.webp 331w, /optimized/images/astera-with-computer-480w.webp 480w, /optimized/images/astera-with-computer-662w.webp 662w, /optimized/images/astera-with-computer-828w.webp 828w, /optimized/images/astera-with-computer-866w.webp 866w",
    "fallbackSrcSet": "/optimized/images/astera-with-computer-331w.jpg 331w, /optimized/images/astera-with-computer-480w.jpg 480w, /optimized/images/astera-with-computer-662w.jpg 662w, /optimized/images/astera-with-computer-828w.jpg 828w, /optimized/images/astera-with-computer-866w.jpg 866w",
    "width": 866,
    "height": 668,
    "lqip": "data:image/webp;base64,UklGRkIAAABXRUJQVlA4IDYAAACwAgCdASoUAA8ALvmczmcnLy8vDwD4SgCw7CUplAAA55XplRUy5ITHbIXjebMDIRyoMvdUAAA="
  },
  "/images/crystal-ball-astera.png": {
    "webp": "/optimized/images/crystal-ball-astera.webp",
    "fallback": "/optimized/images/crystal-ball-astera.png",
    "webpSrcSet": "/optimized/images/crystal-ball-astera-331w.webp 331w, /optimized/images/crystal-ball-astera-480w.webp 480w, /optimized/images/crystal-ball-astera-660w.webp 660w",
    "fallbackSrcSet": "/optimized/images/crystal-ball-astera-331w.png 331w, /optimized/images/crystal-ball-astera-480w.png 480w, /optimized/images/crystal-ball-astera-660w.png 660w",
    "width": 660,
    "height": 440,
    "lqip": "data:image/webp;base64,UklGRuQAAABXRUJQVlA4WAoAAAAQAAAAEwAADAAAQUxQSHMAAAAJuS5E9D80kCJJciSt+B9/sFqAiAEQlv+2ALAwIiZgAh7vRPjE9gGmypd6eDoee1NXWxO0pDMRyKAUTgaE8bd2LlkkBdHmZbBVWE7fKRa0DGLI/wHxh4JARJPo70BUR1JrFagv4m+sK+IcttMBxGDY9gICAFZQOCBKAAAAkAMAnQEqFAANAD85iL5TryknIrAIAeAnCWUAAR7wthIlNefywAD+9mlREs0yWGGOvGTPnYQXp1vPYpIneuJba2cMuLl9jgd8QAA="
  },
  "/images/kniha-astera.png": {
    "webp": "/optimized/images/kniha-astera.webp",
    "fallback": "/optimized/images/kniha-astera.jpg",
    "webpSrcSet": "/optimized/images/kniha-astera-331w.webp 331w, /optimized/images/kniha-astera-480w.webp 480w, /optimized/images/kniha-astera-662w.webp 662w, /optimized/images/kniha-astera-702w.webp 702w",
    "fallbackSrcSet": "/optimized/images/kniha-astera-331w.jpg 331w, /optimized/images/kniha-astera-480w.jpg 480w, /optimized/images/kniha-astera-662w.jpg 662w, /optimized/images/kniha-astera-702w.jpg 702w",
    "width": 702,
    "height": 702,
    "lqip": "data:image/webp;base64,UklGRl4AAABXRUJQVlA4IFIAAAAQAwCdASoUABQAPzmKu1UvKSYjKA1R4CcJQBYdgtZni4AAzPusV+Cu6CO4uuvXrp6+mvxd2Ihxll3QBH1YbQyiTZAFNYUvLCOkFqpJyt+j0AAA"
  },
  "/images/koule.jpg": {
    "webp": "/optimized/images/koule.webp",
    "fallback": "/optimized/images/koule.jpg",
    "webpSrcSet": "/optimized/images/koule-331w.webp 331w, /optimized/images/koule-480w.webp 480w, /optimized/images/koule-662w.webp 662w, /optimized/images/koule-828w.webp 828w, /optimized/images/koule-1000w.webp 1000w",
    "fallbackSrcSet": "/optimized/images/koule-331w.jpg 331w, /optimized/images/koule-480w.jpg 480w, /optimized/images/koule-662w.jpg 662w, /optimized/images/koule-828w.jpg 828w, /optimized/images/koule-1000w.jpg 1000w",
    "width": 1000,
    "height": 667,
    "lqip": "data:image/webp;base64,UklGRkgAAABXRUJQVlA4IDwAAACwAgCdASoUAA0APzmGuVO+qSWisAgD0CcJQAAPx8AA/uspdcHTStYaSfv761fgo/HBy089JiirpHAcAAA="
  },
  "/images/moon-phases/0.png": {
    "webp": "/optimized/images/moon-phases/0.webp",
    "fallback": "/optimized/images/moon-phases/0.png",
    "webpSrcSet": "/optimized/images/moon-phases/0-300w.webp 300w",
    "fallbackSrcSet": "/optimized/images/moon-phases/0-300w.png 300w",
    "width": 300,
    "height": 300,
    "lqip": "data:image/webp;base64,UklGRgIBAABXRUJQVlA4WAoAAAAQAAAAEwAAEwAAQUxQSKwAAAANuS5E9D80ciNJciQJIxFOfwWPxuiFiBEgrB5wZSHACbDPR0xAPnx0YeHNu1cvjtOchjh36d8TIkuuzD2nrZ8ASkiGHcXIsVzCkYyIhJAgCZttBAPHxkYJMBSx0dlhM8wxDmOHHcFosxMwegjOUsIBSAskv3j6DzibJdnmkTA/EZJtMIQ7S5DtLB0AbVi2s7nMQlqI6UbSyMj3SgLhKN+2iUsmmYYJmZAkCWICVlA4IDAAAAAQAwCdASoUABQAPzmWwVmvKqcjqAgB4CcJaQDMWBhxsQAA/u4PRUg+u/Jkl99IAAA="
  },
  "/images/moon-phases/1.png": {
    "webp": "/optimized/images/moon-phases/1.webp",
    "fallback": "/optimized/images/moon-phases/1.png",
    "webpSrcSet": "/optimized/images/moon-phases/1-300w.webp 300w",
    "fallbackSrcSet": "/optimized/images/moon-phases/1-300w.png 300w",
    "width": 300,
    "height": 300,
    "lqip": "data:image/webp;base64,UklGRvwAAABXRUJQVlA4WAoAAAAQAAAAEwAAEwAAQUxQSKcAAAANkBhJkiJJEXVMApz+Ii4cV9zzixARE/B89/D09PRwf3PB5/v5eDwcTue7i4sZR4Rqd7/2cWZGUYr6zcWMg4RU7e7TjAqGQW37pGMSIFB9PYwg/UaC5R6FMkwh9kawDJo06EIgF7BJ/vvnLzZJZL+8L6RNGIvgmQJNMkLmWBkMsIAMx60FkwzRi8PuEn+WC+ew21a/US6cOX3t/pUzF3Per92tAHV+AQBWUDggLgAAABADAJ0BKhQAFAA/OYi+Vr6oJqOwGAgD0CcJaQAAPj89AAD+7uOXXDaEOjHAAAA="
  },
  "/images/moon-phases/10.png": {
    "webp": "/optimized/images/moon-phases/10.webp",
    "fallback": "/optimized/images/moon-phases/10.png",
    "webpSrcSet": "/optimized/images/moon-phases/10-300w.webp 300w",
    "fallbackSrcSet": "/optimized/images/moon-phases/10-300w.png 300w",
    "width": 300,
    "height": 300,
    "lqip": "data:image/webp;base64,UklGRhIBAABXRUJQVlA4WAoAAAAQAAAAEwAAEwAAQUxQSKcAAAANkBhJkiJJEXVMApz+Ii4cV9zzixARE/B89/D09PRwf3PB5/v5eDwcTue7i4sZR4Rqd7/2cWZGUYr6zcWMg4RU7e7TjAqGQW37pGMSIFB9PYwg/UaC5R6FMkwh9kawDJo06EIgF7BJ/vvnLzZJZL+8L6RNGIvgmQJNMkLmWBkMsIAMx60FkwzRi8PuEn+WC+ew21a/US6cOX3t/pUzF3Per92tAHV+AQBWUDggRAAAAFAEAJ0BKhQAFAA/OZC6VS8qpaQwGAgB4CcJZQAAIaw2WyvhyrCaNOaLLAAA/tAiy2PDQaeyR2c6sbUsFn7E4RWBCAAA"
  },
  "/images/moon-phases/11.png": {
    "webp": "/optimized/images/moon-phases/11.webp",
    "fallback": "/optimized/images/moon-phases/11.png",
    "webpSrcSet": "/optimized/images/moon-phases/11-300w.webp 300w",
    "fallbackSrcSet": "/optimized/images/moon-phases/11-300w.png 300w",
    "width": 300,
    "height": 300,
    "lqip": "data:image/webp;base64,UklGRhABAABXRUJQVlA4WAoAAAAQAAAAEwAAEwAAQUxQSKcAAAANkBhJkiJJEXVMApz+Ii4cV9zzixARE/B89/D09PRwf3PB5/v5eDwcTue7i4sZR4Rqd7/2cWZGUYr6zcWMg4RU7e7TjAqGQW37pGMSIFB9PYwg/UaC5R6FMkwh9kawDJo06EIgF7BJ/vvnLzZJZL+8L6RNGIvgmQJNMkLmWBkMsIAMx60FkwzRi8PuEn+WC+ew21a/US6cOX3t/pUzF3Per92tAHV+AQBWUDggQgAAANADAJ0BKhQAFAA/OYy6VC8qJaMwCAHgJwllAMukGMUgKyRZuiRDAAD+6O3cDtkyk8+j1Q0bIgHlN426PjAEKyP8AA=="
  },
  "/images/moon-phases/12.png": {
    "webp": "/optimized/images/moon-phases/12.webp",
    "fallback": "/optimized/images/moon-phases/12.png",
    "webpSrcSet": "/optimized/images/moon-phases/12-300w.webp 300w",
    "fallbackSrcSet": "/optimized/images/moon-phases/12-300w.png 300w",
    "width": 300,
    "height": 300,
    "lqip": "data:image/webp;base64,UklGRgwBAABXRUJQVlA4WAoAAAAQAAAAEwAAEwAAQUxQSKcAAAANkBhJkiJJEXVMApz+Ii4cV9zzixARE/B89/D09PRwf3PB5/v5eDwcTue7i4sZR4Rqd7/2cWZGUYr6zcWMg4RU7e7TjAqGQW37pGMSIFB9PYwg/UaC5R6FMkwh9kawDJo06EIgF7BJ/vvnLzZJZL+8L6RNGIvgmQJNMkLmWBkMsIAMx60FkwzRi8PuEn+WC+ew21a/US6cOX3t/pUzF3Per92tAHV+AQBWUDggPgAAAHADAJ0BKhQAFAA/LYK3U7MpMSKwDAJgJYlnAABCtyGhcS+HwAD+7qFRp3gjCHdlC4mo/SGJrQMtfG7dmAAA"
  },
  "/images/moon-phases/13.png": {
    "webp": "/optimized/images/moon-phases/13.webp",
    "fallback": "/optimized/images/moon-phases/13.png",
    "webpSrcSet": "/optimized/images/moon-phases/13-300w.webp 300w",
    "fallbackSrcSet": "/optimized/images/moon-phases/13-300w.png 300w",
    "width": 300,
    "height": 300,
    "lqip": "data:image/webp;base64,UklGRg4BAABXRUJQVlA4WAoAAAAQAAAAEwAAEwAAQUxQSKcAAAANkBhJkiJJEXVMApz+Ii4cV9zzixARE/B89/D09PRwf3PB5/v5eDwcTue7i4sZR4Rqd7/2cWZGUYr6zcWMg4RU7e7TjAqGQW37pGMSIFB9PYwg/UaC5R6FMkwh9kawDJo06EIgF7BJ/vvnLzZJZL+8L6RNGIvgmQJNMkLmWBkMsIAMx60FkwzRi8PuEn+WC+ew21a/US6cOX3t/pUzF3Per92tAHV+AQBWUDggQAAAAJADAJ0BKhQAFAA/KYC0U64opSK3+qgBwCUJZwDJECFSZH3E+NAA/u6IW5bOxJAPBmd2ST2/Q8dSECMLXIEAAAA="
  },
  "/images/moon-phases/14.png": {
    "webp": "/optimized/images/moon-phases/14.webp",
    "fallback": "/optimized/images/moon-phases/14.png",
    "webpSrcSet": "/optimized/images/moon-phases/14-300w.webp 300w",
    "fallbackSrcSet": "/optimized/images/moon-phases/14-300w.png 300w",
    "width": 300,
    "height": 300,
    "lqip": "data:image/webp;base64,UklGRhABAABXRUJQVlA4WAoAAAAQAAAAEwAAEwAAQUxQSKcAAAANkBhJkiJJEXVMApz+Ii4cV9zzixARE/B89/D09PRwf3PB5/v5eDwcTue7i4sZR4Rqd7/2cWZGUYr6zcWMg4RU7e7TjAqGQW37pGMSIFB9PYwg/UaC5R6FMkwh9kawDJo06EIgF7BJ/vvnLzZJZL+8L6RNGIvgmQJNMkLmWBkMsIAMx60FkwzRi8PuEn+WC+ew21a/US6cOX3t/pUzF3Per92tAHV+AQBWUDggQgAAABADAJ0BKhQAFAA/OYy7VK8ppiQwCAHgJwlnAMzQKh2cIAD+7re+cXa1apHZFR87DBkdynlBqHWzc3Mx6nWTxiTAAA=="
  },
  "/images/moon-phases/15.png": {
    "webp": "/optimized/images/moon-phases/15.webp",
    "fallback": "/optimized/images/moon-phases/15.png",
    "webpSrcSet": "/optimized/images/moon-phases/15-300w.webp 300w",
    "fallbackSrcSet": "/optimized/images/moon-phases/15-300w.png 300w",
    "width": 300,
    "height": 300,
    "lqip": "data:image/webp;base64,UklGRgQBAABXRUJQVlA4WAoAAAAQAAAAEwAAEwAAQUxQSKcAAAANkBhJkiJJEXVMApz+Ii4cV9zzixARE/B89/D09PRwf3PB5/v5eDwcTue7i4sZR4Rqd7/2cWZGUYr6zcWMg4RU7e7TjAqGQW37pGMSIFB9PYwg/UaC5R6FMkwh9kawDJo06EIgF7BJ/vvnLzZJZL+8L6RNGIvgmQJNMkLmWBkMsIAMx60FkwzRi8PuEn+WC+ew21a/US6cOX3t/pUzF3Per92tAHV+AQBWUDggNgAAABADAJ0BKhQAFAA/OYq8Vi8pJiSwGAgB4CcJaQAAOrQlQAD+71wSSrR21dvY3zHwSD2A8HAAAA=="
  },
  "/images/moon-phases/2.png": {
    "webp": "/optimized/images/moon-phases/2.webp",
    "fallback": "/optimized/images/moon-phases/2.png",
    "webpSrcSet": "/optimized/images/moon-phases/2-300w.webp 300w",
    "fallbackSrcSet": "/optimized/images/moon-phases/2-300w.png 300w",
    "width": 300,
    "height": 300,
    "lqip": "data:image/webp;base64,UklGRgIBAABXRUJQVlA4WAoAAAAQAAAAEwAAEwAAQUxQSKcAAAANkBhJkiJJEXVMApz+Ii4cV9zzixARE/B89/D09PRwf3PB5/v5eDwcTue7i4sZR4Rqd7/2cWZGUYr6zcWMg4RU7e7TjAqGQW37pGMSIFB9PYwg/UaC5R6FMkwh9kawDJo06EIgF7BJ/vvnLzZJZL+8L6RNGIvgmQJNMkLmWBkMsIAMx60FkwzRi8PuEn+WC+ew21a/US6cOX3t/pUzF3Per92tAHV+AQBWUDggNAAAAPACAJ0BKhQAFAA/OYa6U68pJaKwCAHgJwlnAAB7cbQAAP7tp/NBWwrxh/y8/iMdwf4AAAA="
  },
  "/images/moon-phases/3.png": {
    "webp": "/optimized/images/moon-phases/3.webp",
    "fallback": "/optimized/images/moon-phases/3.png",
    "webpSrcSet": "/optimized/images/moon-phases/3-300w.webp 300w",
    "fallbackSrcSet": "/optimized/images/moon-phases/3-300w.png 300w",
    "width": 300,
    "height": 300,
    "lqip": "data:image/webp;base64,UklGRgYBAABXRUJQVlA4WAoAAAAQAAAAEwAAEwAAQUxQSKcAAAANkBhJkiJJEXVMApz+Ii4cV9zzixARE/B89/D09PRwf3PB5/v5eDwcTue7i4sZR4Rqd7/2cWZGUYr6zcWMg4RU7e7TjAqGQW37pGMSIFB9PYwg/UaC5R6FMkwh9kawDJo06EIgF7BJ/vvnLzZJZL+8L6RNGIvgmQJNMkLmWBkMsIAMx60FkwzRi8PuEn+WC+ew21a/US6cOX3t/pUzF3Per92tAHV+AQBWUDggOAAAALADAJ0BKhQAFAA/OYa5U68pJaKwCAHgJwlnAABSTKSkoJZns7QAAP0hvaK30x3Co3PFFHgBAAAA"
  },
  "/images/moon-phases/4.png": {
    "webp": "/optimized/images/moon-phases/4.webp",
    "fallback": "/optimized/images/moon-phases/4.png",
    "webpSrcSet": "/optimized/images/moon-phases/4-300w.webp 300w",
    "fallbackSrcSet": "/optimized/images/moon-phases/4-300w.png 300w",
    "width": 300,
    "height": 300,
    "lqip": "data:image/webp;base64,UklGRgwBAABXRUJQVlA4WAoAAAAQAAAAEwAAEwAAQUxQSKcAAAANkBhJkiJJEXVMApz+Ii4cV9zzixARE/B89/D09PRwf3PB5/v5eDwcTue7i4sZR4Rqd7/2cWZGUYr6zcWMg4RU7e7TjAqGQW37pGMSIFB9PYwg/UaC5R6FMkwh9kawDJo06EIgF7BJ/vvnLzZJZL+8L6RNGIvgmQJNMkLmWBkMsIAMx60FkwzRi8PuEn+WC+ew21a/US6cOX3t/pUzF3Per92tAHV+AQBWUDggPgAAALADAJ0BKhQAFAA/OYa5U68pJaKwCAHgJwlnAM3AFFQ+Atm1fbeAAO87sA9DJslICY0aMpCBxOt/e+LHIAAA"
  },
  "/images/moon-phases/5.png": {
    "webp": "/optimized/images/moon-phases/5.webp",
    "fallback": "/optimized/images/moon-phases/5.png",
    "webpSrcSet": "/optimized/images/moon-phases/5-300w.webp 300w",
    "fallbackSrcSet": "/optimized/images/moon-phases/5-300w.png 300w",
    "width": 300,
    "height": 300,
    "lqip": "data:image/webp;base64,UklGRg4BAABXRUJQVlA4WAoAAAAQAAAAEwAAEwAAQUxQSKcAAAANkBhJkiJJEXVMApz+Ii4cV9zzixARE/B89/D09PRwf3PB5/v5eDwcTue7i4sZR4Rqd7/2cWZGUYr6zcWMg4RU7e7TjAqGQW37pGMSIFB9PYwg/UaC5R6FMkwh9kawDJo06EIgF7BJ/vvnLzZJZL+8L6RNGIvgmQJNMkLmWBkMsIAMx60FkwzRi8PuEn+WC+ew21a/US6cOX3t/pUzF3Per92tAHV+AQBWUDggQAAAAHADAJ0BKhQAFAA/NYC3U682pSK39VgC0CaJZQAAGvdxRIP0wADtOf8MJD6J1QRwHfC4wAxiv+KhEgjhsM0AAAA="
  },
  "/images/moon-phases/6.png": {
    "webp": "/optimized/images/moon-phases/6.webp",
    "fallback": "/optimized/images/moon-phases/6.png",
    "webpSrcSet": "/optimized/images/moon-phases/6-300w.webp 300w",
    "fallbackSrcSet": "/optimized/images/moon-phases/6-300w.png 300w",
    "width": 300,
    "height": 300,
    "lqip": "data:image/webp;base64,UklGRhABAABXRUJQVlA4WAoAAAAQAAAAEwAAEwAAQUxQSKcAAAANkBhJkiJJEXVMApz+Ii4cV9zzixARE/B89/D09PRwf3PB5/v5eDwcTue7i4sZR4Rqd7/2cWZGUYr6zcWMg4RU7e7TjAqGQW37pGMSIFB9PYwg/UaC5R6FMkwh9kawDJo06EIgF7BJ/vvnLzZJZL+8L6RNGIvgmQJNMkLmWBkMsIAMx60FkwzRi8PuEn+WC+ew21a/US6cOX3t/pUzF3Per92tAHV+AQBWUDggQgAAAPADAJ0BKhQAFAA/OYq3U68qJSKwGAwB4CcJZQCykAjn0gld93kg5KAAmsH6ReT+rnTdrlikgPGENdE9ElmG3XDAAA=="
  },
  "/images/moon-phases/7.png": {
    "webp": "/optimized/images/moon-phases/7.webp",
    "fallback": "/optimized/images/moon-phases/7.png",
    "webpSrcSet": "/optimized/images/moon-phases/7-300w.webp 300w",
    "fallbackSrcSet": "/optimized/images/moon-phases/7-300w.png 300w",
    "width": 300,
    "height": 300,
    "lqip": "data:image/webp;base64,UklGRg4BAABXRUJQVlA4WAoAAAAQAAAAEwAAEwAAQUxQSKcAAAANkBhJkiJJEXVMApz+Ii4cV9zzixARE/B89/D09PRwf3PB5/v5eDwcTue7i4sZR4Rqd7/2cWZGUYr6zcWMg4RU7e7TjAqGQW37pGMSIFB9PYwg/UaC5R6FMkwh9kawDJo06EIgF7BJ/vvnLzZJZL+8L6RNGIvgmQJNMkLmWBkMsIAMx60FkwzRi8PuEn+WC+ew21a/US6cOX3t/pUzF3Per92tAHV+AQBWUDggQAAAAHADAJ0BKhQAFAA/OYi5VDSpJbEwCAKQJwllAMNwBNvrIPc4AADnMJsaREPYc4vnxbjzeJ1UMqBBrjUOyEAAAAA="
  },
  "/images/moon-phases/8.png": {
    "webp": "/optimized/images/moon-phases/8.webp",
    "fallback": "/optimized/images/moon-phases/8.png",
    "webpSrcSet": "/optimized/images/moon-phases/8-300w.webp 300w",
    "fallbackSrcSet": "/optimized/images/moon-phases/8-300w.png 300w",
    "width": 300,
    "height": 300,
    "lqip": "data:image/webp;base64,UklGRg4BAABXRUJQVlA4WAoAAAAQAAAAEwAAEwAAQUxQSKcAAAANkBhJkiJJEXVMApz+Ii4cV9zzixARE/B89/D09PRwf3PB5/v5eDwcTue7i4sZR4Rqd7/2cWZGUYr6zcWMg4RU7e7TjAqGQW37pGMSIFB9PYwg/UaC5R6FMkwh9kawDJo06EIgF7BJ/vvnLzZJZL+8L6RNGIvgmQJNMkLmWBkMsIAMx60FkwzRi8PuEn+WC+ew21a/US6cOX3t/pUzF3Per92tAHV+AQBWUDggQAAAAJADAJ0BKhQAFAA/OY65Vz+ppSOoDVPwJwllALsAGAIuczQN4HAAzP+0q9VBH0XKWSallKSaxAelXQNQt6oAAAA="
  },
  "/images/moon-phases/9.png": {
    "webp": "/optimized/images/moon-phases/9.webp",
    "fallback": "/optimized/images/moon-phases/9.png",
    "webpSrcSet": "/optimized/images/moon-phases/9-300w.webp 300w",
    "fallbackSrcSet": "/optimized/images/moon-phases/9-300w.png 300w",
    "width": 300,
    "height": 300,
    "lqip": "data:image/webp;base64,UklGRgwBAABXRUJQVlA4WAoAAAAQAAAAEwAAEwAAQUxQSKcAAAANkBhJkiJJEXVMApz+Ii4cV9zzixARE/B89/D09PRwf3PB5/v5eDwcTue7i4sZR4Rqd7/2cWZGUYr6zcWMg4RU7e7TjAqGQW37pGMSIFB9PYwg/UaC5R6FMkwh9kawDJo06EIgF7BJ/vvnLzZJZL+8L6RNGIvgmQJNMkLmWBkMsIAMx60FkwzRi8PuEn+WC+ew21a/US6cOX3t/pUzF3Per92tAHV+AQBWUDggPgAAAPADAJ0BKhQAFAA/OY67Vi8qJaOwGAgB4CcJZwDMHAg1/te2XSnTHwAA/g+CeD0Dr+a9Y3dg3ItqRrnIugAA"
  },
  "/images/new-book-icon.png": {
    "webp": "/optimized/images/new-book-icon.webp",
    "fallback": "/optimized/images/new-book-icon.png",
    "webpSrcSet": "/optimized/images/new-book-icon-141w.webp 141w",
    "fallbackSrcSet": "/optimized/images/new-book-icon-141w.png 141w",
    "width": 141,
    "height": 27,
    "lqip": "data:image/webp;base64,UklGRpQAAABXRUJQVlA4WAoAAAAQAAAAEwAAAwAAQUxQSDgAAAABuTJE9D8cDiNJchogMPKPyRspiN5aioqYgAmYb77Vu/je3cGpg7ZJRhA0aIrJj1MaJUXzBxX1G1ZQOCA2AAAA8AIAnQEqFAAEAD85hrpTryklorAIAeAnCUAToAWWEAAA/lMWzX2GJPr7yh2IDuuO1HbiQAAA"
  },
  "/images/oracle-video-thumb.jpg": {
    "webp": "/optimized/images/oracle-video-thumb.webp",
    "fallback": "/optimized/images/oracle-video-thumb.jpg",
    "webpSrcSet": "/optimized/images/oracle-video-thumb-331w.webp 331w, /optimized/images/oracle-video-thumb-480w.webp 480w, /optimized/images/oracle-video-thumb-662w.webp 662w, /optimized/images/oracle-video-thumb-828w.webp 828w, /optimized/images/oracle-video-thumb-1200w.webp 1200w, /optimized/images/oracle-video-thumb-1280w.webp 1280w",
    "fallbackSrcSet": "/optimized/images/oracle-video-thumb-331w.jpg 331w, /optimized/images/oracle-video-thumb-480w.jpg 480w, /optimized/images/oracle-video-thumb-662w.jpg 662w, /optimized/images/oracle-video-thumb-828w.jpg 828w, /optimized/images/oracle-video-thumb-1200w.jpg 1200w, /optimized/images/oracle-video-thumb-1280w.jpg 1280w",
    "width": 1280,
    "height": 720,
    "lqip": "data:image/webp;base64,UklGRkgAAABXRUJQVlA4IDwAAABwAwCdASoUAAsAPzmIuVOvKSWisAgB4CcJQBOmUABLQRg/6QAA/c4orzJK3c868d19mY5GfQc48qXCwAA="
  },
  "/images/vyber-si-kartu.png": {
    "webp": "/optimized/images/vyber-si-kartu.webp",
    "fallback": "/optimized/images/vyber-si-kartu.jpg",
    "webpSrcSet": "/optimized/images/vyber-si-kartu-331w.webp 331w, /optimized/images/vyber-si-kartu-480w.webp 480w, /optimized/images/vyber-si-kartu-662w.webp 662w, /optimized/images/vyber-si-kartu-702w.webp 702w",
    "fallbackSrcSet": "/optimized/images/vyber-si-kartu-331w.jpg 331w, /optimized/images/vyber-si-kartu-480w.jpg 480w, /optimized/images/vyber-si-kartu-662w.jpg 662w, /optimized/images/vyber-si-kartu-702w.jpg 702w",
    "width": 702,
    "height": 702,
    "lqip": "data:image/webp;base64,UklGRkwAAABXRUJQVlA4IEAAAABwAwCdASoUABQAPzmUwVo/qaclKAgD8CcJZwDA3BdvJAi3RAAA/ugjWW0L3Pe7u2w3AcbtxvfC3voTjYV/gAAA"
  },
  "/uploads/astera-upload-1777542736772-d2souok25x7.png": {
    "webp": "/optimized/uploads/astera-upload-1777542736772-d2souok25x7.webp",
    "fallback": "/optimized/uploads/astera-upload-1777542736772-d2souok25x7.jpg",
    "webpSrcSet": "/optimized/uploads/astera-upload-1777542736772-d2souok25x7-331w.webp 331w, /optimized/uploads/astera-upload-1777542736772-d2souok25x7-480w.webp 480w, /optimized/uploads/astera-upload-1777542736772-d2souok25x7-662w.webp 662w, /optimized/uploads/astera-upload-1777542736772-d2souok25x7-828w.webp 828w, /optimized/uploads/astera-upload-1777542736772-d2souok25x7-1200w.webp 1200w, /optimized/uploads/astera-upload-1777542736772-d2souok25x7-1600w.webp 1600w, /optimized/uploads/astera-upload-1777542736772-d2souok25x7-1787w.webp 1787w",
    "fallbackSrcSet": "/optimized/uploads/astera-upload-1777542736772-d2souok25x7-331w.jpg 331w, /optimized/uploads/astera-upload-1777542736772-d2souok25x7-480w.jpg 480w, /optimized/uploads/astera-upload-1777542736772-d2souok25x7-662w.jpg 662w, /optimized/uploads/astera-upload-1777542736772-d2souok25x7-828w.jpg 828w, /optimized/uploads/astera-upload-1777542736772-d2souok25x7-1200w.jpg 1200w, /optimized/uploads/astera-upload-1777542736772-d2souok25x7-1600w.jpg 1600w, /optimized/uploads/astera-upload-1777542736772-d2souok25x7-1787w.jpg 1787w",
    "width": 1787,
    "height": 880,
    "lqip": "data:image/webp;base64,UklGRkAAAABXRUJQVlA4IDQAAAAwAwCdASoUAAoAPzmGvFQ/qSYjMAgD8CcJZQCo9C0Hg58AAP7k6IJzWajaPf8TyHYePpAA"
  },
  "/uploads/astera-upload-1777542744600-mjff29y2d1k.png": {
    "webp": "/optimized/uploads/astera-upload-1777542744600-mjff29y2d1k.webp",
    "fallback": "/optimized/uploads/astera-upload-1777542744600-mjff29y2d1k.jpg",
    "webpSrcSet": "/optimized/uploads/astera-upload-1777542744600-mjff29y2d1k-331w.webp 331w, /optimized/uploads/astera-upload-1777542744600-mjff29y2d1k-480w.webp 480w, /optimized/uploads/astera-upload-1777542744600-mjff29y2d1k-662w.webp 662w, /optimized/uploads/astera-upload-1777542744600-mjff29y2d1k-828w.webp 828w, /optimized/uploads/astera-upload-1777542744600-mjff29y2d1k-866w.webp 866w",
    "fallbackSrcSet": "/optimized/uploads/astera-upload-1777542744600-mjff29y2d1k-331w.jpg 331w, /optimized/uploads/astera-upload-1777542744600-mjff29y2d1k-480w.jpg 480w, /optimized/uploads/astera-upload-1777542744600-mjff29y2d1k-662w.jpg 662w, /optimized/uploads/astera-upload-1777542744600-mjff29y2d1k-828w.jpg 828w, /optimized/uploads/astera-upload-1777542744600-mjff29y2d1k-866w.jpg 866w",
    "width": 866,
    "height": 670,
    "lqip": "data:image/webp;base64,UklGRjwAAABXRUJQVlA4IDAAAABwAQCdASoUAA8ABUB8JQBdgAPNAADsoC8gX2X8THbIdstEoHLWtc62pcHRrzAAAAA="
  },
  "/uploads/astera-upload-1777543712527-v1mmzjakq5.png": {
    "webp": "/optimized/uploads/astera-upload-1777543712527-v1mmzjakq5.webp",
    "fallback": "/optimized/uploads/astera-upload-1777543712527-v1mmzjakq5.jpg",
    "webpSrcSet": "/optimized/uploads/astera-upload-1777543712527-v1mmzjakq5-331w.webp 331w, /optimized/uploads/astera-upload-1777543712527-v1mmzjakq5-480w.webp 480w, /optimized/uploads/astera-upload-1777543712527-v1mmzjakq5-662w.webp 662w, /optimized/uploads/astera-upload-1777543712527-v1mmzjakq5-702w.webp 702w",
    "fallbackSrcSet": "/optimized/uploads/astera-upload-1777543712527-v1mmzjakq5-331w.jpg 331w, /optimized/uploads/astera-upload-1777543712527-v1mmzjakq5-480w.jpg 480w, /optimized/uploads/astera-upload-1777543712527-v1mmzjakq5-662w.jpg 662w, /optimized/uploads/astera-upload-1777543712527-v1mmzjakq5-702w.jpg 702w",
    "width": 702,
    "height": 702,
    "lqip": "data:image/webp;base64,UklGRlYAAABXRUJQVlA4IEoAAABQBACdASoUABQAPzmCvFcvJ6WjsBgIAeAnCWUAxNgPNqyZbAa14N2OaQKIAP3SYI1cJBtzGEA+VnMzHsuyDkMEi15v88oKQAAAAA=="
  },
  "/uploads/astera-upload-1777543812845-9puk6rdon7f.png": {
    "webp": "/optimized/uploads/astera-upload-1777543812845-9puk6rdon7f.webp",
    "fallback": "/optimized/uploads/astera-upload-1777543812845-9puk6rdon7f.jpg",
    "webpSrcSet": "/optimized/uploads/astera-upload-1777543812845-9puk6rdon7f-331w.webp 331w, /optimized/uploads/astera-upload-1777543812845-9puk6rdon7f-408w.webp 408w",
    "fallbackSrcSet": "/optimized/uploads/astera-upload-1777543812845-9puk6rdon7f-331w.jpg 331w, /optimized/uploads/astera-upload-1777543812845-9puk6rdon7f-408w.jpg 408w",
    "width": 408,
    "height": 410,
    "lqip": "data:image/webp;base64,UklGRkoAAABXRUJQVlA4ID4AAABQAwCdASoUABQAPzmMv1cvKSajqAqp4CcJZQC7AA3N0CbUgADvFds9FCPz19RTN1HTppOCe3navheRagAAAA=="
  },
  "/uploads/astera-upload-1780220684302-0u741zmozlhg-nobg.webp": {
    "webp": "/optimized/uploads/astera-upload-1780220684302-0u741zmozlhg-nobg.webp",
    "fallback": "/optimized/uploads/astera-upload-1780220684302-0u741zmozlhg-nobg.webp",
    "webpSrcSet": "/optimized/uploads/astera-upload-1780220684302-0u741zmozlhg-nobg-331w.webp 331w, /optimized/uploads/astera-upload-1780220684302-0u741zmozlhg-nobg-480w.webp 480w, /optimized/uploads/astera-upload-1780220684302-0u741zmozlhg-nobg-662w.webp 662w, /optimized/uploads/astera-upload-1780220684302-0u741zmozlhg-nobg-828w.webp 828w, /optimized/uploads/astera-upload-1780220684302-0u741zmozlhg-nobg-852w.webp 852w",
    "fallbackSrcSet": "/optimized/uploads/astera-upload-1780220684302-0u741zmozlhg-nobg-331w.webp 331w, /optimized/uploads/astera-upload-1780220684302-0u741zmozlhg-nobg-480w.webp 480w, /optimized/uploads/astera-upload-1780220684302-0u741zmozlhg-nobg-662w.webp 662w, /optimized/uploads/astera-upload-1780220684302-0u741zmozlhg-nobg-828w.webp 828w, /optimized/uploads/astera-upload-1780220684302-0u741zmozlhg-nobg-852w.webp 852w",
    "width": 852,
    "height": 1199,
    "lqip": "data:image/webp;base64,UklGRhYBAABXRUJQVlA4WAoAAAAQAAAAEwAAGwAAQUxQSJ0AAAANuS5E9D80cmvbVrXFpZi//4KsgT/zH3eIFzlrnPyMFf8VUEDEBEzA5VtHjh16xaO3t3v/Hjz5/4L1xJU7Fh97gY/HtCyUNmtpwwGZ3dncYSWIlDbJBJIWIMl2GIyNJUEcR4IkNXbYIjCQZhnJZyHZggTg/JXYWSDbwh2QWT49GzGAkUBWwhiYfJwBlaR8OgxHkC8N4k/Xb9I3+YEBAFZQOCBSAAAAsAMAnQEqFAAcAD8lgrRTrj+lIrf6qAPwJIllAL3QLm/Y5i3lfgAA/unaFKjtZ17qX4ZBhWG+8XrwEqYlq/fF5tTzgXLtNHGzmTAPjtmK8YAAAA=="
  },
  "/uploads/astera-upload-1780231907449-7vup1spq1vd.webp": {
    "webp": "/optimized/uploads/astera-upload-1780231907449-7vup1spq1vd.webp",
    "fallback": "/optimized/uploads/astera-upload-1780231907449-7vup1spq1vd.webp",
    "webpSrcSet": "/optimized/uploads/astera-upload-1780231907449-7vup1spq1vd-331w.webp 331w, /optimized/uploads/astera-upload-1780231907449-7vup1spq1vd-480w.webp 480w, /optimized/uploads/astera-upload-1780231907449-7vup1spq1vd-662w.webp 662w, /optimized/uploads/astera-upload-1780231907449-7vup1spq1vd-828w.webp 828w, /optimized/uploads/astera-upload-1780231907449-7vup1spq1vd-852w.webp 852w",
    "fallbackSrcSet": "/optimized/uploads/astera-upload-1780231907449-7vup1spq1vd-331w.webp 331w, /optimized/uploads/astera-upload-1780231907449-7vup1spq1vd-480w.webp 480w, /optimized/uploads/astera-upload-1780231907449-7vup1spq1vd-662w.webp 662w, /optimized/uploads/astera-upload-1780231907449-7vup1spq1vd-828w.webp 828w, /optimized/uploads/astera-upload-1780231907449-7vup1spq1vd-852w.webp 852w",
    "width": 852,
    "height": 1199,
    "lqip": "data:image/webp;base64,UklGRhQBAABXRUJQVlA4WAoAAAAQAAAAEwAAGwAAQUxQSJ0AAAANuS5E9D80cmvbVrXFpZi//4KsgT/zH3eIFzlrnPyMFf8VUEDEBEzA5VtHjh16xaO3t3v/Hjz5/4L1xJU7Fh97gY/HtCyUNmtpwwGZ3dncYSWIlDbJBJIWIMl2GIyNJUEcR4IkNXbYIjCQZhnJZyHZggTg/JXYWSDbwh2QWT49GzGAkUBWwhiYfJwBlaR8OgxHkC8N4k/Xb9I3+YEBAFZQOCBQAAAAsAMAnQEqFAAcAD8thLRTrqklIrf1WAHQJYllAMssF0KwV2Z64AAA/ulTtZvYH8ZfTZhK7FzFQWQpQlazmJ8XmWhjGgwKV+NMqLVd6E9AAAA="
  },
  "/uploads/astera-upload-1780249727880-fghflgahufr.webp": {
    "webp": "/optimized/uploads/astera-upload-1780249727880-fghflgahufr.webp",
    "fallback": "/optimized/uploads/astera-upload-1780249727880-fghflgahufr.webp",
    "webpSrcSet": "/optimized/uploads/astera-upload-1780249727880-fghflgahufr-331w.webp 331w, /optimized/uploads/astera-upload-1780249727880-fghflgahufr-480w.webp 480w, /optimized/uploads/astera-upload-1780249727880-fghflgahufr-662w.webp 662w, /optimized/uploads/astera-upload-1780249727880-fghflgahufr-828w.webp 828w, /optimized/uploads/astera-upload-1780249727880-fghflgahufr-1200w.webp 1200w",
    "fallbackSrcSet": "/optimized/uploads/astera-upload-1780249727880-fghflgahufr-331w.webp 331w, /optimized/uploads/astera-upload-1780249727880-fghflgahufr-480w.webp 480w, /optimized/uploads/astera-upload-1780249727880-fghflgahufr-662w.webp 662w, /optimized/uploads/astera-upload-1780249727880-fghflgahufr-828w.webp 828w, /optimized/uploads/astera-upload-1780249727880-fghflgahufr-1200w.webp 1200w",
    "width": 1199,
    "height": 697,
    "lqip": "data:image/webp;base64,UklGRkYAAABXRUJQVlA4IDoAAABQAwCdASoUAAwAPzmYvlYvLCajsAgB4CcJZwAAQPtLCNB8AAD+05UCM8Us2LwxQ0npiwdsz/vigAAA"
  },
  "/uploads/astera-upload-1780249734951-o1u9hv3n2z.webp": {
    "webp": "/optimized/uploads/astera-upload-1780249734951-o1u9hv3n2z.webp",
    "fallback": "/optimized/uploads/astera-upload-1780249734951-o1u9hv3n2z.webp",
    "webpSrcSet": "/optimized/uploads/astera-upload-1780249734951-o1u9hv3n2z-331w.webp 331w, /optimized/uploads/astera-upload-1780249734951-o1u9hv3n2z-480w.webp 480w, /optimized/uploads/astera-upload-1780249734951-o1u9hv3n2z-662w.webp 662w, /optimized/uploads/astera-upload-1780249734951-o1u9hv3n2z-828w.webp 828w, /optimized/uploads/astera-upload-1780249734951-o1u9hv3n2z-1200w.webp 1200w",
    "fallbackSrcSet": "/optimized/uploads/astera-upload-1780249734951-o1u9hv3n2z-331w.webp 331w, /optimized/uploads/astera-upload-1780249734951-o1u9hv3n2z-480w.webp 480w, /optimized/uploads/astera-upload-1780249734951-o1u9hv3n2z-662w.webp 662w, /optimized/uploads/astera-upload-1780249734951-o1u9hv3n2z-828w.webp 828w, /optimized/uploads/astera-upload-1780249734951-o1u9hv3n2z-1200w.webp 1200w",
    "width": 1200,
    "height": 755,
    "lqip": "data:image/webp;base64,UklGRkYAAABXRUJQVlA4IDoAAABwAwCdASoUAA0APzmGuVO+qSWisAgD0CcJQBWABZyh6KgtTAAA/tJzL1cIZqd1qv79WUsCXA+EgAAA"
  },
  "/uploads/astera-upload-1780250440546-7dk616iblby.webp": {
    "webp": "/optimized/uploads/astera-upload-1780250440546-7dk616iblby.webp",
    "fallback": "/optimized/uploads/astera-upload-1780250440546-7dk616iblby.webp",
    "webpSrcSet": "/optimized/uploads/astera-upload-1780250440546-7dk616iblby-331w.webp 331w, /optimized/uploads/astera-upload-1780250440546-7dk616iblby-480w.webp 480w",
    "fallbackSrcSet": "/optimized/uploads/astera-upload-1780250440546-7dk616iblby-331w.webp 331w, /optimized/uploads/astera-upload-1780250440546-7dk616iblby-480w.webp 480w",
    "width": 480,
    "height": 676,
    "lqip": "data:image/webp;base64,UklGRg4BAABXRUJQVlA4WAoAAAAQAAAAEwAAGwAAQUxQSJsAAAANuS5E9D80Umvbdu0mqxj1X5JKEMrZhqbrF7DGwf+MVYCxAo+YgAm4fuPCqXPPevBz53g8/vzUf3+/bj3x0ZlArgjtwfkdsiQFTXZhHD53dpAYyHfCZjuQ0NICwmbtiGnibBWOfN6GQ9rS0saGHTB3dsFxR2NSWoBkJPzZMN8BkcwBdpYP09lZpo3Pk5w9LP4BmUz8ZWR/BcS/LQBWUDggTAAAANADAJ0BKhQAHAA/KXi1U64nJSK3+qgBwCUJZQC7ACwCr8n6Tl2gwAD+5VQvO4Ykse3ABIKs51Y4k/Yyn42OP+NcTZykb4xd40QAAAA="
  },
  "/uploads/upload-1775752711594-ra6msm8ooeq.jpg": {
    "webp": "/optimized/uploads/upload-1775752711594-ra6msm8ooeq.webp",
    "fallback": "/optimized/uploads/upload-1775752711594-ra6msm8ooeq.jpg",
    "webpSrcSet": "/optimized/uploads/upload-1775752711594-ra6msm8ooeq-331w.webp 331w, /optimized/uploads/upload-1775752711594-ra6msm8ooeq-480w.webp 480w, /optimized/uploads/upload-1775752711594-ra6msm8ooeq-662w.webp 662w, /optimized/uploads/upload-1775752711594-ra6msm8ooeq-828w.webp 828w, /optimized/uploads/upload-1775752711594-ra6msm8ooeq-1024w.webp 1024w",
    "fallbackSrcSet": "/optimized/uploads/upload-1775752711594-ra6msm8ooeq-331w.jpg 331w, /optimized/uploads/upload-1775752711594-ra6msm8ooeq-480w.jpg 480w, /optimized/uploads/upload-1775752711594-ra6msm8ooeq-662w.jpg 662w, /optimized/uploads/upload-1775752711594-ra6msm8ooeq-828w.jpg 828w, /optimized/uploads/upload-1775752711594-ra6msm8ooeq-1024w.jpg 1024w",
    "width": 1024,
    "height": 1024,
    "lqip": "data:image/webp;base64,UklGRlAAAABXRUJQVlA4IEQAAADQAwCdASoUABQAPzmIuFO/qSUisAgD8CcJZQDG9C0Hc74T3V9ND4AA/tbb1857AcOe7OlxnW9DOQVsXQ9LETnn63eMAA=="
  },
  "/uploads/upload-1775752788611-901i5x6w5yj.jpeg": {
    "webp": "/optimized/uploads/upload-1775752788611-901i5x6w5yj.webp",
    "fallback": "/optimized/uploads/upload-1775752788611-901i5x6w5yj.jpg",
    "webpSrcSet": "/optimized/uploads/upload-1775752788611-901i5x6w5yj-331w.webp 331w, /optimized/uploads/upload-1775752788611-901i5x6w5yj-480w.webp 480w, /optimized/uploads/upload-1775752788611-901i5x6w5yj-662w.webp 662w, /optimized/uploads/upload-1775752788611-901i5x6w5yj-828w.webp 828w, /optimized/uploads/upload-1775752788611-901i5x6w5yj-1024w.webp 1024w",
    "fallbackSrcSet": "/optimized/uploads/upload-1775752788611-901i5x6w5yj-331w.jpg 331w, /optimized/uploads/upload-1775752788611-901i5x6w5yj-480w.jpg 480w, /optimized/uploads/upload-1775752788611-901i5x6w5yj-662w.jpg 662w, /optimized/uploads/upload-1775752788611-901i5x6w5yj-828w.jpg 828w, /optimized/uploads/upload-1775752788611-901i5x6w5yj-1024w.jpg 1024w",
    "width": 1024,
    "height": 768,
    "lqip": "data:image/webp;base64,UklGRkQAAABXRUJQVlA4IDgAAABQAwCdASoUAA8APzmEulO+qKWisAgD0CcJQBYdhaD9BuKkIAD+v5VYq5dwndg/ITFzxX4ACiAAAA=="
  },
  "/uploads/upload-1775753476085-fruc5wlvfm9.jpg": {
    "webp": "/optimized/uploads/upload-1775753476085-fruc5wlvfm9.webp",
    "fallback": "/optimized/uploads/upload-1775753476085-fruc5wlvfm9.jpg",
    "webpSrcSet": "/optimized/uploads/upload-1775753476085-fruc5wlvfm9-331w.webp 331w, /optimized/uploads/upload-1775753476085-fruc5wlvfm9-480w.webp 480w, /optimized/uploads/upload-1775753476085-fruc5wlvfm9-662w.webp 662w, /optimized/uploads/upload-1775753476085-fruc5wlvfm9-828w.webp 828w, /optimized/uploads/upload-1775753476085-fruc5wlvfm9-1024w.webp 1024w",
    "fallbackSrcSet": "/optimized/uploads/upload-1775753476085-fruc5wlvfm9-331w.jpg 331w, /optimized/uploads/upload-1775753476085-fruc5wlvfm9-480w.jpg 480w, /optimized/uploads/upload-1775753476085-fruc5wlvfm9-662w.jpg 662w, /optimized/uploads/upload-1775753476085-fruc5wlvfm9-828w.jpg 828w, /optimized/uploads/upload-1775753476085-fruc5wlvfm9-1024w.jpg 1024w",
    "width": 1024,
    "height": 1024,
    "lqip": "data:image/webp;base64,UklGRlAAAABXRUJQVlA4IEQAAADQAwCdASoUABQAPzmIuFO/qSUisAgD8CcJZQDG9C0Hc74T3V9ND4AA/tbb1857AcOe7OlxnW9DOQVsXQ9LETnn63eMAA=="
  },
  "/uploads/upload-1775757477245-hdx55ha529s.jpg": {
    "webp": "/optimized/uploads/upload-1775757477245-hdx55ha529s.webp",
    "fallback": "/optimized/uploads/upload-1775757477245-hdx55ha529s.jpg",
    "webpSrcSet": "/optimized/uploads/upload-1775757477245-hdx55ha529s-331w.webp 331w, /optimized/uploads/upload-1775757477245-hdx55ha529s-480w.webp 480w, /optimized/uploads/upload-1775757477245-hdx55ha529s-662w.webp 662w, /optimized/uploads/upload-1775757477245-hdx55ha529s-828w.webp 828w, /optimized/uploads/upload-1775757477245-hdx55ha529s-1024w.webp 1024w",
    "fallbackSrcSet": "/optimized/uploads/upload-1775757477245-hdx55ha529s-331w.jpg 331w, /optimized/uploads/upload-1775757477245-hdx55ha529s-480w.jpg 480w, /optimized/uploads/upload-1775757477245-hdx55ha529s-662w.jpg 662w, /optimized/uploads/upload-1775757477245-hdx55ha529s-828w.jpg 828w, /optimized/uploads/upload-1775757477245-hdx55ha529s-1024w.jpg 1024w",
    "width": 1024,
    "height": 1024,
    "lqip": "data:image/webp;base64,UklGRlAAAABXRUJQVlA4IEQAAADQAwCdASoUABQAPzmIuFO/qSUisAgD8CcJZQDG9C0Hc74T3V9ND4AA/tbb1857AcOe7OlxnW9DOQVsXQ9LETnn63eMAA=="
  }
};
