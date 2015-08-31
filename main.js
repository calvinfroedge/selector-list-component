/*
 * SelectorListComponent
 *
 * Options:
 * {
 *  attachTo: $('#el'),
 *  transforms: {},
 *  events: {}
 * }
 */
(function (module) {
    if (typeof define === "function" && define.amd) {
        define(['jquery'], function ($) { 
          return module.component($); 
        });
    } else {
        window.SelectorListComponent = module.component($ || jQuery);
    }
}({
  component: function($){
    /*
     * Creates component and adds to page
     */
    var Component = function(choices, opts){
      /*
       * Object for storing component elements
       */
      var els = {
        choices: []
      };

      /*
       * Set up options
       */
      opts = opts || {};
      opts.transforms = opts.transforms || {};
      opts.events = opts.events || {};

      /*
       * The logic for showing 
       */
      var showListContainer = function(){
        els.listContainer.css('position', 'absolute');
        els.listContainer.css('display', 'block');

        var windowHeight = $(window).height();
        var chooserY = els.chooser.offset().top;

        var diff = windowHeight - chooserY;
        var offset = els.chooser.outerHeight();
        var distance = null; //The distance until top or bottom margin of the window is hit

        //If the visible area below the chooser is greater, show listContainer there
        if(diff > windowHeight / 2){
          els.listContainer.css('top', offset);
          distance = windowHeight - (offset + chooserY);
        } else {
        //If the visible area above the chooser is greater, show listContainer there
          els.listContainer.css('bottom', offset);
          distance = chooserY;
        }

        //Set the maximum height of the list container
        els.listContainer.css('max-height', distance);
        els.listContainer.css('overflow-y', 'scroll');

        els.listContainer.css('min-width', els.chooser.outerWidth());
      }

      /*
       * Build elements
       */
      var Builder = {
        /*
         * Create the container node 
         */
        container: function(opts){
          var container = $('<div class="selector-list-component">');
          if(opts.transforms.container){
            opts.transforms.container(container);
          }
          container.css('display', 'inline-block');
          container.css('position', 'relative');
          return container;
        },
        /*
         * Create the chooser (<select> replacement)
         */
        chooser: function(initialChoice, opts){
          var chooser = $('<div class="component-list-chooser">');
          chooser.text(initialChoice);
          var chooserBackground = opts.chooserBackground || 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA50lEQVR4Xt2MQWqEQBBFK4oLcaEbEQWNuNKFtuABJjeYHCVHyxHmBp0cIWsX3XvFTn0oQoOEYbbz4dHVVf9/ehIty3Jl0gf8KTIETdN0UUo5fvU4jndL4IFXMhcahsEwTtB93/9bghs8nt8E+75/bNtGwszcuq47lWCHm3gIIEtQ27bXpmkM4wRd1/VfCWbsvLtBhnxVVaXKsjSME0xRFIo57eEl0Qt5yvNcHcdx4zGTlcXj/4MgeFvX9ftcIGRZ9solnzzOjK8vDr9ba3/onpIkSeM41owTNHb0iKIoSsMw1AAzPa9+Ab+Vat2gkD80AAAAAElFTkSuQmCC)';
          chooser.css('background', chooserBackground+' no-repeat 90%');
          chooser.css('padding-right', '32px');
          if(opts.transforms.chooser){
            opts.transforms.chooser(chooser);
          }

          chooser.click(function(){
            showListContainer();
          });

          return chooser;
        },
        /*
         * Items list
         */
        listContainer: function(choices, opts){
          var container = $('<div class="component-list-container">');

          if(opts.transforms.listContainer){
            opts.transforms.listContainer(container);
          }

          var choiceList = choices.map(function(choice){
            var li = $('<div class="component-list-item">');
            li.attr('style', 'cursor:pointer;');
            li.html(choice);

            if(opts.transforms.listItem) opts.transforms.listItem(li, choice);

            li.click(function(){
              if(opts.events['itemSelected']){
                opts.events['itemSelected'](li, choice, els.chooser);
              }
              
              els.chooser.text(choice);
              container.css('display', 'none');
            });
            
            return li;
          });

          for(var i=0;i<choiceList.length;i++){
            var choice = choiceList[i];
            els.choices.push(choice);
            container.append(choice);
          }

          container.hide();
          return container;
        }
      }

      /*
       * Create elements
       */
      els.container = Builder.container(opts);

      els.chooser = Builder.chooser(opts.selected || choices[0], opts);

      els.listContainer = Builder.listContainer(choices, opts);

      /*
       * If the user clicks out of the element, hide
       */
      $(document).on('click.offListchooser', function(e){
        if(e.target != els.chooser[0]) els.listContainer.hide();
      });

      /*
       * Attach child nodes to container
       */
      [els.chooser, els.listContainer].map(function(item){
        els.container.append(item);
      });

      /*
       * attach parent node to dom
       */
      if(opts.attachTo){
        if(opts.attachTo instanceof $){
          opts.attachTo.append(els.container);
        } else {
          opts.attachTo.appendChild(els.container);
        }

        if(opts.events.onRender){
          opts.events.onRender(els.container);
        }
      }

      /*
       * Public API for component
       */
      return {
        els: els,
        remove: function(){ //Detach the component and all listeners
          els.container.remove();
        }
      }
    };

    return Component;

  }
}));
