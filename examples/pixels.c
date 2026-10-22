/* Minimal companion for the pixel-art animation; no hardware required. */
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>

int main(void)
{
    size_t n = 8, next = 16, i;
    uint32_t *pixels = NULL, *temporary;
    if (n > SIZE_MAX / sizeof *pixels) return 1;
    pixels = malloc(n * sizeof *pixels);
    if (pixels == NULL) return 1;
    for (i = 0; i < n; ++i) pixels[i] = (uint32_t)(i + 1);
    printf("allocated %zu pixels, %zu bytes\n", n, n * sizeof *pixels);
    if (next > SIZE_MAX / sizeof *pixels) {
        free(pixels);
        return 1;
    }
    temporary = realloc(pixels, next * sizeof *pixels);
    if (temporary == NULL) {
        /* The original pixels allocation is still owned and valid here. */
        fputs("resize failed; original pixels remain valid\n", stderr);
        free(pixels);
        return 1;
    }
    pixels = temporary;
    for (i = n; i < next; ++i) pixels[i] = (uint32_t)(i + 1);
    n = next;
    for (i = 0; i < n; ++i) {
        if (pixels[i] != (uint32_t)(i + 1)) { free(pixels); return 1; }
    }
    printf("resized to %zu pixels, preserved old data, initialized new data\n", n);
    free(pixels);
    pixels = NULL;
    puts("released exactly once");
    return 0;
}
