src_photos = $(wildcard _photos/*.jpg)
thumbs = $(subst _photos,thumb, $(src_photos))
photos = $(subst _photos,photos, $(src_photos))
src_newletters = $(wildcard newsletters/*.pdf)
newsletter_thumbs = $(subst pdf,jpg, \
	$(subst newsletters,newsletter-thumb, $(src_newletters)))
tmp := $(shell mktemp)

thumb/%.jpg: _photos/%.jpg
	mkdir -p thumb
	convert -thumbnail 200 $< $@

photos/%.jpg: _photos/%.jpg
	mkdir -p photos
	convert -resize 800 $< $@

newsletter-thumb/%.jpg: newsletters/%.pdf
	mkdir -p newsletter-thumb
	gs -sDEVICE=jpeg -dNOPAUSE \
	   -dDEVICEWIDTHPOINTS=1000 -dDEVICEHEIGHTPOINTS=770 \
	   -dGraphicsAlphaBits=4 -dTextAlphaBits=4 \
	   -dFirstPage=1 -dLastPage=1 -sOutputFile=$(tmp) \
	   $< -c quit
	convert -thumbnail 250 $(tmp) $@
	rm $(tmp)

assets: $(thumbs) $(photos) $(newsletter_thumbs)

build: assets
	npx eleventy

serve: assets
	npx eleventy --serve

clean:
	rm -rf _site
	rm -rf thumbs
	rm -rf newsletter-thumb

ultraclean: clean
	rm -rf node_modules

install:
	which brew || /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
	which npm || brew install npm
	which convert || brew install imagemagick
	which gs || brew install gs
	npm install

ssh:
	ssh u162-h6uv4kpfvf2m@nammmr.org -oStrictHostKeyChecking=no -p 18765 -i ~/.ssh/sg_rsa

stage: build
	rsync -rhP -e "ssh -oStrictHostKeyChecking=no -i ${HOME}/.ssh/sg_rsa -p 18765" _site/. u162-h6uv4kpfvf2m@nammmr.org:www/nammmr.org/public_html/__test__/

live: build
	rsync -rhP -e "ssh -oStrictHostKeyChecking=no -i ${HOME}/.ssh/sg_rsa -p 18765" _site/. u162-h6uv4kpfvf2m@nammmr.org:www/nammmr.org/public_html/

fix-ssh:
	# Fixes `/bin/bash: No such file or directory` error on ssh
	curl --GET http://nammmr.org/info.php

default: build ;

.PHONY: install default clean ultraclean serve build assets
