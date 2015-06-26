function saveScore() {
      // data = {
      //   user_id: parseInt(sessionStorage.getItem("userId")),
      //   level1: parseInt(sessionStorage.getItem("firstLevelClock")),
      //   level2: 5,
      //   level3: 11,
      //   level4: 5,
      //   total: parseInt(sessionStorage.getItem("totalTimeMS"))
      // }

        data = {
        user_id: 1,
        level1: 1,
        level2: 5,
        level3: 11,
        total: 1
      }

       $.ajax({ url: '/save',
       		type: 'POST',
      		// beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
      		data: data
    });
  }