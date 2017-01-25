var get = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);

    xhr.onreadystatechange = function() {
        if (xhr.readyState != xhr.DONE) return;

        var status = xhr.status;
        var headers = xhr.getAllResponseHeaders();
        var text = xhr.responseText;

        callback(status, headers, text);
    }

    xhr.send();
}

var appendImage = function(url) {
    var imgEl = document.createElement('img');
    imgEl.src = url;
    imgEl.onerror = function() {
      imgEl.setAttribute('hidden','');
    }
    document.getElementById('images').appendChild(imgEl);
}

// getImages({limit: 5})
// getImages({})
// getImages() -- by default should take 100 images

// getImages({limit: 5, category: "cats"})
// getImages({category: "cats"})
// getImages()

var getImages = function() {

    document.querySelector('.loading').removeAttribute('hidden');
    var limitValue = document.querySelector('input[type="number"]').value;
    var categoryValue = document.querySelector('input[type="text"]').value.trim();

    var obj = {
      category: categoryValue || 'cats',
      limit: limitValue || 100
    }

    var url = 'https://www.reddit.com/r/pics/search.json?q=' + obj.category + '&limit=' + obj.limit;

    get(url, function(status, headers, body) {
        var response = JSON.parse(body);
        _.each(response.data.children, function(child) {
            var url = child.data.url;
            appendImage(url);
            console.log('ITEM!', child.data.url);
        });
        document.querySelector('.loading').setAttribute('hidden','');
    });
  }
