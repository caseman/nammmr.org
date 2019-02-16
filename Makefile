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

ssh:
	ssh nammmr56@nammmr.org -p 18765 -i ~/.ssh/sg_rsa

stage: build
	scp -r -i ~/.ssh/sg_rsa -P 18765 _site/. nammmr56@nammmr.org:public_html/__test__/

default: build ;

.PHONY: install default clean ultraclean serve
