function getData(url, type) {
  var httpreq = new XMLHttpRequest();
  httpreq.open("GET", url, false);
  httpreq.send(null);
  if (type == 'text') {
    return httpreq.responseText.split(', ');
  }
  if (type == 'json') {
    return JSON.parse(httpreq.responseText);
  }
}

var data = getData('js/data.json', 'json');

var unSkills = [];
var namesByFriends = [];
var friendsCount = [];
var unFriends = [];

console.log("People:");
_.forEach(data, function (value) {
  console.log(value);
  unSkills = _.union(unSkills, value.skills);
  friendsCount.push({name: value.name, friends: value.friends.length});

  _.forEach(value.friends, function (value1) {
    unFriends = _.concat(unFriends, value1.name);
  });
});

friendsCount = _.sortBy(friendsCount, 'friends');

_.forEach(friendsCount, function (value) {
  namesByFriends.push(value.name)
});

console.log('');
console.log("Unique skills:");
console.log(_.sortBy(unSkills));
console.log('');
console.log("Names by friends:");
console.log(namesByFriends);
console.log('');
console.log("Unique friends:");
console.log(_.uniq(unFriends));