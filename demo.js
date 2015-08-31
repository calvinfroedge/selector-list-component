requirejs.config({
  paths: {
    "jquery": "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0-alpha1/jquery.min"
  }
});

define(["main"], function(SelectorListComponent) {
  new SelectorListComponent(
    ['foo', 'bar', 'baz', 'bop', 'bee', 'boo', 'barra', 'ankara', 'farra'],
    {
      attachTo: $('#container')
    }
  );
});
