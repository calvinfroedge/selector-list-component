#SelectorList Component

A component for non-standard selectboxes. Takes an array of items (dom nodes or strings) and renders a list.

This is similar to jQuery UI's Selectmenu component, but has no external dependencies (other than jQuery), is very tiny, and provides some very useful interaction features for developers.


#Transforms
Transforms can be used to modify how any of the elements of the component are rendered. When instantiating, simple add a key of 'transforms' to the configuration object, with callbacks on any of the following keys (key -> (arguments)):

- container -> (containerDOM)
- chooser -> (chooserDOM)
- listContainer -> (listContainerDOM)
- listItem -> (listItemDOM, choiceValue)

Example (turn container background color red on render):
```
{
  transforms: {
    container: function(container){
      container.css('background-color', 'red');
    }
  }
}
```

#Events
The following events can be provided via the events key in the configuration object (key -> (arguments)):
```
- itemSelected -> (listItemDOM, choiceMade, chooserDom)
- onRender -> (containerDOM)
```

#Styling
There is no CSS given for this component other than that which forces positioning, but this will get you started with something basic and attractive:

```
.component-list-chooser {
  background:#fff;
  border: 1px solid #ccc;
  padding: 0.5em;
}

.component-list-container {
  background:#fff;
  border: 1px solid #ccc;
}

.component-list-item {
  background:#fff;
  padding:0.5em;
}

.component-list-item:hover {
  background:#efefef;
}
```


