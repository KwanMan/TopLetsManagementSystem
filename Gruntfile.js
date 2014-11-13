module.exports = function (grunt){

  grunt.initConfig({
    clean: {
      build: ["public/build"]
    },
    copy: {
      build: {
        files: [{expand: true, cwd: "public/static", src: ["**"], dest: "public/build"}]
      }
    },
    browserify: {
      dev: {
        files: {
          "public/build/app.js": ["public/js/main.jsx"]
        },
        options: {
          transform: ["reactify"]
        }
      }
    },
    less: {
      dev: {
        files: {
          "public/build/styles.css": "public/less/main.less"
        }
      }
    },
    watch: {
      client: {
        files: ["public/js/**/*.js", "public/js/**/*.jsx", "public/less/**/*.less", "public/static/**/*.html"],
        tasks: ["build"]
      }
    }
  });

  require("load-grunt-tasks")(grunt);

  grunt.registerTask("build", ["clean:build", "copy:build", "less:dev", "browserify:dev"]);
  grunt.registerTask("default", ["build", "watch:client"]);
}