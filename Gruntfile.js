/*
 * grunt-carnaby
 * https://github.com/leon.coto/grunt-carnaby
 *
 * Copyright (c) 2013 M&C Saatchi
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.option('appDir', 'tmp');

  // Project configuration.
  grunt.initConfig({
    watch: {
      all: {
        files: '<%= jshint.all %>',
        tasks: ['jshint']
      }
    },
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/**/*.js',
        '<%= nodeunit.tests %>',
        '!**/files/**/*'
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    carnaby: {
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // Carnaby
  grunt.registerTask('c:template', [
    'carnaby:default-template.js',
    'carnaby:init:default-init-template.js',
    'carnaby:amd:amd-template.js',
    'carnaby:init:amd:amd-init-template.js',
    'carnaby:html:default-template.html',
    'carnaby:init:html:default-init-template.html'
  ]);

  grunt.registerTask('c', ['c:template']);
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('test', ['clean', 'c', 'nodeunit']);

  grunt.registerTask('default', ['jshint', 'test']);
  grunt.registerTask('code', ['default', 'watch']);

};
