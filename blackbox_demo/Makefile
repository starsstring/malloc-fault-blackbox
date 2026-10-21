CC = cc
CFLAGS = -std=c11 -O2 -Wall -Wextra -Wpedantic -Werror

.PHONY: all test sanitize clean
all: blackbox

blackbox: blackbox.c
	$(CC) $(CFLAGS) $< -o $@

test: blackbox
	python3 test_blackbox.py ./blackbox

sanitize: blackbox.c
	$(CC) -std=c11 -g -O1 -Wall -Wextra -Wpedantic -Werror -fsanitize=address,undefined -fno-omit-frame-pointer $< -o blackbox_asan
	python3 test_blackbox.py ./blackbox_asan

clean:
	rm -f blackbox blackbox_asan
