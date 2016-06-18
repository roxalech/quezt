(function(exports, config, $) {
  'use strict';

  var baseUrl = config.baseUrl;
  // GCC string reference
  exports['Util'] = Util;

  Util.post = postEntity;
  Util.put = updateEntity;
  Util.delete = deleteEntity;
  Util.get = getEntity;

  function Util() {}

  function postEntity(url, data) {
    return $.ajax({
      url: url,
      type: 'POST',
      data: JSON.stringify(data),
      dataType : 'json',
      contentType: 'application/json'
    });
  }

  function getEntity(url) {
    return $.ajax({
      url: url,
      type: 'GET',
      dataType : 'json',
      contentType: 'application/json'
    });
  }

  function updateEntity(url, data) {
    return $.ajax({
      url: url,
      type: 'PUT',
      data: JSON.stringify(data),
      dataType: 'json',
      contentType: 'application/json'
    });
  }

  function deleteEntity(url) {
    return $.ajax({
      url: url,
      type: 'DELETE',
      dataType: 'json',
      contentType: 'application/json'
    });
  }

}(APP, CONFIG, $));