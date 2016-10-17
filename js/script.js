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

var uniqueSkills = [];
var quantityofFriends = [];
var friendsCount = [];
var allFriends = [];

console.log("People:");
_.forEach(data, function(value) {
    console.log(value);
    uniqueSkills = _.union(uniqueSkills, value.skills);
    friendsCount.push({
        name: value.name,
        friends: value.friends.length
    });

    _.forEach(value.friends, function(value1) {
        allFriends = _.concat(allFriends, value1.name);
    });
});

friendsCount = _.sortBy(friendsCount, 'friends');

_.forEach(friendsCount, function(value) {
    quantityofFriends.push(value.name);
});

console.log('');
console.log("Unique skills:");
console.log(_.sortBy(uniqueSkills));
console.log('');
console.log("Quantity of friends:");
console.log(quantityofFriends);
console.log('');
console.log("All friends:");
console.log(_.uniq(allFriends));
