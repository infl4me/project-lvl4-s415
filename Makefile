install: install-deps install-flow-typed

start:
	npx nodemon --exec npx babel-node server/bin/slack.js

install-deps:
	npm install

build:
	rm -rf dist
	npm run build

test:
	npm test

check-types:
	npx flow

lint:
	npx eslint . --ext .js,.jsx

withfix:
	npx eslint . --ext .js,.jsx --fix

publish:
	npm publish

deploy:
	git push heroku master

.PHONY: test
