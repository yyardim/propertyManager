'use strict';

// Define the Grunt configuration method
module.exports = function (grunt) {
  // Initialize Grunt configuration
  grunt.initConfig({
    // Configure the grunt-env task
    env: {
      dev: {
        NODE_ENV: 'development'
      },
      test: {
        NODE_ENV: 'test'
      }
    },
    // Configure the grunt-nodemon task
    nodemon: {
      dev: {
        script: 'server.js',
        options: {
          ext: 'js,html',
          watch: ['server.js', 'config/**/*.js', 'app/**/*.js']
        }
      }
    },
    // Configure the grunt-contrib-jshint task
    jshint: {
      all: {
        src: ['server.js', 'public/**/*.js', 'config/**/*.js', 'app/**/*.js']
      },
      options: {
        globals: {
          node: true
        },
        ignores: ['node_modules/**/*.js', 'public/lib/**/*.js']
      }
    },
    // Configure the grunt-contrib-csslint task
    csslint: {
      all: {
        src: ['public/css/*.css']
      }
    },
    // Configure the grunt-contrib-watch task
    watch: {
      js: {
        files: ['server.js', 'app/**/*.js', 'config/**/*.js', 'public/**/*.js'],
        tasks: ['jshint']
      },
      css: {
        files: 'public/css/*.css',
        tasks: ['csslint']
      }
    },
    // Configure the grunt-concurrent task
    concurrent: {
      dev: {
        tasks: ['nodemon', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    }
  });
  
  // Load the external Grunt tasks
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-concurrent');
  
  // Create the 'lint' Grunt task
  grunt.registerTask('lint', ['jshint', 'csslint']);
  
  // Create the 'default' Grunt task
  grunt.registerTask('default', ['env:dev', 'lint', 'concurrent']);
};