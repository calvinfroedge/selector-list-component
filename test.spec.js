describe('component', function(){
  var Component = window.SelectorListComponent;
  var el = $('body');

  describe('Test the component', function(){
    it('Should attach to the page', function(){
      var c = new Component(['a', 'b'], {attachTo: el});

      //Should be on the page
      expect(el.find(c.els.container).length).toEqual(1);
      c.remove();
    })

    it('Should show the list after clicking the chooser', function(){
      var c = new Component(['a', 'b'], {attachTo: el});

      c.els.chooser.click();

      expect(c.els.listContainer.is(':visible')).toEqual(true);

      c.remove();
    });

    it('When clicking a list item, should should fire a callback if a listItem event is attached, and the chooser text should change', function(){
      var test = false;
      var c = new Component(['a', 'b'], {
        attachTo: el,
        events: {
          itemSelected: function(){
            test = true;
          }
        }
      });
      var oldVal = c.els.chooser.text();
      c.els.chooser.click();
      c.els.choices[1].click();
      var newVal = c.els.chooser.text();
      expect(oldVal != newVal).toEqual(true);
      expect(test).toEqual(true);
      c.remove();
    });
  });
});
