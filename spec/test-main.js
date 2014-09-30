require.config({
  baseUrl: '/base', //karma servers files from base
});

require(['spec/hierarchy'], window.__karma__.start);
