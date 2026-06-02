function qs(s){return document.querySelector(s)}
function qsa(s){return document.querySelectorAll(s)}
function byId(s){return document.getElementById(s)}

function getUrlParam(name){
  var p = new URLSearchParams(window.location.search);
  return p.get(name);
}

function getManholeById(id){
  return window.ALL_MANHOLES.find(function(m){return m.id == id});
}

function getPrefectures(){
  var map = {};
  window.ALL_MANHOLES.forEach(function(m){
    if(!map[m.prefecture]) map[m.prefecture] = [];
    map[m.prefecture].push(m);
  });
  return Object.keys(map).sort().map(function(name){
    return {name:name,list:map[name],count:map[name].length};
  });
}

function getVisited(){
  var v = localStorage.getItem('v');
  return v ? JSON.parse(v) : [];
}
function toggleVisited(id){
  var v = getVisited();
  var i = v.indexOf(String(id));
  if(i === -1) v.push(String(id)); else v.splice(i, 1);
  localStorage.setItem('v', JSON.stringify(v));
}
function isVisited(id){
  return getVisited().indexOf(String(id)) !== -1;
}

function renderGrid(container, list){
  var visited = getVisited();
  container.innerHTML = list.map(function(m){
    var v = visited.indexOf(String(m.id)) !== -1;
    return '<div class="card'+(v?' visited':'')+'" data-id="'+m.id+'">' +
      '<img src="'+m.image+'" alt="'+m.name+'" loading="lazy">' +
      '<div class="info"><div class="name">'+m.name+'</div>' +
      '<div class="pref">'+m.prefecture+'</div></div></div>';
  }).join('');
}

function renderStats(el, filtered, total){
  el.textContent = filtered + ' of ' + total + ' (' + getVisited().length + ' visited)';
}

function goToDetail(id){
  window.location.href = 'detail.html?id=' + id;
}

function goToIndex(pref){
  var url = 'index.html';
  if(pref) url += '?pref=' + encodeURIComponent(pref);
  window.location.href = url;
}

// Prefecture filter dropdown builder
function buildPrefFilter(select, selected){
  select.innerHTML = '<option value="">All Prefectures</option>' +
    getPrefectures().map(function(p){
      var s = p.name === selected ? ' selected' : '';
      return '<option value="'+p.name+'"'+s+'>'+p.name+' ('+p.count+')</option>';
    }).join('');
}
