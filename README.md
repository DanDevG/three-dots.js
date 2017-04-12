#three-dots.js

easy to use ellipsis plugin with no dependencies

##Introducing
This plugin handles the situations when the text overflows its container. three-dots.js truncates the text and adds ellipsis at the end to indicate
that there is more text than it is currently visible.
When the size of a window is changing, the plugin adjusts the text inside the container on the fly, so that your site always has the best look!
To see the plugin in action visit this [showcase](http://threedots.surge.sh)

##Dependencies

No dependencies

##Installing
You can download three-dots.js manually to you project or you can install with npm:

```shell

npm install three-dots.js

```

or bower:

```shell

bower install three-dots.js

```

##Usage

First of all, you'll want to link the three-dots.js or three-dots.min.js file to your web-page:

```html
<script type="text/javascript" src="js/three-dots.js"></script>
```

To initiate the plugin you might add some additional class name to those containers which you want to give for the control to three-dots.js.
Suppose, it is a *.three-dots-container* class name:

```html
<div class="three-dots-container">
	
	//some text inside the container
	
</div>
```

Then you can set the max-height of your containers in css:

```css

.three-dots-container {
	max-height: 200px;
}

```

Finally, you just have to add next code to your JavaScript file:

```javascript

threeDots("three-dots-container");

```

You've done it! Enjoy of your page with neat ellipsed containers.

##License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/DanDevG/three-dots.js/blob/master/LICENSE.md) file for details
