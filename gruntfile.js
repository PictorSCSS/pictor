'use strict';

module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['sass', 'watch']);
    grunt.registerTask('build', ['sass']);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    './example/app.css': './src/app.scss'
                }
            }
        },

        watch: {
            sass: {
                files: './src/**/*.scss',
                tasks: ['sass'],
                options: {
                    livereload: true
                }
            },

        }

    });

};
