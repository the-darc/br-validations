var gulp = require('gulp'),
	path = require('path'),
	jshintReporter = require('jshint-stylish'),
	plugins = require('gulp-load-plugins')({
		config: path.join(__dirname, 'package.json')
	});

var path = {
	src: {
		files: 'src/**/*.js'
	},
	test: {
		files: 'test/**/*.test.js'
	}
}

gulp.task('build', function() {
	var pkg = require('./package.json');

	var header = ['/**',
		' * <%= pkg.name %>',
		' * <%= pkg.description %>',
		' * @version v<%= pkg.version %>',
		' * @link <%= pkg.homepage %>',
		' * @license <%= pkg.license %>',
		' */',
		'(function () {',
		'  var root = this;',
		''].join('\n');

	var footer = ['',
		'var BrV = {',
		'	ie: IE',
		'};',
		'var objectTypes = {',
		'	\'function\': true,',
		'	\'object\': true',
		'};',
		'if (objectTypes[typeof module]) {',
		'	module.exports = BrV;	',
		'} else {',
		'	root.BrV = BrV;',
		'}',
		'}.call(this));'].join('\n');

	gulp.src(path.src.files)
		.pipe(plugins.concat('br-validations.js'))
		.pipe(plugins.header(header, {pkg: pkg}))
		.pipe(plugins.footer(footer))
		.pipe(plugins.concat('br-validations.js'))
		.pipe(gulp.dest('./releases'))
		.pipe(plugins.uglify())
		.pipe(plugins.concat('br-validations.min.js'))
		.pipe(gulp.dest('./releases'));
});

gulp.task('jshint', function() {
	gulp.src(path.src.files)
	.pipe(plugins.jshint('.jshintrc'))
	.pipe(plugins.jshint.reporter(jshintReporter));
});

gulp.task('runtestdot', function() {
	gulp.src(path.test.files, {read: false})
	.pipe(plugins.mocha({
		reporter: 'dot'
	}))
	.on('error', console.warn.bind(console));
});

gulp.task('runtest', function() {
	gulp.src(path.test.files, {read: false})
	.pipe(plugins.mocha({
		reporter: 'spec'
	}))
	.on('error', console.warn.bind(console));
});

gulp.task('default', ['jshint', 'build', 'runtestdot'], function() {
    gulp.watch(path.src.files, ['jshint', 'runtestdot']);
});

gulp.task('test', ['jshint', 'build', 'runtest'], function() {
    gulp.watch(path.src.files, ['jshint', 'runtest']);
});
