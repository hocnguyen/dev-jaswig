Vue.config.delimiters = ['{', '}'];

function flickrPhotoUrl(photo, size) {
  return "https://farm"+photo.farm+".staticflickr.com/"+photo.server+"/"+photo.id+"_"+photo.secret+"_"+size+".jpg";
}

function jsonFlickrApi(response) {
  photos = response.photos.photo;
  urls = [];
  for (var i = 0; i < photos.length; i++) {
    urls.push(flickrPhotoUrl(photos[i], "z"));
  }
  window.instagram.photos = urls;
}

$(document).on('ready', function() {
  var instagramPhoto = Vue.extend({
    props: ['photos', 'id'],
    template: '<a href="http://www.instagram.com/jaswighq" :style.sync="getBackgroundImage">{photo}</a>',

    data: function () {
      return {
        tmpPhotos: this.photos
      };
    },

    computed: {
      getBackgroundImage: function () {
        return "background-image: url('"+ this.tmpPhotos[this.id] +"')";
      }
    }
  });

  window.instagram = new Vue({
    el: '#vue-instagram',
    components: { 'instagram-photo': instagramPhoto },
    data: { photos: null },

    computed: {
      basePhotos: function () {
        return this.photos.slice(0, 10);
      },
      restPhotos: function () {
        return this.photos.slice(10);
      }
    },

    created: function () {
      setInterval(function(){
        if(!this.photos) return false;

        var randomBaseId = Math.floor(Math.random()*this.basePhotos.length);
        var randomRestId = Math.floor(Math.random()*this.restPhotos.length);

        var tmpBasePhoto = this.basePhotos[randomBaseId];

        this.basePhotos.$set(randomBaseId, this.restPhotos[randomRestId]);
        this.restPhotos.$set(randomRestId, tmpBasePhoto);
      }.bind(this), 5000);
    }
  });

  // Fetch fotos
  window.setTimeout(function() {
    $.get("https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&user_id=140453763@N07&api_key=f0b84fba1c00631410b85b90720f52ba&format=json");
  }, 1000);
});
