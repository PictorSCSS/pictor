'use strict';

module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-http-server');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    './docs/app.css': './src/app.scss'
                }
            }
        },

        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    './docs/app.min.css': ['./docs/app.css']
                }
            }
        },

        'http-server': {

            'dev': {
                root: './docs',
                port: 3141,
                host: '0.0.0.0',
                cache: 0,
                showDir : true,
                autoIndex: true,
                ext: 'html',
                runInBackground: true,
                // logFn: console.log,
                // Tell grunt task to open the browser
                openBrowser : true,

                // customize url to serve specific pages
                customPages: {
                    // '/readme': 'README.md',
                    // '/readme.html': 'README.html'
                }

            }

        },

        watch: {
            sass: {
                files: './src/**/*.scss',
                tasks: ['sass', 'cssmin'],
                options: {
                    livereload: true
                }
            },

            misc: {
                files: ['./docs/**/*.js', './docs/**/*.html'],
                options: {
                    livereload: true
                }
            }
        }

    });

    grunt.registerTask('default', ['sass', /*'cssmin',*/ 'http-server', 'watch']);
    grunt.registerTask('build', ['sass', 'cssmin']);

};
