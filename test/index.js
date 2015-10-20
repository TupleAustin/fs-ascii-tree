'use strict';

var assert = require('assert');
var fs = require('fs');
var path = require('path')
var fsTree = require('../index');

// Change cwd to sample structure to make testing easier.
process.chdir(path.resolve(__dirname, 'structure'));

function readFile(name) {
	return fs.readFileSync(path.resolve('../static', name + '.txt'), 'utf8');
}

describe('Tree', function() {
	describe('default no params', function() {
		it('should return a full tree when no parameters are set', function() {
			var defaultNoParams = readFile('defaultNoParams');
			var tree = fsTree();

			assert.equal(tree, defaultNoParams, 'Tree does not match defaultNoParams.txt');
		});
	});

	describe('provided basepath', function () {
		it('should return a tree within the specified path', function () {
			var provideBasePath = readFile('provideBasePath');
			var tree = fsTree('level1-3');

			assert.equal(tree, provideBasePath, 'Tree does not match provideBasePath.txt');
		});
	});

	describe('provided basepath with ignore and replace', function () {
		it('should return a tree with folder "level2-2" excluded and contents of folder "level2-3" listed as "Replacement text"', function () {
			var provideBasePath = readFile('basepathWithIgnoreAndReplace');
			var tree = fsTree('level1-3', {ignore: 'level2-2/**', replace: {'level2-3/**': 'Replacement text'}});

			assert.equal(tree, provideBasePath, 'Tree does not match basepathWithIgnoreAndReplace.txt');
		});
	});

	describe('no basepath with ignore as string', function () {
		it('should return a tree with folder "level1-3" excluded', function () {
			var provideBasePath = readFile('noBasepathWithIgnoreAsString');
			var tree = fsTree({ignore: 'level1-3/**'});

			assert.equal(tree, provideBasePath, 'Tree does not match noBasepathWithIgnoreAsString.txt');
		});
	});

	describe('no basepath with ignore as array', function () {
		it('should return a tree with folders "level1-2" and "level1-3" excluded', function () {
			var provideBasePath = readFile('noBasepathWithIgnoreAsArray');
			var tree = fsTree({ignore: ['level1-2/**', 'level1-3/**']});

			assert.equal(tree, provideBasePath, 'Tree does not match noBasepathWithIgnoreAsArray.txt');
		});
	});

	describe('no basepath with replace', function () {
		it('should return a tree with contents of folder "level1-3" listed as "Replacement text"', function () {
			var provideBasePath = readFile('noBasepathWithReplace');
			var tree = fsTree({replace: {'level1-3/**': 'Replacement text'}});

			assert.equal(tree, provideBasePath, 'Tree does not match noBasepathWithReplace.txt');
		});
	});

	describe('no basepath with ignore and replace', function () {
		it('should return a tree with folder "level1-2" excluded and contents of folder "level1-3" listed as "Replacement text"', function () {
			var provideBasePath = readFile('noBasepathWithIgnoreAndReplace');
			var tree = fsTree({ignore: 'level1-2/**', replace: {'level1-3/**': 'Replacement text'}});

			assert.equal(tree, provideBasePath, 'Tree does not match noBasepathWithIgnoreAndReplace.txt');
		});
	});
});
