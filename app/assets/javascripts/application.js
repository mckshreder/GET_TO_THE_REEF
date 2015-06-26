// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require angular
//= require turbolinks
//= require bootstrap
//= require_tree .
$('div').on('click', function() {
      $(this).toggleClass('show-description');
  });

data = {
      level_one: parseInt(localStorage.getItem("firstLevelTime")),
      level_two: parseInt(localStorage.getItem("secondLevelTime")),
      // level3: parseInt(localStorage.getItem("thirdLevelTime")),
      // level4: parseInt(localStorage.getItem("fourthLevelTime")),
      total: parseInt(localStorage.getItem("totalTimeMS"))
    }
//     $.ajax({ url: '/save',
//       type: 'POST',
//       beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
//       data: data
//     });
