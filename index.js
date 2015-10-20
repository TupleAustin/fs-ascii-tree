'use strict';

var glob = require('glob').sync;
var path = require('path');
var objectAssign = require('object-assign');
var minimatch = require("minimatch");
var treeify = require("treeify");

var pattern = "**";

function filterMatches(matches, rules) {
	Object.keys(rules).forEach(function (key, index) {
		var indexes = [];
		var rep;

		matches.forEach(function (item, index) {
			if (minimatch(item, key)) {
				indexes.push(index);
			}
		});

		if (indexes.length) {
			rep = path.parse(matches[indexes[0]])
			matches[indexes[0]] = rep.dir + '/' + rules[key];
		}

		if (indexes.length > 1) {
			matches.splice(indexes[1], indexes.length - 1);
		}
	});

	return matches;
}

function buildTree(filteredMatches) {
	var tree = {};

	filteredMatches.forEach(function (item) {
		var dir = tree;

		item.split(path.sep).forEach(function(part) {
			typeof dir[part] !== 'object' && (dir[part] = {});
			dir = dir[part];
		 });
	});

	return tree;
}

function fsTree(basepath, opts) {
	if (typeof basepath === 'object') {
		opts = basepath;
		basepath = '.';
	}

	basepath = basepath || '.';

	if (!opts) {
		opts = {};
	}

	var globOpts = {
		cwd: basepath,
		ignore: []
	};

	var matches;

	if (opts.ignore) {
		if(opts.ignore === String) {
			opts.ignore = [opts.ignore];
		}

		globOpts.ignore = globOpts.ignore.concat(opts.ignore);
	}

	matches = glob(pattern, globOpts);

	if (opts.replace) {
		matches = filterMatches(matches, opts.replace);
	}

	return treeify.asTree(buildTree(matches), true);
}

module.exports = fsTree;