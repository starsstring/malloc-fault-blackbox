.PHONY: all test sanitize clean

all test sanitize clean:
	$(MAKE) -C blackbox_demo $@
