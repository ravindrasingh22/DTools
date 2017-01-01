(function ($) {
function main() {
  chrome.storage.sync.get('ot_urls', function(envs) {

    if ((typeof(envs.ot_urls) !== 'undefined')) {

      $.each(envs.ot_urls, function(key, env) {
        if (key != 'undefined' && key != '') {
          $row = $('<tr></tr>');
          $row.append('<td>' + env.env_name +'<input name="env_name" type="hidden" value="' + env.env_name  +'"/></td>');
      $row.append('<td>' + env.env_url +' <input name="env_url" type="hidden" value=" ' + env.env_url +'"/></td>');

          $('#sites-table tbody').append($row);
        }
      });
    }
    else {
      $newRow = $('<tr></tr>');
      $newRow.append('<td><input name="env_name" placeholder="Environment name"/>E.g Dev,Stage,QA,live</td>');
      $newRow.append('<td><input name="env_url" placeholder="Add base URL"/> like - http://dev.mysite.com</td>');
      $('#sites-table tbody').append($newRow);
    }

    $('#add-env').click(function(){
      $newRow = $('<tr></tr>');
      $newRow.append('<td><input name="env_name" placeholder="Domain Name"/></td>');
      $newRow.append('<td><input name="env_url" placeholder="Base URL"/></td>');
      $('#sites-table tbody').append($newRow);
    });

    $('#submit-add-env-form').click(function() {
      save();
      return false;
    });
  });
}
function save() {
  // use chrome.storage.sync.get and .set here
  // both are async
  var sites = {};
  var $row;
  $row = $('#sites-table').find('tr');
  for (var i=0; i< $row.length; i++) {

    var env_name = $("td input[name='env_name']", $row[i]).val();
    if ((typeof(env_name) != 'undefined') || (env_name != '')) {
      sites[env_name] = {
        'env_name' : $($row[i]).find("td input[name='env_name']").val(),
        'env_url' : $($row[i]).find("td input[name='env_url']").val(),
      }
    }
  }

  chrome.storage.sync.set({'ot_urls': sites}, function() {
    alert('saved');
  });
}

$(document).ready(main);

}(jQuery));
