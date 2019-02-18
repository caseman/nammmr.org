src_photos = $(wildcard _photos/*.jpg)
thumbs = $(subst _photos,thumb, $(src_photos))

thumb/%.jpg: _photos/%.jpg
	mkdir -p thumb
	convert -thumbnail 200 $< $@

build: $(thumbs)
	npx eleventy

serve: $(thumbs)
	npx eleventy --serve

clean:
	rm -rf _site
	rm -rf thumbs

ultraclean: clean
	rm -rf node_modules

install:
	which brew || /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
	which npm || brew install npm
	which convert || brew install imagemagick
	npm install

ssh:
	ssh nammmr56@nammmr.org -p 18765 -i ~/.ssh/sg_rsa

stage: build
	scp -r -i ~/.ssh/sg_rsa -P 18765 _site/. nammmr56@nammmr.org:public_html/__test__/

default: build ;

.PHONY: install default clean ultraclean serve
