var parsedate = function (mdate) {
  var messageDate = new Date(Date.parse(mdate));
  var userDate = new Date();

  var diff = Math.floor((userDate - messageDate) / 1000);

  if (diff <= 1) {
    return 'just now';
  } else if (diff < 20) {
    return diff + ' seconds ago';
  } else if (diff < 40) {
    return 'half a minute ago';
  } else if (diff < 60) {
    return 'less than a minute ago';
  } else if (diff <= 90) {
    return 'one minute ago';
  } else if (diff <= 3540) {
    return Math.round(diff / 60) + ' minutes ago';
  } else if (diff <= 5400) {
    return '1 hour ago';
  } else if (diff <= 86400) {
    return Math.round(diff / 3600) + ' hours ago';
  } else if (diff <= 129600) {
    return '1 day ago';
  } else if (diff < 604800) {
    return Math.round(diff / 86400) + ' days ago';
  } else if (diff <= 777600) {
    return '1 week ago';
  }
  return 'on ' + messageDate;
};

exports.parsedate = parsedate;