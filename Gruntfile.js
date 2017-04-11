// jshint camelcase: false, quotmark: false

//var fs = require('fs');

module.exports = function (grunt) {
  'use strict';

  require('load-grunt-tasks')(grunt);
  var pkg = grunt.file.readJSON('package.json');


  grunt.initConfig({

    pkg: pkg,

    language: grunt.option('lang') || 'en',

    meta: {
      banner: '/*!\n * <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      ' * <%= pkg.homepage %>\n' +
      ' * Copyright (c) <%= grunt.template.today("yyyy") %>  <%= pkg.author.name %>, ICI LA LUNE;' +
      ' Licensed <%= pkg.license %>\n */\n'
    },

    build_dir: 'dist',

    lib_files: {

      core: [
        'src/snipcart.js'
      ]

    },


    jshint: {

      options: {
        jshintrc: true
      },

      all: ['Gruntfile.js', '<%= lib_files.core %>'],

      core: {
        files: {
          src: ['<%= lib_files.core %>']
        }
      }

    },

    concat: {

      banner_core: {
        options: {
          banner: '<%= meta.banner %>'
        },
        src: '<%= concat.core.dest %>',
        dest: '<%= concat.core.dest %>'
      },

      core: {
        src: ['<%= lib_files.core %>'],
        dest: '<%= build_dir %>/angular-snipcart.js'
      },

    },

    uglify: {

      options: {
        preserveComments: /(?:^!|@(?:license|preserve|cc_on))/
      },

      core: {
        files: {
          '<%= build_dir %>/angular-snipcart.min.js': '<%= concat.core.dest %>'
        }
      }
    },


    conventionalChangelog: {
      options: {
        changelogOpts: {
          preset: 'angular'
        }
      },
      release: {
        src: 'CHANGELOG.md'
      }
    },


    umd: {
      'core': {
        src: '<%= concat.core.dest %>',
        dest: '<%= concat.core.dest %>'
      },
    },

    file_append: {
      'core': {
        files: [{
          append: "return 'snipcart';",
          input: '<%= concat.core.dest %>'
        }]
      }
    },

    version: {
      options: {
        prefix: 'var version\\s+=\\s+[\'"]'
      },
      defaults: {
        src: ['<%= concat.core.dest %>']
      }
    }

  });


  grunt.registerTask('default', ['lint']);
  grunt.registerTask('lint', ['jshint:all']);


  grunt.registerTask('prepare-release', [
    'jshint:all',
    'compile'
  ]);

  grunt.registerTask('build', [
    'jshint:all',
    'compile'
  ]);

  grunt.registerTask('compile', [
    'jshint:core',
    'concat:core',
    'version',
    'file_append:core',
    'umd:core',
    'concat:banner_core',
    'uglify:core'
  ]);

};
