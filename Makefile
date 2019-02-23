src_photos = $(wildcard _photos/*.jpg)
thumbs = $(subst _photos,thumb, $(src_photos))
photos = $(subst _photos,photos, $(src_photos))
src_newletters = $(wildcard newsletters/*.pdf)
newsletter_thumbs = $(subst pdf,jpg, \
	$(subst newsletters,newsletter-thumb, $(src_newletters)))

thumb/%.jpg: _photos/%.jpg
	mkdir -p thumb
	convert -thumbnail 200 $< $@

photos/%.jpg: _photos/%.jpg
	mkdir -p photos
	convert -resize 800 $< $@

newsletter-thumb/%.jpg: newsletters/%.pdf
	mkdir -p newsletter-thumb
	gs -sDEVICE=jpeg -dNOPAUSE -dPDFFitPage=true \
	   -dDEVICEWIDTHPOINTS=250 -dDEVICEHEIGHTPOINTS=324 \
	   -dGraphicsAlphaBits=4 -dTextAlphaBits=4 \
	   -dFirstPage=1 -dLastPage=1 -sOutputFile=$@ $< -c quit

js/owl.carousel.min.js: node_modules/owl.carousel/dist/owl.carousel.min.js
	cp $< $@
	cp node_modules/owl.carousel/dist/assets/*.css css/

assets: $(thumbs) $(photos) $(newsletter_thumbs)

build: assets js/owl.carousel.min.js
	npx eleventy

serve: assets
	npx eleventy --serve

clean:
	rm -rf _site
	rm -rf thumbs
	rm -ft newsletter-thumb

ultraclean: clean
	rm -rf node_modules

install:
	which brew || /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
	which npm || brew install npm
	which convert || brew install imagemagick
	which gs || brew install gs
	npm install

ssh:
	ssh nammmr56@nammmr.org -p 18765 -i ~/.ssh/sg_rsa

stage: build
	scp -r -i ~/.ssh/sg_rsa -P 18765 _site/. nammmr56@nammmr.org:public_html/__test__/

default: build ;

.PHONY: install default clean ultraclean serve build assets
