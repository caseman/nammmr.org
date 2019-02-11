build:
	npx eleventy

serve:
	npx eleventy --serve

clean:
	rm -rf _site

ultraclean: clean
	rm -rf node_modules

install:
	which brew || /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
	which npm || brew install npm
	npm install

default: build ;

.PHONY: install default clean ultraclean serve
